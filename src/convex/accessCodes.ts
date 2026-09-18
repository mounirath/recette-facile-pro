import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query, type MutationCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";
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

/** Grant (or extend) app access for a user via accountAccess rows. */
async function grantAccess(
  ctx: MutationCtx,
  userId: Id<"users">,
  source: "email" | "code",
  expiresAt?: number,
) {
  const existing = await ctx.db
    .query("accountAccess")
    .withIndex("by_user", (q) => q.eq("userId", userId))
    .collect();

  const row = existing[0];
  if (!row) {
    await ctx.db.insert("accountAccess", {
      userId,
      source,
      expiresAt,
      grantedAt: Date.now(),
    });
    return;
  }

  const current = row.expiresAt ?? Number.POSITIVE_INFINITY;
  const next = expiresAt ?? Number.POSITIVE_INFINITY;
  // Keep the latest expiry; undefined = lifetime access wins.
  const merged =
    current === Number.POSITIVE_INFINITY || next === Number.POSITIVE_INFINITY
      ? undefined
      : Math.max(current, next);

  await ctx.db.patch(row._id, {
    expiresAt: merged,
    // A code redemption keeps the row active even if the email grant expired.
    source: source === "code" ? "code" : row.source,
    grantedAt: Date.now(),
  });
}

/**
 * Admin: generate one or more 8-character access codes.
 * Gated by ADMIN_PASSWORD (same shared password as adminStats).
 * Optional expiryDays: codes (and the access they grant) expire after n days.
 */
export const generateCodes = mutation({
  args: {
    password: v.string(),
    count: v.number(),
    label: v.optional(v.string()),
    expiryDays: v.optional(v.number()),
  },
  handler: async (ctx, { password, count, label, expiryDays }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || password !== expected) {
      throw new Error("Unauthorized");
    }
    const n = Math.min(Math.max(1, Math.floor(count)), 50);
    const expiresAt =
      expiryDays && expiryDays > 0 ? Date.now() + expiryDays * 86_400_000 : undefined;

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
          expiresAt,
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
        expiresAt: r.expiresAt ?? null,
        expired: r.expiresAt !== undefined && r.expiresAt < Date.now(),
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
 * Admin: set / change the expiry date of an existing code (undefined = never).
 */
export const setCodeExpiry = mutation({
  args: {
    password: v.string(),
    codeId: v.id("accessCodes"),
    expiresAt: v.optional(v.number()),
  },
  handler: async (ctx, { password, codeId, expiresAt }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || password !== expected) {
      throw new Error("Unauthorized");
    }
    await ctx.db.patch(codeId, { expiresAt });
  },
});

/**
 * Admin: list registered (non-guest) users with their access state so the
 * admin can grant, extend or revoke access from the dashboard.
 */
export const listUsers = query({
  args: { password: v.string() },
  handler: async (ctx, { password }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || password !== expected) {
      return { ok: false as const };
    }

    const users = await ctx.db.query("users").collect();
    const accessRows = await ctx.db.query("accountAccess").collect();
    const accessByUser = new Map(accessRows.map((a) => [a.userId, a]));
    const now = Date.now();

    return {
      ok: true as const,
      users: users
        .filter((u) => u.email && u.isAnonymous !== true)
        .map((u) => {
          const access = accessByUser.get(u._id);
          return {
            _id: u._id,
            email: u.email ?? "",
            name: u.name ?? null,
            createdAt: u._creationTime,
            accessExpiresAt: access?.expiresAt ?? null,
            accessSource: access?.source ?? null,
            expired: access?.expiresAt !== undefined && access.expiresAt < now,
            hasAccess:
              access !== undefined &&
              (access.expiresAt === undefined || access.expiresAt > now),
          };
        }),
    };
  },
});

/**
 * Admin: grant or extend access for a specific user (undefined = lifetime).
 */
export const adminGrantAccess = mutation({
  args: {
    password: v.string(),
    userId: v.id("users"),
    expiryDays: v.optional(v.number()),
  },
  handler: async (ctx, { password, userId, expiryDays }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || password !== expected) {
      throw new Error("Unauthorized");
    }
    const expiresAt =
      expiryDays && expiryDays > 0 ? Date.now() + expiryDays * 86_400_000 : undefined;
    await grantAccess(ctx, userId, "code", expiresAt);
  },
});

/**
 * Admin: revoke access for a specific user.
 */
export const adminRevokeAccess = mutation({
  args: { password: v.string(), userId: v.id("users") },
  handler: async (ctx, { password, userId }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || password !== expected) {
      throw new Error("Unauthorized");
    }
    const rows = await ctx.db
      .query("accountAccess")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    for (const row of rows) {
      await ctx.db.patch(row._id, { expiresAt: 1 });
    }
  },
});

/**
 * Public: does the signed-in user have valid (non-expired) access, and until
 * when? Called by the dashboard and RequireAuth.
 *
 * state: "active" | "expired" (had access, date passed) | "none" (no grant).
 * Guests (anonymous) keep lifetime access; email accounts need a code or an
 * admin grant.
 */
export const myAccess = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return { hasAccess: false as const, expiresAt: null, state: "none" as const };
    }

    const rows = await ctx.db
      .query("accountAccess")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const row = rows[0];
    if (row) {
      if (row.expiresAt !== undefined && row.expiresAt < Date.now()) {
        return {
          hasAccess: false as const,
          expiresAt: row.expiresAt,
          state: "expired" as const,
        };
      }
      return {
        hasAccess: true as const,
        expiresAt: row.expiresAt ?? null,
        state: "active" as const,
      };
    }

    // No access record: guests keep access; email accounts are locked.
    const user = await ctx.db.get(userId);
    if (user?.isAnonymous === true) {
      return { hasAccess: true as const, expiresAt: null, state: "active" as const };
    }
    return { hasAccess: false as const, expiresAt: null, state: "none" as const };
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
    if (row.expiresAt !== undefined && row.expiresAt < Date.now()) {
      return { ok: false as const, reason: "expired" as const };
    }
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
    await grantAccess(ctx, userId, "code", row.expiresAt);
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
    if (row.expiresAt !== undefined && row.expiresAt < Date.now()) {
      return { ok: false as const, reason: "expired" as const };
    }
    if (row.usedBy) {
      // Idempotent: reclaiming your own code is fine (e.g. page refresh).
      if (row.usedBy === userId) {
        await grantAccess(ctx, userId, "code", row.expiresAt);
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
    await grantAccess(ctx, userId, "code", row.expiresAt);
    return { ok: true as const, claimed: true as const };
  },
});

/**
 * Called after a fresh email sign-up. No automatic trial: access is granted
 * ONLY when a valid (non-expired) invite code is provided. Without a code the
 * account is created but stays locked until a code is redeemed or the admin
 * grants access.
 */
export const grantEmailAccess = mutation({
  args: {
    inviteCode: v.optional(v.string()),
  },
  handler: async (ctx, { inviteCode }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return { ok: false as const, reason: "not_authenticated" as const };
    }

    if (!inviteCode) {
      // No trial: account created without access.
      return { ok: true as const, granted: false as const };
    }

    const normalized = inviteCode.trim().toUpperCase();
    if (/^[A-Z0-9]{8}$/.test(normalized)) {
      const row = await ctx.db
        .query("accessCodes")
        .withIndex("by_code", (q) => q.eq("code", normalized))
        .unique();
      const valid =
        row &&
        row.active &&
        (row.expiresAt === undefined || row.expiresAt > Date.now()) &&
        (row.usedBy === undefined || row.usedBy === userId);
      if (valid) {
        await ctx.db.patch(row._id, {
          usedBy: userId,
          usedAt: Date.now(),
        });
        await grantAccess(ctx, userId, "code", row.expiresAt);
        return { ok: true as const, granted: true as const };
      }
    }
    return { ok: false as const, reason: "invalid_code" as const };
  },
});
