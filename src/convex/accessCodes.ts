import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/** Unambiguous alphabet: no 0/O, 1/I/L to avoid reading errors. */
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function randomCode(length = 8): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < length; i++) {
    out += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return out;
}

/**
 * Admin: generate one or more 8-character access codes.
 * Gated by ADMIN_PASSWORD (same shared password as adminStats).
 */
export const generateCodes = mutation({
  args: {
    password: v.string(),
    count: v.number(),
    label: v.optional(v.string()),
  },
  handler: async (ctx, { password, count, label }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || password !== expected) {
      throw new Error("Unauthorized");
    }
    const n = Math.min(Math.max(1, Math.floor(count)), 50);

    const created: string[] = [];
    for (let i = 0; i < n; i++) {
      // Retry to guarantee uniqueness (collision is unlikely but possible).
      for (let attempt = 0; attempt < 5; attempt++) {
        const code = randomCode(8);
        const existing = await ctx.db
          .query("accessCodes")
          .withIndex("by_code", (q) => q.eq("code", code))
          .unique();
        if (existing) continue;
        await ctx.db.insert("accessCodes", {
          code,
          label: label?.trim() ? label.trim() : undefined,
          active: true,
          createdAt: Date.now(),
        });
        created.push(code);
        break;
      }
    }
    return created;
  },
});

/**
 * Admin: list all access codes, newest first.
 */
export const listCodes = query({
  args: { password: v.string() },
  handler: async (ctx, { password }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || password !== expected) {
      return { ok: false as const };
    }
    const rows = await ctx.db
      .query("accessCodes")
      .withIndex("by_created")
      .order("desc")
      .collect();

    return {
      ok: true as const,
      codes: rows.map((r) => ({
        _id: r._id,
        code: r.code,
        label: r.label ?? null,
        active: r.active,
        used: r.usedBy !== undefined,
        usedAt: r.usedAt ?? null,
        createdAt: r.createdAt,
      })),
    };
  },
});

/**
 * Admin: enable/disable a code.
 */
export const setCodeActive = mutation({
  args: { password: v.string(), codeId: v.id("accessCodes"), active: v.boolean() },
  handler: async (ctx, { password, codeId, active }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || password !== expected) {
      throw new Error("Unauthorized");
    }
    await ctx.db.patch(codeId, { active });
  },
});

/**
 * Admin: delete a code.
 */
export const deleteCode = mutation({
  args: { password: v.string(), codeId: v.id("accessCodes") },
  handler: async (ctx, { password, codeId }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || password !== expected) {
      throw new Error("Unauthorized");
    }
    await ctx.db.delete(codeId);
  },
});

/**
 * User: redeem an 8-character code. Marks the code used and returns the
 * identity used for sign-in so the client can complete Convex Auth login.
 */
export const redeemCode = mutation({
  args: { code: v.string() },
  handler: async (ctx, { code }) => {
    const normalized = code.trim().toUpperCase();
    if (!/^[A-Z0-9]{8}$/.test(normalized)) {
      return { ok: false as const, reason: "invalid_format" as const };
    }

    const row = await ctx.db
      .query("accessCodes")
      .withIndex("by_code", (q) => q.eq("code", normalized))
      .unique();

    if (!row) return { ok: false as const, reason: "not_found" as const };
    if (!row.active) return { ok: false as const, reason: "inactive" as const };
    if (row.usedBy) return { ok: false as const, reason: "already_used" as const };

    const userId = await getAuthUserId(ctx);

    // Case 1: the visitor is not signed in yet — just validate the code and
    // let the client sign in (anonymous) first; the claim happens after.
    if (userId === null) {
      return { ok: true as const, claimed: false as const, code: normalized };
    }

    // Case 2: signed in — claim the code for this user.
    // Each user may only redeem a code once.
    const previous = await ctx.db
      .query("accessCodes")
      .filter((q) => q.eq(q.field("usedBy"), userId))
      .collect();
    if (previous.length > 0) {
      return { ok: false as const, reason: "user_already_used" as const };
    }

    await ctx.db.patch(row._id, {
      usedBy: userId,
      usedAt: Date.now(),
    });
    return { ok: true as const, claimed: true as const, code: normalized };
  },
});

/**
 * User: claim a code for the currently signed-in user (used right after the
 * anonymous sign-in triggered by the code flow).
 */
export const claimCode = mutation({
  args: { code: v.string() },
  handler: async (ctx, { code }) => {
    const normalized = code.trim().toUpperCase();
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return { ok: false as const, reason: "not_authenticated" as const };
    }

    const row = await ctx.db
      .query("accessCodes")
      .withIndex("by_code", (q) => q.eq("code", normalized))
      .unique();

    if (!row) return { ok: false as const, reason: "not_found" as const };
    if (!row.active) return { ok: false as const, reason: "inactive" as const };
    if (row.usedBy) {
      // Idempotent: reclaiming your own code is fine (e.g. page refresh).
      if (row.usedBy === userId) {
        return { ok: true as const, claimed: true as const };
      }
      return { ok: false as const, reason: "already_used" as const };
    }

    const previous = await ctx.db
      .query("accessCodes")
      .filter((q) => q.eq(q.field("usedBy"), userId))
      .collect();
    if (previous.length > 0) {
      return { ok: false as const, reason: "user_already_used" as const };
    }

    await ctx.db.patch(row._id, { usedBy: userId, usedAt: Date.now() });
    return { ok: true as const, claimed: true as const };
  },
});
