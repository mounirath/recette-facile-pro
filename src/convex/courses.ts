import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Returns all progress rows for the signed-in user, keyed by course slug.
 */
export const listProgress = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return {};

    const rows = await ctx.db
      .query("courseProgress")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const bySlug: Record<string, { completed: boolean; completedAt?: number }> =
      {};
    for (const row of rows) {
      bySlug[row.courseSlug] = {
        completed: row.completed,
        completedAt: row.completedAt,
      };
    }
    return bySlug;
  },
});

/**
 * Marks a course lesson as completed (or not) for the signed-in user.
 */
export const setProgress = mutation({
  args: {
    courseSlug: v.string(),
    completed: v.boolean(),
  },
  handler: async (ctx, { courseSlug, completed }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("courseProgress")
      .withIndex("by_user_course", (q) =>
        q.eq("userId", userId).eq("courseSlug", courseSlug),
      )
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        completed,
        completedAt: completed ? Date.now() : undefined,
      });
      return existing._id;
    }

    return await ctx.db.insert("courseProgress", {
      userId,
      courseSlug,
      completed,
      completedAt: completed ? Date.now() : undefined,
    });
  },
});
