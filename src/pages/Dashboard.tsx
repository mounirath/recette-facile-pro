import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useMutation, useQuery } from "convex/react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  Circle,
  FlaskConical,
  GraduationCap,
  Lightbulb,
  LogOut,
  Scale,
  Search,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useLang } from "@/i18n";
import { COURSES, SECTIONS, totalPercent, type Course } from "@/data/courses";
import {
  DishIcon,
  SoapIcon,
  OvenIcon,
  BleachIcon,
  LaundryIcon,
  FloorIcon,
  GlassIcon,
  BathroomIcon,
  SoftenerIcon,
  ScrubIcon,
  SoapbarIcon,
  ShampooIcon,
  BodyWashIcon,
  ChartIcon,
  SafetyIcon,
  LabelIcon,
  LabScene,
} from "@/components/Illustrations";

const ICONS = {
  dish: DishIcon,
  soap: SoapIcon,
  oven: OvenIcon,
  bleach: BleachIcon,
  laundry: LaundryIcon,
  floor: FloorIcon,
  glass: GlassIcon,
  bathroom: BathroomIcon,
  softener: SoftenerIcon,
  scrub: ScrubIcon,
  soapbar: SoapbarIcon,
  shampoo: ShampooIcon,
  body: BodyWashIcon,
  chart: ChartIcon,
  safety: SafetyIcon,
  label: LabelIcon,
} as const;

function CourseIcon({
  icon,
  className,
}: {
  icon: Course["icon"];
  className?: string;
}) {
  const Cmp = ICONS[icon];
  return <Cmp className={className} />;
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t, lang, setLang } = useLang();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSlug = searchParams.get("course");
  const selected = selectedSlug ? COURSES.find((c) => c.slug === selectedSlug) : undefined;

  const [search, setSearch] = useState("");
  const [sectionFilter, setSectionFilter] = useState<
    "all" | "menage" | "soin" | "business"
  >("all");

  const progress = useQuery(api.courses.listProgress, {}) ?? {};
  const setProgress = useMutation(api.courses.setProgress);

  const doneCount = useMemo(
    () => COURSES.filter((c) => progress[c.slug]?.completed).length,
    [progress],
  );
  const allDone = doneCount === COURSES.length;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return COURSES.filter((c) => {
      if (sectionFilter !== "all" && c.section !== sectionFilter) return false;
      if (!q) return true;
      return (
        c.title.fr.toLowerCase().includes(q) ||
        c.title.ar.includes(q) ||
        c.ingredients.some((i) => i.fr.toLowerCase().includes(q) || i.ar.includes(q))
      );
    });
  }, [search, sectionFilter]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const openCourse = (slug: string) =>
    setSearchParams({ course: slug }, { replace: false });
  const closeCourse = () => setSearchParams({}, { replace: false });

  const toggleDone = (slug: string, completed: boolean) => {
    void setProgress({ courseSlug: slug, completed });
  };

  const isGuest = user?.isAnonymous === true;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <button
            onClick={closeCourse}
            className="flex items-center gap-2.5"
          >
            <img src="/logo.svg" alt="" className="size-9 rounded-lg" />
            <span className="text-start leading-tight">
              <span className="block font-display text-base font-bold">
                {t.brand}
              </span>
              <span className="block text-[11px] text-muted-foreground">
                {t.dash.kicker}
              </span>
            </span>
          </button>
          <div className="flex items-center gap-2">
            <div className="flex overflow-hidden rounded-full border border-border text-xs font-semibold">
              <button
                onClick={() => setLang("fr")}
                className={`px-2.5 py-1.5 transition-colors ${
                  lang === "fr"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLang("ar")}
                className={`px-2.5 py-1.5 transition-colors ${
                  lang === "ar"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                AR
              </button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">{t.cta.signOut}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {selected ? (
          <CourseDetail
            course={selected}
            done={progress[selected.slug]?.completed === true}
            onBack={closeCourse}
            onToggle={() =>
              toggleDone(selected.slug, !(progress[selected.slug]?.completed === true))
            }
          />
        ) : (
          <>
            {/* ===== PROGRESS BANNER ===== */}
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-3xl border border-border/70 bg-bubbles p-6 shadow-sm sm:p-8"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="flex-1">
                  <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <GraduationCap className="size-4" />
                    {t.dash.kicker}
                  </p>
                  <h1 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">
                    {t.dash.welcome}
                    {user?.name ? `, ${user.name}` : ""} 👋
                  </h1>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {isGuest ? t.dash.guestHint : t.dash.subtitle}
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(doneCount / COURSES.length) * 100}%`,
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                    <span className="shrink-0 text-sm font-bold text-primary">
                      {doneCount}/{COURSES.length} {t.dash.recipesDone}
                    </span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <LabScene className="w-56 text-primary/80" />
                </div>
              </div>
            </motion.section>

            {/* ===== CERTIFICATE ===== */}
            {allDone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 flex items-center gap-4 rounded-2xl border border-accent/50 bg-accent/10 p-5"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-accent/30 text-accent-foreground">
                  <Award className="size-6" />
                </div>
                <div>
                  <p className="font-display font-bold">{t.dash.certUnlocked}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.dash.certTitle} · 18/18
                  </p>
                </div>
              </motion.div>
            )}

            {/* ===== SEARCH + FILTERS ===== */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t.dash.searchPlaceholder}
                  className="ps-9"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Button
                  size="sm"
                  variant={sectionFilter === "all" ? "default" : "outline"}
                  onClick={() => setSectionFilter("all")}
                >
                  {t.dash.allSections}
                </Button>
                {SECTIONS.map((s) => (
                  <Button
                    key={s.id}
                    size="sm"
                    variant={sectionFilter === s.id ? "default" : "outline"}
                    onClick={() => setSectionFilter(s.id)}
                  >
                    {s.name[lang]}
                  </Button>
                ))}
              </div>
            </div>

            {/* ===== CATALOG ===== */}
            {filtered.length === 0 ? (
              <p className="mt-16 text-center text-muted-foreground">
                {t.dash.noResults}
              </p>
            ) : (
              SECTIONS.map((section) => {
                const list = filtered.filter((c) => c.section === section.id);
                if (list.length === 0) return null;
                return (
                  <section key={section.id} className="mt-10">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <CourseIcon icon={section.icon} className="size-6" />
                      </div>
                      <div>
                        <h2 className="font-display text-lg font-bold">
                          {section.name[lang]}
                        </h2>
                        <p className="text-xs text-muted-foreground">
                          {section.desc[lang]}
                        </p>
                      </div>
                      <Badge variant="secondary" className="ms-auto">
                        {list.length} {lang === "fr" ? "recettes" : "وصفات"}
                      </Badge>
                    </div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {list.map((course, i) => {
                        const done = progress[course.slug]?.completed === true;
                        return (
                          <motion.button
                            key={course.slug}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.35, delay: i * 0.05 }}
                            onClick={() => openCourse(course.slug)}
                            className={`group flex flex-col rounded-2xl border bg-card p-5 text-start shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                              done
                                ? "border-primary/50 bg-primary/5"
                                : "border-border/70"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                                <CourseIcon icon={course.icon} className="size-6" />
                              </div>
                              {done ? (
                                <CheckCircle2 className="size-5 text-primary" />
                              ) : (
                                <Circle className="size-5 text-border" />
                              )}
                            </div>
                            <h3 className="mt-3 font-display text-base font-semibold leading-snug">
                              {course.title[lang]}
                            </h3>
                            <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                              {course.tagline[lang]}
                            </p>
                            <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
                              <Badge
                                variant="secondary"
                                className="text-[10px]"
                              >
                                {t.dash.levels[course.difficulty]}
                              </Badge>
                              <span className="font-medium text-primary">
                                {done
                                  ? t.dash.review
                                  : doneCount > 0
                                    ? t.dash.continueLesson
                                    : t.dash.startLesson}
                                →
                              </span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </section>
                );
              })
            )}
          </>
        )}
      </div>
    </main>
  );
}

/* ================= COURSE DETAIL ================= */

function CourseDetail({
  course,
  done,
  onBack,
  onToggle,
}: {
  course: Course;
  done: boolean;
  onBack: () => void;
  onToggle: () => void;
}) {
  const { t, lang } = useLang();
  const [batchLiters, setBatchLiters] = useState(5);

  const named = course.ingredients.filter((i) => i.percent !== null);
  const water = course.ingredients.find((i) => i.percent === null);
  const namedSum = named.reduce((s, i) => s + (i.percent ?? 0), 0);
  const totalKg = batchLiters;
  // The calculator only makes sense for true percentage-based formulas.
  const showCalc = named.length > 0 && namedSum > 0 && namedSum < 100;

  const grams = (percent: number) =>
    Math.round(((percent / 100) * totalKg * 1000 + Number.EPSILON) * 10) / 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Button
        variant="ghost"
        size="sm"
        className="-ms-2 gap-2 text-muted-foreground"
        onClick={onBack}
      >
        <ArrowLeft className="size-4 rtl:rotate-180" />
        {t.cta.back}
      </Button>

      {/* Title card */}
      <Card className="mt-3 overflow-hidden border-border/70 shadow-sm">
        <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <CourseIcon icon={course.icon} className="size-9" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{t.dash.levels[course.difficulty]}</Badge>
              {named.length > 0 && (
                <Badge variant="outline" className="font-mono text-[11px]">
                  {t.dash.percents}: {totalPercent(course)}%
                  {water ? " + qsp" : ""}
                </Badge>
              )}
            </div>
            <h1 className="mt-2 font-display text-2xl font-extrabold leading-tight">
              {course.title[lang]}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {course.tagline[lang]}
            </p>
          </div>
          <Button
            variant={done ? "secondary" : "default"}
            className="gap-2 self-start sm:self-center"
            onClick={onToggle}
          >
            {done ? (
              <>
                <CheckCircle2 className="size-4" />
                {t.dash.markedDone}
              </>
            ) : (
              <>
                <Circle className="size-4" />
                {t.dash.markDone}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Warnings */}
      {course.warnings.length > 0 && (
        <div className="mt-5 space-y-2.5">
          {course.warnings.map((w, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4"
            >
              <TriangleAlert className="mt-0.5 size-5 shrink-0 text-destructive" />
              <p className="text-sm leading-relaxed text-destructive">
                <span className="font-bold">{t.dash.warnings} — </span>
                {w[lang]}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        {/* Ingredients + calculator */}
        <Card className="border-border/70 shadow-sm lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
          <CardContent className="p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold">
              <FlaskConical className="size-5 text-primary" />
              {t.dash.ingredients}
            </h2>

            {/* Batch calculator */}
            {showCalc && (
            <div className="mt-4 rounded-xl border border-accent/40 bg-accent/10 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Scale className="size-4" />
                {t.dash.batchTitle}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.dash.batchDesc}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <Slider
                  value={[batchLiters]}
                  min={1}
                  max={100}
                  step={1}
                  onValueChange={(v) => setBatchLiters(v[0] ?? batchLiters)}
                  className="flex-1"
                />
                <span className="w-20 shrink-0 rounded-lg bg-card px-2 py-1 text-center font-mono text-sm font-bold text-primary shadow-sm">
                  {batchLiters} {t.dash.liters}
                </span>
              </div>
            </div>
            )}

            <ul className="mt-4 space-y-1.5">
              {course.ingredients.map((ing) => (
                <li
                  key={ing.fr}
                  className="flex items-center justify-between gap-2 rounded-lg bg-muted/60 px-3 py-2"
                >
                  <span className="text-sm">
                    {ing[lang]}
                    {ing.note && (
                      <span className="block text-[11px] text-muted-foreground">
                        {ing.note[lang]}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 text-end">
                    <span className="block font-mono text-xs font-bold text-primary">
                      {ing.display
                        ? ing.display[lang]
                        : ing.percent === null
                          ? "qsp 100%"
                          : `${ing.percent} %`}
                    </span>
                    {ing.percent !== null && (
                      <span className="block font-mono text-[11px] text-muted-foreground">
                        {grams(ing.percent)} {t.dash.grams}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            {water && namedSum > 0 && (
              <p className="mt-2.5 text-end font-mono text-[11px] text-muted-foreground">
                {t.dash.grams}: {grams(100 - namedSum)} {t.dash.grams} (
                {Math.round((100 - namedSum) * 10) / 10} %) — {water[lang]}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Steps + tips */}
        <div className="space-y-6 lg:col-span-3">
          <Card className="border-border/70 shadow-sm">
            <CardContent className="p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <BookOpen className="size-5 text-primary" />
                {t.dash.steps}
              </h2>
              <ol className="mt-4 space-y-0">
                {course.steps.map((step, i) => (
                  <li key={i} className="relative flex gap-4 pb-5 last:pb-0">
                    {i < course.steps.length - 1 && (
                      <span className="absolute start-[15px] top-8 h-[calc(100%-2rem)] w-px bg-border" />
                    )}
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-bold text-primary">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed">
                      {step[lang]}
                    </p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {course.tips.length > 0 && (
            <Card className="border-accent/40 bg-accent/5 shadow-sm">
              <CardContent className="p-6">
                <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                  <Lightbulb className="size-5 text-accent-foreground" />
                  {t.dash.tips}
                </h2>
                <ul className="mt-3 space-y-2">
                  {course.tips.map((tip, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm leading-relaxed"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-foreground/60" />
                      {tip[lang]}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Card className="border-border/70 shadow-sm">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <GraduationCap className="size-6" />
              </div>
              <div className="flex-1">
                <p className="font-display font-bold">{t.dash.certTitle}</p>
                <p className="text-sm text-muted-foreground">
                  {t.dash.certDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Separator className="mt-10" />
    </motion.div>
  );
}
