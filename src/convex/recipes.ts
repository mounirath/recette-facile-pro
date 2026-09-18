import { getAuthUserId } from "@convex-dev/auth/server";
import {
  action,
  internalMutation,
  internalQuery,
  mutation,
  query,
  type ActionCtx,
  type MutationCtx,
} from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

const DAY_MS = 86_400_000;
/** YouTube cache TTL: 12 h. */
const TTL_MS = 12 * 60 * 60 * 1000;

/**
 * Extract the YouTube video id from any common URL shape
 * (watch?v=, youtu.be/, shorts/, embed/, live/) or a bare id.
 */
export function parseYoutubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([\w-]{11})/,
    /youtu\.be\/([\w-]{11})/,
    /youtube\.com\/shorts\/([\w-]{11})/,
    /youtube\.com\/embed\/([\w-]{11})/,
    /youtube\.com\/live\/([\w-]{11})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  if (/^[\w-]{11}$/.test(url.trim())) return url.trim();
  return null;
}

function requireAdmin(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || password !== expected) {
    throw new Error("Unauthorized");
  }
}

/** Cached YouTube title lookup (12h TTL). Actions only. */
async function resolveYoutubeTitle(
  ctx: ActionCtx,
  videoId: string,
): Promise<string | null> {
  const cached = await ctx.runQuery(internal.recipes.getCached, { videoId });
  if (cached && Date.now() - cached.fetchedAt < TTL_MS) {
    return cached.title ?? null;
  }
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(
        `https://www.youtube.com/watch?v=${videoId}`,
      )}&format=json`,
    );
    const title = res.ok
      ? ((await res.json()) as { title?: string }).title ?? null
      : null;
    await ctx.runMutation(internal.recipes.putCached, { videoId, title });
    return title;
  } catch {
    return cached?.title ?? null;
  }
}

export const getCached = internalQuery({
  args: { videoId: v.string() },
  handler: async (ctx, { videoId }) => {
    return (
      (await ctx.db
        .query("youtubeCache")
        .withIndex("by_video_id", (q) => q.eq("videoId", videoId))
        .unique()) ?? null
    );
  },
});

export const putCached = internalMutation({
  args: { videoId: v.string(), title: v.union(v.string(), v.null()) },
  handler: async (ctx, { videoId, title }) => {
    const cached = await ctx.db
      .query("youtubeCache")
      .withIndex("by_video_id", (q) => q.eq("videoId", videoId))
      .unique();
    if (cached) {
      await ctx.db.patch(cached._id, { title: title ?? undefined, fetchedAt: Date.now() });
    } else {
      await ctx.db.insert("youtubeCache", {
        videoId,
        title: title ?? undefined,
        fetchedAt: Date.now(),
      });
    }
  },
});

/**
 * Admin: create a custom recipe (or update an existing custom one with the
 * same slug).
 */
export const upsertRecipe = mutation({
  args: {
    password: v.string(),
    slug: v.string(),
    section: v.union(
      v.literal("menage"),
      v.literal("soin"),
      v.literal("auto"),
      v.literal("business"),
    ),
    titleFr: v.string(),
    titleAr: v.string(),
    taglineFr: v.string(),
    taglineAr: v.string(),
    difficulty: v.number(),
    warningsFr: v.array(v.string()),
    warningsAr: v.array(v.string()),
    tipsFr: v.array(v.string()),
    tipsAr: v.array(v.string()),
    ingredients: v.array(
      v.object({
        fr: v.string(),
        ar: v.string(),
        percent: v.union(v.number(), v.null()),
      }),
    ),
    stepsFr: v.array(v.string()),
    stepsAr: v.array(v.string()),
    photoUrl: v.optional(v.string()),
    youtubeUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    requireAdmin(args.password);

    let youtubeId: string | undefined;
    if (args.youtubeUrl && args.youtubeUrl.trim()) {
      const parsed = parseYoutubeId(args.youtubeUrl);
      if (!parsed) throw new Error("invalid_youtube_url");
      youtubeId = parsed;
    }

    const existing = await ctx.db
      .query("recipes")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    const doc = {
      slug: args.slug,
      section: args.section,
      titleFr: args.titleFr,
      titleAr: args.titleAr,
      taglineFr: args.taglineFr,
      taglineAr: args.taglineAr,
      difficulty: Math.min(2, Math.max(0, Math.round(args.difficulty))),
      warningsFr: args.warningsFr,
      warningsAr: args.warningsAr,
      tipsFr: args.tipsFr,
      tipsAr: args.tipsAr,
      ingredients: args.ingredients,
      stepsFr: args.stepsFr,
      stepsAr: args.stepsAr,
      photoUrl: args.photoUrl,
      youtubeId,
      youtubeTitle: undefined,
      updatedAt: Date.now(),
    };

    if (existing) {
      await ctx.db.patch(existing._id, doc);
      return existing._id;
    }
    return await ctx.db.insert("recipes", doc);
  },
});

/**
 * Admin: set / update / clear the YouTube video of any recipe (custom or
 * built-in override). Fetches the video title via oEmbed (cached 12h).
 */
export const setRecipeVideo = action({
  args: { password: v.string(), slug: v.string(), youtubeUrl: v.string() },
  handler: async (ctx, { password, slug, youtubeUrl }) => {
    requireAdmin(password);
    const recipe = await ctx.runQuery(internal.recipes.getBySlug, { slug });
    if (!recipe) throw new Error("recipe_not_found");

    if (!youtubeUrl.trim()) {
      await ctx.runMutation(internal.recipes.patchVideo, {
        slug,
        youtubeId: undefined,
        youtubeTitle: undefined,
      });
      return { videoId: null, title: null };
    }

    const videoId = parseYoutubeId(youtubeUrl);
    if (!videoId) throw new Error("invalid_youtube_url");

    const title = await resolveYoutubeTitle(ctx, videoId);
    await ctx.runMutation(internal.recipes.patchVideo, {
      slug,
      youtubeId: videoId,
      youtubeTitle: title ?? undefined,
    });
    return { videoId, title };
  },
});

export const getBySlug = internalQuery({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return (
      (await ctx.db
        .query("recipes")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .unique()) ?? null
    );
  },
});

export const patchVideo = internalMutation({
  args: {
    slug: v.string(),
    youtubeId: v.optional(v.string()),
    youtubeTitle: v.optional(v.string()),
  },
  handler: async (ctx, { slug, youtubeId, youtubeTitle }) => {
    const recipe = await ctx.db
      .query("recipes")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (recipe) {
      await ctx.db.patch(recipe._id, {
        youtubeId,
        youtubeTitle,
        updatedAt: Date.now(),
      });
    }
  },
});

/**
 * Admin: update an override on a built-in course (title/tagline/difficulty/
 * photo/hidden) without touching the base data file. Video is managed via
 * setRecipeVideo.
 */
export const upsertOverride = mutation({
  args: {
    password: v.string(),
    slug: v.string(),
    titleFr: v.optional(v.string()),
    titleAr: v.optional(v.string()),
    taglineFr: v.optional(v.string()),
    taglineAr: v.optional(v.string()),
    difficulty: v.optional(v.number()),
    photoUrl: v.optional(v.string()),
    hidden: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    requireAdmin(args.password);
    const { password: _pw, slug, ...patch } = args;

    const existing = await ctx.db
      .query("recipes")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    const update: Record<string, unknown> = { updatedAt: Date.now() };
    if (patch.titleFr !== undefined) update.titleFr = patch.titleFr;
    if (patch.titleAr !== undefined) update.titleAr = patch.titleAr;
    if (patch.taglineFr !== undefined) update.taglineFr = patch.taglineFr;
    if (patch.taglineAr !== undefined) update.taglineAr = patch.taglineAr;
    if (patch.difficulty !== undefined)
      update.difficulty = Math.min(2, Math.max(0, Math.round(patch.difficulty)));
    if (patch.photoUrl !== undefined) update.photoUrl = patch.photoUrl;
    if (patch.hidden !== undefined) update.hidden = patch.hidden;

    if (existing) {
      await ctx.db.patch(existing._id, update);
      return existing._id;
    }
    // New override row for a built-in course: empty fields fall back to base.
    return await ctx.db.insert("recipes", {
      slug,
      section: "menage",
      titleFr: "",
      titleAr: "",
      taglineFr: "",
      taglineAr: "",
      difficulty: 0,
      warningsFr: [],
      warningsAr: [],
      tipsFr: [],
      tipsAr: [],
      ingredients: [],
      stepsFr: [],
      stepsAr: [],
      updatedAt: Date.now(),
      ...update,
    });
  },
});

/** Admin: delete a custom recipe (built-in overrides are reset instead). */
export const deleteRecipe = mutation({
  args: { password: v.string(), slug: v.string() },
  handler: async (ctx, { password, slug }) => {
    requireAdmin(password);
    const existing = await ctx.db
      .query("recipes")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (existing) {
      await ctx.db.delete(existing._id);
    }
  },
});

/**
 * Public list of custom recipes + overrides, merged client-side with the
 * static base catalog.
 */
export const listPublic = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("recipes").collect();
    return rows.map((r) => ({
      slug: r.slug,
      section: r.section,
      titleFr: r.titleFr,
      titleAr: r.titleAr,
      taglineFr: r.taglineFr,
      taglineAr: r.taglineAr,
      difficulty: r.difficulty,
      warningsFr: r.warningsFr,
      warningsAr: r.warningsAr,
      tipsFr: r.tipsFr,
      tipsAr: r.tipsAr,
      ingredients: r.ingredients,
      stepsFr: r.stepsFr,
      stepsAr: r.stepsAr,
      photoUrl: r.photoUrl ?? null,
      youtubeId: r.youtubeId ?? null,
      youtubeTitle: r.youtubeTitle ?? null,
      hidden: r.hidden ?? null,
    }));
  },
});
