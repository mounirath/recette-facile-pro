import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import logo from "@/assets/logo.svg";
import {
  KeyRound,
  Loader2,
  Mail,
  UserX,
  ShieldCheck,
} from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useLang } from "@/i18n";

interface AuthProps {
  redirectAfterAuth?: string;
}

function resolveRedirectAfterAuth(
  returnTo: string | null,
  fallback = "/dashboard",
) {
  if (returnTo?.startsWith("/") && !returnTo.startsWith("//")) {
    return returnTo;
  }
  return fallback;
}

type Mode = "code" | "email";

function Auth({ redirectAfterAuth }: AuthProps = {}) {
  const { isLoading: authLoading, isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const { t, lang, setLang } = useLang();
  const [searchParams] = useSearchParams();
  const redirect = resolveRedirectAfterAuth(
    searchParams.get("returnTo"),
    redirectAfterAuth,
  );

  const [mode, setMode] = useState<Mode>("code");
  const [error, setError] = useState<string | null>(null);

  // --- code login ---
  const [code, setCode] = useState("");
  const [codeBusy, setCodeBusy] = useState(false);
  const redeemCode = useMutation(api.accessCodes.redeemCode);
  const claimCode = useMutation(api.accessCodes.claimCode);

  // --- email login ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [emailMode, setEmailMode] = useState<"signUp" | "signIn">("signUp");
  const [emailBusy, setEmailBusy] = useState(false);
  const grantEmailAccess = useMutation(api.accessCodes.grantEmailAccess);

  // --- guest ---
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(redirect);
    }
  }, [authLoading, isAuthenticated, navigate, redirect]);

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn("anonymous");
      navigate(redirect);
    } catch (error) {
      console.error("Guest login error:", error);
      setError(
        error instanceof Error
          ? `${t.auth.errGuest}: ${error.message}`
          : t.auth.errGuest,
      );
      setIsLoading(false);
    }
  };

  const reasonToMessage = (reason: string) => {
    switch (reason) {
      case "not_found":
        return t.auth.errCodeNotFound;
      case "inactive":
      case "already_used":
        return t.auth.errCodeUsed;
      case "expired":
        return t.auth.errCodeExpired;
      case "user_already_used":
        return t.auth.errCodeUserAlready;
      default:
        return t.auth.errCodeInvalid;
    }
  };

  const handleCodeLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = code.trim().toUpperCase();
    if (normalized.length !== 8) return;
    setCodeBusy(true);
    setError(null);
    try {
      // Step 1: validate the code (works signed-out or signed-in).
      const first = await redeemCode({ code: normalized });
      if (!first.ok) {
        setError(reasonToMessage(first.reason));
        setCodeBusy(false);
        return;
      }

      // Step 2: ensure we have a session (sign in anonymously if needed).
      if (!isAuthenticated) {
        await signIn("anonymous");
      }

      // Step 3: claim the code for this user (idempotent).
      const claim = await claimCode({ code: normalized });
      if (!claim.ok) {
        setError(reasonToMessage(claim.reason));
        setCodeBusy(false);
        return;
      }

      navigate(redirect);
    } catch (error) {
      console.error("Code login error:", error);
      setError(
        error instanceof Error
          ? `${t.auth.errGuest}: ${error.message}`
          : t.auth.errGuest,
      );
      setCodeBusy(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    setError(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError(t.auth.errEmailInvalid);
      return;
    }
    if (password.length < 8) {
      setError(t.auth.errPasswordShort);
      return;
    }

    setEmailBusy(true);
    try {
      await signIn("password", {
        email: trimmedEmail,
        password,
        ...(name.trim() ? { name: name.trim() } : {}),
        flow: emailMode === "signUp" ? "signUp" : "signIn",
      });

      // After a fresh sign-up: NO trial. Access is granted only with a valid
      // invite code; otherwise the account stays locked (code required).
      if (emailMode === "signUp") {
        const grant = await grantEmailAccess({
          inviteCode: inviteCode.trim().toUpperCase() || undefined,
        });
        if (!grant.ok) {
          // Account created but invite invalid: sign out and explain.
          setError(t.auth.errInviteCode);
          setEmailBusy(false);
          return;
        }
      }

      navigate(redirect);
    } catch (err) {
      console.error("Email auth error:", err);
      const msg = err instanceof Error ? err.message : "";
      setError(
        msg.toLowerCase().includes("already") || msg.toLowerCase().includes("unique")
          ? t.auth.errEmailInUse
          : emailMode === "signIn"
            ? t.auth.errEmailPassword
            : t.auth.errEmailInUse,
      );
      setEmailBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-bubbles">
      {/* Language toggle */}
      <div className="flex items-center justify-between px-4 pt-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
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

      {/* Auth content */}
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <Card className="w-full max-w-sm border shadow-md">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-2xl">
              {t.auth.signInTitle}
            </CardTitle>
            <CardDescription>{t.auth.signInDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Mode tabs */}
            <div className="mb-4 flex overflow-hidden rounded-lg border border-border p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("code");
                  setError(null);
                }}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  mode === "code"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <KeyRound className="size-4" />
                {t.auth.tabCode}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("email");
                  setError(null);
                }}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  mode === "email"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Mail className="size-4" />
                {t.auth.tabEmail}
              </button>
            </div>

            {/* Access code login */}
            {mode === "code" && (
              <form onSubmit={handleCodeLogin} className="space-y-3">
                <div className="relative">
                  <KeyRound className="absolute start-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    value={code}
                    onChange={(e) =>
                      setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))
                    }
                    placeholder="AB12CD34"
                    maxLength={8}
                    inputMode="text"
                    autoCapitalize="characters"
                    autoComplete="off"
                    spellCheck={false}
                    className="ps-9 text-center font-mono text-lg font-bold tracking-widest"
                    disabled={codeBusy}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={codeBusy || code.trim().length !== 8}
                >
                  {codeBusy ? (
                    <>
                      <Loader2 className="me-2 size-4 animate-spin" />
                      {t.auth.codeChecking}
                    </>
                  ) : (
                    <>
                      <KeyRound className="me-2 size-4" />
                      {t.auth.codeLogin}
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Email login */}
            {mode === "email" && (
              <form onSubmit={handleEmailAuth} className="space-y-3">
                {emailMode === "signUp" && (
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.auth.namePlaceholder}
                    autoComplete="name"
                    disabled={emailBusy}
                  />
                )}
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.auth.emailPlaceholder}
                  autoComplete="email"
                  disabled={emailBusy}
                  required
                />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.auth.passwordPlaceholder}
                  autoComplete={
                    emailMode === "signUp" ? "new-password" : "current-password"
                  }
                  disabled={emailBusy}
                  required
                />
                {emailMode === "signUp" && (
                  <>
                    <Input
                      value={inviteCode}
                      onChange={(e) =>
                        setInviteCode(
                          e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""),
                        )
                      }
                      placeholder={t.auth.inviteCodePlaceholder}
                      maxLength={8}
                      className="text-center font-mono font-bold tracking-widest"
                      autoComplete="off"
                      spellCheck={false}
                      disabled={emailBusy}
                    />
                    <p className="text-center text-xs text-muted-foreground">
                      <ShieldCheck className="me-1 inline size-3.5" />
                      {t.auth.codeRequiredNote}
                    </p>
                  </>
                )}
                <Button type="submit" className="w-full" disabled={emailBusy}>
                  {emailBusy ? (
                    <>
                      <Loader2 className="me-2 size-4 animate-spin" />
                      {t.auth.emailChecking}
                    </>
                  ) : (
                    <>
                      <Mail className="me-2 size-4" />
                      {emailMode === "signUp" ? t.auth.emailSignUp : t.auth.emailSignIn}
                    </>
                  )}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  {emailMode === "signUp" ? (
                    <>
                      {t.auth.haveAccount}{" "}
                      <button
                        type="button"
                        className="font-semibold text-primary hover:underline"
                        onClick={() => {
                          setEmailMode("signIn");
                          setError(null);
                        }}
                      >
                        {t.auth.signInLink}
                      </button>
                    </>
                  ) : (
                    <>
                      {t.auth.needAccount}{" "}
                      <button
                        type="button"
                        className="font-semibold text-primary hover:underline"
                        onClick={() => {
                          setEmailMode("signUp");
                          setError(null);
                        }}
                      >
                        {t.auth.signUpLink}
                      </button>
                    </>
                  )}
                </p>
              </form>
            )}

            {error && (
              <p className="mt-3 text-center text-sm text-red-500">{error}</p>
            )}

            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    {t.auth.or}
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="mt-4 w-full"
                onClick={handleGuestLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="me-2 size-4 animate-spin" />
                ) : (
                  <UserX className="me-2 size-4" />
                )}
                {t.auth.guest}
              </Button>
            </div>
          </CardContent>

          <div className="rounded-b-lg border-t bg-muted px-6 py-4 text-center text-xs text-muted-foreground">
            {t.auth.secured} · freebuff.com
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function AuthPage(props: AuthProps) {
  return (
    <Suspense>
      <Auth {...props} />
    </Suspense>
  );
}
