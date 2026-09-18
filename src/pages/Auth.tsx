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
import { KeyRound, Loader2, UserX } from "lucide-react";
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

function Auth({ redirectAfterAuth }: AuthProps = {}) {
  const { isLoading: authLoading, isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const { t, lang, setLang } = useLang();
  const [searchParams] = useSearchParams();
  const redirect = resolveRedirectAfterAuth(
    searchParams.get("returnTo"),
    redirectAfterAuth,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [code, setCode] = useState("");
  const [codeBusy, setCodeBusy] = useState(false);
  const redeemCode = useMutation(api.accessCodes.redeemCode);
  const claimCode = useMutation(api.accessCodes.claimCode);

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
            {/* Access code login */}
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
              <Button type="submit" className="w-full" disabled={codeBusy || code.trim().length !== 8}>
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

            {error && (
              <p className="mt-2 text-center text-sm text-red-500">{error}</p>
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
