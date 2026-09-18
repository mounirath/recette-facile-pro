import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "convex/react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  Plus,
  Ticket,
  Trash2,
  TrendingUp,
  UserX,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useLang } from "@/i18n";
import logo from "@/assets/logo.svg";

type AdminStats = {
  totalUsers: number;
  guestUsers: number;
  registeredUsers: number;
  activeUsers: number;
  totalCompletions: number;
  completionsLast7: number;
  completionsLast30: number;
  weeks: { label: string; count: number }[];
};

type AccessCode = {
  _id: Id<"accessCodes">;
  code: string;
  label: string | null;
  active: boolean;
  used: boolean;
  usedAt: number | null;
  createdAt: number;
};

const SESSION_KEY = "admin_pw_session";

export default function Admin() {
  const navigate = useNavigate();
  const { t, lang, setLang } = useLang();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [sessionPw, setSessionPw] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY);
    } catch {
      return null;
    }
  });

  // useQuery needs a static arg: run the query only when we have a password,
  // using skip logic via conditional query call pattern.
  const [submittedPw, setSubmittedPw] = useState<string | null>(sessionPw);

  const result = useQuery(
    api.admin.adminStats,
    submittedPw ? { password: submittedPw } : "skip",
  );

  const [loginError, setLoginError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (result === undefined) return; // still loading
    if (checking) setChecking(false);
    if (submittedPw) {
      if (result?.ok) {
        setSessionPw(submittedPw);
        try {
          sessionStorage.setItem(SESSION_KEY, submittedPw);
        } catch {
          /* ignore */
        }
      } else {
        // wrong password or not configured
        setLoginError(t.admin.errPassword);
        setSubmittedPw(null);
        try {
          sessionStorage.removeItem(SESSION_KEY);
        } catch {
          /* ignore */
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoginError(null);
    setChecking(true);
    setSubmittedPw(password);
  };

  const logout = () => {
    setSessionPw(null);
    setSubmittedPw(null);
    setPassword("");
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
  };

  const stats = result?.ok ? result.stats : undefined;
  const notConfigured = result?.ok === false && result.reason === "not_configured";

  // ------------------------- Access codes (admin) -------------------------
  const codesResult = useQuery(
    api.accessCodes.listCodes,
    sessionPw ? { password: sessionPw } : "skip",
  );
  const generateCodes = useMutation(api.accessCodes.generateCodes);
  const setCodeActive = useMutation(api.accessCodes.setCodeActive);
  const deleteCode = useMutation(api.accessCodes.deleteCode);

  const [genCount, setGenCount] = useState(1);
  const [genLabel, setGenLabel] = useState("");
  const [genBusy, setGenBusy] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<string[]>([]);
  const [copiedAll, setCopiedAll] = useState(false);
  const [codesError, setCodesError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!sessionPw) return;
    setGenBusy(true);
    setCodesError(null);
    try {
      const created = await generateCodes({
        password: sessionPw,
        count: genCount,
        label: genLabel.trim() || undefined,
      });
      setLastGenerated(created);
      setGenLabel("");
    } catch (e) {
      setCodesError(e instanceof Error ? e.message : t.admin.errPassword);
    } finally {
      setGenBusy(false);
    }
  };

  const copyAll = async () => {
    if (lastGenerated.length === 0) return;
    try {
      await navigator.clipboard.writeText(lastGenerated.join("\n"));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const toggleCode = async (c: AccessCode) => {
    if (!sessionPw) return;
    try {
      await setCodeActive({ password: sessionPw, codeId: c._id, active: !c.active });
    } catch (e) {
      setCodesError(e instanceof Error ? e.message : t.admin.errPassword);
    }
  };

  const removeCode = async (c: AccessCode) => {
    if (!sessionPw) return;
    try {
      await deleteCode({ password: sessionPw, codeId: c._id });
    } catch (e) {
      setCodesError(e instanceof Error ? e.message : t.admin.errPassword);
    }
  };

  const maxWeek = useMemo(
    () => Math.max(1, ...(stats?.weeks.map((w) => w.count) ?? [1])),
    [stats],
  );

  // ----------------------------- Login screen -----------------------------
  if (!sessionPw) {
    return (
      <main className="flex min-h-screen flex-col bg-bubbles">
        <div className="flex items-center justify-between px-4 pt-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <img src={logo} alt="" className="size-9 rounded-lg" />
            <span className="font-display text-sm font-bold">{t.brand}</span>
          </button>
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
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-sm"
          >
            <Card className="border shadow-md">
              <CardHeader className="text-center">
                <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="size-5 text-primary" />
                </div>
                <CardTitle className="font-display text-2xl">
                  {t.admin.title}
                </CardTitle>
                <CardDescription>{t.admin.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-3">
                  <div className="relative">
                    <KeyRound className="absolute start-3 top-3 size-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.admin.passwordPlaceholder}
                      className="ps-9 pe-9"
                      disabled={checking}
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute end-3 top-3 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {notConfigured && (
                    <p className="text-center text-xs text-amber-600">
                      {t.admin.errNotConfigured}
                    </p>
                  )}
                  {loginError && !notConfigured && (
                    <p className="text-center text-sm text-red-500">
                      {loginError}
                    </p>
                  )}

                  <Button type="submit" className="w-full" disabled={checking}>
                    {checking ? (
                      <>
                        <Loader2 className="me-2 size-4 animate-spin" />
                        {t.admin.verifying}
                      </>
                    ) : (
                      <>
                        <Lock className="me-2 size-4" />
                        {t.admin.enter}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              {t.admin.hint}
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  // ----------------------------- Dashboard -------------------------------
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="size-8 rounded-lg" />
            <div>
              <p className="font-display text-sm font-bold leading-tight">
                {t.admin.title}
              </p>
              <p className="text-xs text-muted-foreground">{t.brand}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="me-2 size-4 rtl:rotate-180" />
              {t.admin.backToDash}
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              {t.admin.logout}
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <Tabs defaultValue="stats">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h1 className="font-display text-2xl font-bold">{t.admin.overview}</h1>
            <TabsList>
              <TabsTrigger value="stats">
                <BarChart3 className="me-2 size-4" />
                {t.admin.tabStats}
              </TabsTrigger>
              <TabsTrigger value="codes">
                <Ticket className="me-2 size-4" />
                {t.admin.tabCodes}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ============================ STATS ============================ */}
          <TabsContent value="stats" className="mt-0 space-y-6">

        {/* KPI cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="size-4" />
                <span className="text-xs font-medium">{t.admin.totalUsers}</span>
              </div>
              <p className="mt-2 font-display text-3xl font-bold">
                {stats?.totalUsers ?? "—"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {stats ? (
                  <>
                    {stats.registeredUsers} {t.admin.registered} · {stats.guestUsers}{" "}
                    {t.admin.guests}
                  </>
                ) : (
                  ""
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="size-4" />
                <span className="text-xs font-medium">{t.admin.activeUsers}</span>
              </div>
              <p className="mt-2 font-display text-3xl font-bold">
                {stats?.activeUsers ?? "—"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{t.admin.activeDesc}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="size-4" />
                <span className="text-xs font-medium">
                  {t.admin.totalCompletions}
                </span>
              </div>
              <p className="mt-2 font-display text-3xl font-bold">
                {stats?.totalCompletions ?? "—"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.admin.last30}: {stats?.completionsLast30 ?? "—"} · {t.admin.last7}:{" "}
                {stats?.completionsLast7 ?? "—"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <UserX className="size-4" />
                <span className="text-xs font-medium">{t.admin.guestUsers}</span>
              </div>
              <p className="mt-2 font-display text-3xl font-bold">
                {stats?.guestUsers ?? "—"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {stats && stats.totalUsers > 0
                  ? `${Math.round((stats.guestUsers / stats.totalUsers) * 100)}%`
                  : "—"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly registrations trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t.admin.weeklyTitle}</CardTitle>
            <CardDescription>{t.admin.weeklyDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-40 items-end gap-3">
              {(stats?.weeks ?? []).map((w) => (
                <div
                  key={w.label}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <span className="text-xs font-semibold">{w.count}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(w.count / maxWeek) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="w-full rounded-t-md bg-primary/80"
                    style={{ minHeight: 4 }}
                  />
                  <span className="text-[10px] text-muted-foreground">{w.label}</span>
                </div>
              ))}
              {!stats && (
                <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
                  <Loader2 className="me-2 size-4 animate-spin" />
                  {t.admin.loading}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
          </TabsContent>

          {/* ============================ CODES ============================ */}
          <TabsContent value="codes" className="mt-0 space-y-6">
            {/* Generator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t.admin.genTitle}</CardTitle>
                <CardDescription>{t.admin.genDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-[130px_1fr_auto]">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">
                      {t.admin.genCount}
                    </label>
                    <Input
                      type="number"
                      min={1}
                      max={50}
                      value={genCount}
                      onChange={(e) => {
                        const v = parseInt(e.target.value, 10);
                        setGenCount(Number.isNaN(v) ? 1 : Math.min(50, Math.max(1, v)));
                      }}
                      disabled={genBusy}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">
                      {t.admin.genLabel}
                    </label>
                    <Input
                      value={genLabel}
                      onChange={(e) => setGenLabel(e.target.value)}
                      placeholder={t.admin.genLabelPlaceholder}
                      disabled={genBusy}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleGenerate} disabled={genBusy} className="w-full sm:w-auto">
                      {genBusy ? (
                        <Loader2 className="me-2 size-4 animate-spin" />
                      ) : (
                        <Plus className="me-2 size-4" />
                      )}
                      {t.admin.genButton}
                    </Button>
                  </div>
                </div>

                {codesError && (
                  <p className="text-sm text-red-500">{codesError}</p>
                )}

                {lastGenerated.length > 0 && (
                  <div className="rounded-lg border bg-muted/40 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-semibold text-muted-foreground">
                        {t.admin.genCreated.replace("{n}", String(lastGenerated.length))}
                      </p>
                      <Button variant="ghost" size="sm" onClick={copyAll}>
                        <Copy className="me-2 size-4" />
                        {copiedAll ? t.admin.copied : t.admin.copyAll}
                      </Button>
                    </div>
                    <Textarea
                      readOnly
                      value={lastGenerated.join("\n")}
                      rows={Math.min(6, lastGenerated.length)}
                      className="font-mono text-sm"
                      onFocus={(e) => e.currentTarget.select()}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Codes list */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t.admin.listTitle}</CardTitle>
                <CardDescription>
                  {codesResult?.ok
                    ? t.admin.listCount.replace("{n}", String(codesResult.codes.length))
                    : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {codesResult === undefined && (
                  <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
                    <Loader2 className="me-2 size-4 animate-spin" />
                    {t.admin.loading}
                  </div>
                )}
                {codesResult?.ok && codesResult.codes.length === 0 && (
                  <p className="py-6 text-center text-sm text-muted-foreground">
                    {t.admin.listEmpty}
                  </p>
                )}
                {codesResult?.ok && codesResult.codes.length > 0 && (
                  <div className="divide-y">
                    {codesResult.codes.map((c) => (
                      <div
                        key={c._id}
                        className="flex flex-wrap items-center justify-between gap-3 py-3"
                      >
                        <div className="min-w-0">
                          <p className="font-mono text-base font-bold tracking-widest">
                            {c.code}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {c.label
                              ? `${c.label} · `
                              : ""}
                            {c.used
                              ? `${t.admin.codeUsed} ${
                                  c.usedAt
                                    ? new Date(c.usedAt).toLocaleDateString(
                                        lang === "ar" ? "ar" : "fr-FR",
                                      )
                                    : ""
                                }`
                              : t.admin.codeUnused}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              c.used ? "secondary" : c.active ? "default" : "outline"
                            }
                          >
                            {c.used
                              ? t.admin.badgeUsed
                              : c.active
                                ? t.admin.badgeActive
                                : t.admin.badgeDisabled}
                          </Badge>
                          {!c.used && (
                            <Switch
                              checked={c.active}
                              onCheckedChange={() => toggleCode(c)}
                              aria-label={t.admin.badgeActive}
                            />
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeCode(c)}
                            className="text-destructive hover:text-destructive"
                            aria-label={t.admin.deleteCode}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
