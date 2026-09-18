import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

function requireAdmin(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || password !== expected) {
    throw new Error("Unauthorized");
  }
}

/**
 * Admin: create or update a publication (announcement / news post).
 * Bilingual (FR + AR), optional YouTube video, publish toggle.
 */
export const upsertPost = mutation({
  args: {
    password: v.string(),
    id: v.optional(v.id("posts")),
    titleFr: v.string(),
    titleAr: v.string(),
    bodyFr: v.string(),
    bodyAr: v.string(),
    youtubeUrl: v.optional(v.string()),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    requireAdmin(args.password);

    // Parse YouTube id from any common URL shape (or a bare id).
    let youtubeId: string | undefined;
    if (args.youtubeUrl && args.youtubeUrl.trim()) {
      const url = args.youtubeUrl.trim();
      const patterns = [
        /(?:youtube\.com\/watch\?(?:.*&)?v=)([\w-]{11})/,
        /youtu\.be\/([\w-]{11})/,
        /youtube\.com\/shorts\/([\w-]{11})/,
        /youtube\.com\/embed\/([\w-]{11})/,
        /youtube\.com\/live\/([\w-]{11})/,
      ];
      for (const re of patterns) {
        const m = url.match(re);
        if (m) {
          youtubeId = m[1];
          break;
        }
      }
      if (!youtubeId && /^[\w-]{11}$/.test(url)) youtubeId = url;
      if (!youtubeId) throw new Error("invalid_youtube_url");
    }

    const doc = {
      titleFr: args.titleFr.trim(),
      titleAr: args.titleAr.trim(),
      bodyFr: args.bodyFr,
      bodyAr: args.bodyAr,
      youtubeId,
      published: args.published,
      updatedAt: Date.now(),
    };

    if (args.id) {
      await ctx.db.patch(args.id, doc);
      return args.id;
    }
    return await ctx.db.insert("posts", {
      ...doc,
      createdAt: Date.now(),
    });
  },
});

/**
 * Admin: toggle publish state.
 */
export const setPostPublished = mutation({
  args: { password: v.string(), id: v.id("posts"), published: v.boolean() },
  handler: async (ctx, { password, id, published }) => {
    requireAdmin(password);
    await ctx.db.patch(id, { published, updatedAt: Date.now() });
  },
});

/**
 * Admin: delete a publication.
 */
export const deletePost = mutation({
  args: { password: v.string(), id: v.id("posts") },
  handler: async (ctx, { password, id }) => {
    requireAdmin(password);
    await ctx.db.delete(id);
  },
});

/**
 * Admin list: all publications (drafts included), newest first.
 */
export const listAdmin = query({
  args: { password: v.string() },
  handler: async (ctx, { password }) => {
    requireAdmin(password);
    const rows = await ctx.db.query("posts").withIndex("by_created").order("desc").collect();
    return rows.map((r) => ({
      _id: r._id,
      titleFr: r.titleFr,
      titleAr: r.titleAr,
      bodyFr: r.bodyFr,
      bodyAr: r.bodyAr,
      youtubeId: r.youtubeId ?? null,
      published: r.published,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }));
  },
});

/**
 * Public list: published publications only, newest first.
 */
export const listPublic = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("posts")
      .withIndex("by_created")
      .order("desc")
      .collect();
    return rows
      .filter((r) => r.published)
      .map((r) => ({
        _id: r._id,
        titleFr: r.titleFr,
        titleAr: r.titleAr,
        bodyFr: r.bodyFr,
        bodyAr: r.bodyAr,
        youtubeId: r.youtubeId ?? null,
        createdAt: r.createdAt,
      }));
  },
});
