import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // per-user completion of each course/recipe lesson
    courseProgress: defineTable({
      userId: v.id("users"),
      courseSlug: v.string(),
      completed: v.boolean(),
      completedAt: v.optional(v.number()),
    })
      .index("by_user", ["userId"])
      .index("by_user_course", ["userId", "courseSlug"]),

    // access codes generated in the admin dashboard; redeemed by users at /auth
    accessCodes: defineTable({
      code: v.string(), // 8-char uppercase code, e.g. "AB12CD34"
      label: v.optional(v.string()), // optional note, e.g. student/group name
      active: v.boolean(),
      usedBy: v.optional(v.id("users")), // user who redeemed the code
      usedAt: v.optional(v.number()),
      // Optional expiry date (ms epoch). After this date the code no longer
      // grants access and (if redeemed) the redeemed account loses access.
      expiresAt: v.optional(v.number()),
      createdAt: v.number(),
    })
      .index("by_code", ["code"])
      .index("by_created", ["createdAt"]),

    // Per-user paid access: email accounts get access on sign-up; code
    // redemption extends it. `expiresAt === undefined` means lifetime access.
    accountAccess: defineTable({
      userId: v.id("users"),
      source: v.union(v.literal("email"), v.literal("code")),
      expiresAt: v.optional(v.number()),
      grantedAt: v.number(),
    }).index("by_user", ["userId"]),

    // Admin-managed recipes: custom recipes AND overrides of built-in courses
    // (same slug). Fields left empty on an override fall back to the static
    // base course in src/data/courses.ts.
    recipes: defineTable({
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
      youtubeId: v.optional(v.string()),
      youtubeTitle: v.optional(v.string()),
      icon: v.optional(v.string()),
      hidden: v.optional(v.boolean()),
      updatedAt: v.number(),
    })
      .index("by_slug", ["slug"])
      .index("by_section", ["section"]),

    // Cache of YouTube oEmbed titles (12h TTL) to avoid repeated fetches.
    youtubeCache: defineTable({
      videoId: v.string(),
      title: v.optional(v.string()),
      fetchedAt: v.number(),
    }).index("by_video_id", ["videoId"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;
