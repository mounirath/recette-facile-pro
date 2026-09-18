import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Admin dashboard query. Verifies a shared password stored in the
 * ADMIN_PASSWORD environment variable (set from the Keys/API keys UI),
 * then returns global platform statistics.
 *
 * The password is never stored client-side beyond the browser session and
 * comparison happens server-side only.
 */
export const adminStats = query({
  args: { password: v.string() },
  handler: async (ctx, { password }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) {
      return { ok: false as const, reason: "not_configured" as const };
    }

    if (password !== expected) {
      return { ok: false as const, reason: "bad_password" as const };
    }

    // --- Global statistics -------------------------------------------------
    const users = await ctx.db.query("users").collect();
    const progressRows = await ctx.db
      .query("courseProgress")
      .withIndex("by_user")
      .collect();

    const totalCompletions = progressRows.filter((r) => r.completed).length;

    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const last7 = progressRows.filter(
      (r) => r.completed && r.completedAt && now - r.completedAt < 7 * dayMs,
    ).length;
    const last30 = progressRows.filter(
      (r) => r.completed && r.completedAt && now - r.completedAt < 30 * dayMs,
    ).length;

    // Active users: learners who validated at least one recipe
    const activeUserIds = new Set(
      progressRows.filter((r) => r.completed).map((r) => r.userId),
    );

    // Weekly registration trend (last 6 weeks)
    const weekMs = 7 * dayMs;
    const weeks = Array.from({ length: 6 }, (_, i) => {
      const end = now - i * weekMs;
      const start = end - weekMs;
      return {
        label: i === 0 ? "S-0" : `S-${i}`,
        count: users.filter((u) => {
          // authTables users carry a creation time via _creationTime
          return (
            (u._creationTime ?? 0) >= start && (u._creationTime ?? 0) < end
          );
        }).length,
      };
    }).reverse();

    return {
      ok: true as const,
      stats: {
        totalUsers: users.length,
        guestUsers: users.filter((u) => u.isAnonymous === true).length,
        registeredUsers: users.filter((u) => u.isAnonymous !== true).length,
        activeUsers: activeUserIds.size,
        totalCompletions,
        completionsLast7: last7,
        completionsLast30: last30,
        weeks,
      },
    };
  },
});
