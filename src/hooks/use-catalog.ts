import { useQuery } from "convex/react";
import { useMemo } from "react";
import { api } from "@/convex/_generated/api";
import { COURSES, type Course, type Ingredient } from "@/data/courses";
import { COURSE_PHOTOS } from "@/data/photos";

type AdminRecipe = {
  slug: string;
  section: Course["section"];
  titleFr: string;
  titleAr: string;
  taglineFr: string;
  taglineAr: string;
  difficulty: number;
  warningsFr: string[];
  warningsAr: string[];
  tipsFr: string[];
  tipsAr: string[];
  ingredients: { fr: string; ar: string; percent: number | null }[];
  stepsFr: string[];
  stepsAr: string[];
  photoUrl: string | null;
  youtubeId: string | null;
  youtubeTitle: string | null;
  hidden: boolean | null;
};

function isAdminFullRecipe(r: AdminRecipe): boolean {
  return (
    r.titleFr.length > 0 &&
    r.titleAr.length > 0 &&
    r.stepsFr.length > 0 &&
    r.stepsAr.length > 0 &&
    r.ingredients.length > 0
  );
}

function toCourse(r: AdminRecipe): Course {
  const ingredients: Ingredient[] = r.ingredients.map((i) => ({
    fr: i.fr,
    ar: i.ar,
    percent: i.percent,
  }));
  return {
    slug: r.slug,
    section: r.section,
    icon: "dish",
    title: { fr: r.titleFr, ar: r.titleAr },
    tagline: { fr: r.taglineFr, ar: r.taglineAr },
    difficulty: (Math.min(2, Math.max(0, Math.round(r.difficulty))) as 0 | 1 | 2),
    warnings: r.warningsFr.map((fr, i) => ({ fr, ar: r.warningsAr[i] ?? fr })),
    tips: r.tipsFr.map((fr, i) => ({ fr, ar: r.tipsAr[i] ?? fr })),
    ingredients,
    steps: r.stepsFr.map((fr, i) => ({ fr, ar: r.stepsAr[i] ?? fr })),
  };
}

/**
 * Live catalog: static base courses merged with admin-managed overrides
 * (title/tagline/difficulty/photo/video/hidden) and custom recipes.
 */
export function useCatalog() {
  const adminRecipes = useQuery(api.recipes.listPublic, {});

  const merged = useMemo(() => {
    const list: (Course & {
      youtubeId?: string | null;
      photoUrl?: string | null;
    })[] = [];

    if (adminRecipes === undefined) {
      // Still loading: show the static catalog immediately.
      for (const c of COURSES) list.push(c);
      return list;
    }

    const overrides = new Map(adminRecipes.map((r) => [r.slug, r]));
    const usedSlugs = new Set<string>();

    for (const base of COURSES) {
      const o = overrides.get(base.slug);
      if (o?.hidden) {
        usedSlugs.add(base.slug);
        continue;
      }
      usedSlugs.add(base.slug);
      list.push({
        ...base,
        title: o?.titleFr ? { fr: o.titleFr, ar: o.titleAr || base.title.ar } : base.title,
        tagline: o?.taglineFr ? { fr: o.taglineFr, ar: o.taglineAr || base.tagline.ar } : base.tagline,
        difficulty:
          o && (o.titleFr || o.taglineFr)
            ? (Math.min(2, Math.max(0, o.difficulty)) as 0 | 1 | 2)
            : base.difficulty,
        youtubeId: o?.youtubeId ?? null,
        photoUrl: o?.photoUrl ?? null,
      });
    }

    for (const r of adminRecipes) {
      if (usedSlugs.has(r.slug)) continue;
      if (r.hidden) continue;
      if (!isAdminFullRecipe(r)) continue; // half-created custom recipe
      list.push({
        ...toCourse(r),
        youtubeId: r.youtubeId,
        photoUrl: r.photoUrl,
      });
    }

    return list;
  }, [adminRecipes]);

  return { courses: merged, isLoading: adminRecipes === undefined };
}
