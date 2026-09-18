import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  Check,
  Globe,
  Lock,
  Sparkles,
  Droplets,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";
import { useLang } from "@/i18n";
import { COURSES, SECTIONS } from "@/data/courses";
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
  CarIcon,
  WaxIcon,
  InteriorIcon,
  WheelIcon,
  ChartIcon,
  SafetyIcon,
  LabelIcon,
  HeroBottles,
  LabScene,
} from "@/components/Illustrations";
import type { Course } from "@/data/courses";

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
  car: CarIcon,
  wax: WaxIcon,
  interior: InteriorIcon,
  wheel: WheelIcon,
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

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t, lang, setLang } = useLang();
  const [sample, setSample] = useState<Course | null>(null);

  const featured = useMemo(() => COURSES.slice(0, 6), []);
  const goto = useMemo(
    () => (isAuthenticated ? "/dashboard" : "/auth?returnTo=%2Fdashboard"),
    [isAuthenticated],
  );

  const start = () => navigate(goto);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-foreground"
    >
      {/* ===== NAVBAR ===== */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5"
          >
            <img src="/logo.svg" alt="" className="size-9 rounded-lg" />
            <span className="text-start leading-tight">
              <span className="block font-display text-base font-bold">
                {t.brand}
              </span>
              <span className="block text-[11px] text-muted-foreground">
                {t.brandTag}
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="#sections" className="transition-colors hover:text-foreground">
              {t.nav.courses}
            </a>
            <a href="#recipes" className="transition-colors hover:text-foreground">
              {t.nav.recipes}
            </a>
            <a href="#pricing" className="transition-colors hover:text-foreground">
              {t.nav.pricing}
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              {t.nav.faq}
            </a>
          </nav>

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
            <Button size="sm" onClick={start} className="gap-2">
              <Sparkles className="size-4" />
              {isAuthenticated ? t.nav.dashboard : t.cta.getStarted}
            </Button>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-bubbles">
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-40" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <Badge
              variant="outline"
              className="mb-5 gap-1.5 border-accent/60 bg-accent/10 text-accent-foreground"
            >
              <Globe className="size-3.5" />
              {t.hero.badge}
            </Badge>
            <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              {t.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={start} className="gap-2 shadow-lg shadow-primary/20">
                <Droplets className="size-5" />
                {t.hero.primaryCta}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  document
                    .getElementById("recipes")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {t.hero.secondaryCta}
              </Button>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {t.hero.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border/70 bg-card/80 px-3 py-3 text-center shadow-sm"
                >
                  <dt className="font-display text-xl font-bold text-primary">
                    {s.value}
                  </dt>
                  <dd className="mt-0.5 text-xs text-muted-foreground">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative hidden justify-center md:flex">
            <div className="animate-float">
              <HeroBottles className="w-full max-w-md text-primary drop-shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-foreground/80">
            {t.features.kicker}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            {t.features.title}
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.features.items.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                {i === 0 && <Droplets className="size-5" />}
                {i === 1 && <ChartIcon className="size-5" />}
                {i === 2 && <LabScene className="size-5" />}
                {i === 3 && <Globe className="size-5" />}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== SECTIONS / PROGRAM ===== */}
      <section id="sections" className="bg-secondary/50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-foreground/80">
              {t.sections.kicker}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              {t.sections.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{t.sections.subtitle}</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {SECTIONS.map((section, i) => {
              const list = COURSES.filter((c) => c.section === section.id);
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <CourseIcon icon={section.icon} className="size-7" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold">
                    {section.name[lang]}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {section.desc[lang]}
                  </p>
                  <ul className="mt-4 flex-1 space-y-2 text-sm">
                    {list.slice(0, 5).map((c) => (
                      <li key={c.slug} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{c.title[lang]}</span>
                      </li>
                    ))}
                    {list.length > 5 && (
                      <li className="text-xs font-medium text-muted-foreground">
                        +{list.length - 5} …
                      </li>
                    )}
                  </ul>
                  <Button
                    className="mt-5 w-full"
                    variant="secondary"
                    onClick={start}
                  >
                    {t.cta.explore}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SAMPLE RECIPES ===== */}
      <section id="recipes" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-foreground/80">
            {t.sample.kicker}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            {t.sample.title}
          </h2>
          <p className="mt-3 text-muted-foreground">{t.sample.subtitle}</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((course) => (
            <motion.button
              key={course.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
              onClick={() => setSample(course)}
              className="group flex flex-col rounded-2xl border border-border/70 bg-card p-5 text-start shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <CourseIcon icon={course.icon} className="size-7" />
                </div>
                <Badge variant="secondary" className="text-[11px]">
                  {t.dash.levels[course.difficulty]}
                </Badge>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold leading-snug">
                {course.title[lang]}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {course.tagline[lang]}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
                <span>{course.ingredients.length} ingr.</span>
                <span>{course.steps.length} ét.</span>
                <span className="flex items-center gap-1 font-medium text-primary">
                  {t.cta.viewRecipe}
                  <Lock className="size-3" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="bg-primary/5 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-foreground/80">
              {t.pricing.kicker}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              {t.pricing.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{t.pricing.subtitle}</p>
          </div>
          <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
            {t.pricing.plans.map((plan, i) => {
              const highlighted = i === 1;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`relative flex flex-col rounded-2xl border p-6 shadow-sm ${
                    highlighted
                      ? "border-primary bg-card shadow-lg shadow-primary/10"
                      : "border-border/70 bg-card"
                  }`}
                >
                  {highlighted && (
                    <Badge className="absolute -top-3 start-6 gap-1">
                      <Sparkles className="size-3" />
                      {t.pricing.popular}
                    </Badge>
                  )}
                  <h3 className="font-display text-lg font-bold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {plan.desc}
                  </p>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="font-display text-4xl font-extrabold">
                      {plan.price}
                    </span>
                    <span className="pb-1 text-sm text-muted-foreground">
                      €{t.pricing.perMonth}
                    </span>
                  </div>
                  <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-6 w-full"
                    variant={highlighted ? "default" : "outline"}
                    onClick={start}
                  >
                    {t.pricing.choose}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SAFETY BANNER ===== */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-accent/40 bg-accent/10 p-8 text-center md:flex-row md:text-start">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-accent/30 text-accent-foreground">
            <ShieldCheck className="size-8" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-xl font-bold">
              {t.faq.items[0].q}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {t.faq.items[0].a}
            </p>
          </div>
          <Button onClick={start}>{t.cta.getStarted}</Button>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="mx-auto max-w-3xl px-4 pb-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-foreground/80">
            {t.faq.kicker}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            {t.faq.title}
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-8">
          {t.faq.items.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger className="text-start text-base font-semibold">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border/70 bg-secondary/40 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="" className="size-8 rounded-lg" />
            <span className="font-display font-bold">{t.brand}</span>
          </div>
          <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
            {t.footer.disclaimer}
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
          </p>
          <button
            onClick={() => navigate("/admin")}
            className="text-[11px] text-muted-foreground/60 transition-colors hover:text-muted-foreground"
          >
            Admin
          </button>
        </div>
      </footer>

      {/* ===== SAMPLE PREVIEW DIALOG ===== */}
      <Dialog open={sample !== null} onOpenChange={(o) => !o && setSample(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          {sample && (
            <>
              <DialogHeader>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <CourseIcon icon={sample.icon} className="size-7" />
                </div>
                <DialogTitle className="mt-2 font-display text-xl">
                  {sample.title[lang]}
                </DialogTitle>
                <DialogDescription>{sample.tagline[lang]}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold">{t.dash.ingredients}</h4>
                  <ul className="mt-2 space-y-1.5">
                    {sample.ingredients.slice(0, 4).map((ing) => (
                      <li
                        key={ing.fr}
                        className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-1.5"
                      >
                        <span>{ing[lang]}</span>
                        <span className="font-mono text-xs font-semibold text-primary">
                          {ing.display
                            ? ing.display[lang]
                            : ing.percent === null
                              ? "qsp 100%"
                              : `${ing.percent} %`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-dashed border-border p-3 text-center text-xs text-muted-foreground">
                  <Lock className="mx-auto mb-1 size-4 text-accent" />
                  {t.sample.locked}
                </div>
                <Button className="w-full" onClick={start}>
                  {t.cta.getStarted}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
