import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import logo from "@/assets/logo.svg";
import { Loader2, UserX } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
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
            <Button
              type="button"
              variant="outline"
              className="w-full"
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

            {error && (
              <p className="mt-2 text-center text-sm text-red-500">{error}</p>
            )}
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
