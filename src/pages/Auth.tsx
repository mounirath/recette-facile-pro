import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/hooks/use-auth";
import logo from "@/assets/logo.svg";
import { ArrowRight, Loader2, Mail, UserX } from "lucide-react";
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
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(redirect);
    }
  }, [authLoading, isAuthenticated, navigate, redirect]);

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      setStep({ email: formData.get("email") as string });
      setIsLoading(false);
    } catch (error) {
      console.error("Email sign-in error:", error);
      setError(
        error instanceof Error
          ? error.message
          : t.auth.errSend,
      );
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      navigate(redirect);
    } catch (error) {
      console.error("OTP verification error:", error);
      setError(t.auth.errCode);
      setIsLoading(false);
      setOtp("");
    }
  };

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
          {step === "signIn" ? (
            <>
              <CardHeader className="text-center">
                <CardTitle className="font-display text-2xl">
                  {t.auth.signInTitle}
                </CardTitle>
                <CardDescription>{t.auth.signInDesc}</CardDescription>
              </CardHeader>
              <form onSubmit={handleEmailSubmit}>
                <CardContent>
                  <div className="relative flex items-center gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute start-3 top-3 size-4 text-muted-foreground" />
                      <Input
                        name="email"
                        placeholder="name@example.com"
                        type="email"
                        className="ps-9"
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="outline"
                      size="icon"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <ArrowRight className="size-4 rtl:rotate-180" />
                      )}
                    </Button>
                  </div>
                  {error && (
                    <p className="mt-2 text-sm text-red-500">{error}</p>
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
                      <UserX className="me-2 size-4" />
                      {t.auth.guest}
                    </Button>
                  </div>
                </CardContent>
              </form>
            </>
          ) : (
            <>
              <CardHeader className="mt-4 text-center">
                <CardTitle>{t.auth.checkTitle}</CardTitle>
                <CardDescription>
                  {t.auth.checkDesc} {step.email}
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleOtpSubmit}>
                <CardContent className="pb-4">
                  <input type="hidden" name="email" value={step.email} />
                  <input type="hidden" name="code" value={otp} />

                  <div className="flex justify-center">
                    <InputOTP
                      value={otp}
                      onChange={setOtp}
                      maxLength={6}
                      disabled={isLoading}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          otp.length === 6 &&
                          !isLoading
                        ) {
                          const form = (
                            e.target as HTMLElement
                          ).closest("form");
                          if (form) {
                            form.requestSubmit();
                          }
                        }
                      }}
                    >
                      <InputOTPGroup>
                        {Array.from({ length: 6 }).map((_, index) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {error && (
                    <p className="mt-2 text-center text-sm text-red-500">
                      {error}
                    </p>
                  )}
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    {t.auth.noCode}{" "}
                    <Button
                      variant="link"
                      className="h-auto p-0"
                      onClick={() => setStep("signIn")}
                    >
                      {t.auth.tryAgain}
                    </Button>
                  </p>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="me-2 size-4 animate-spin" />
                        {t.auth.verifying}
                      </>
                    ) : (
                      <>
                        {t.auth.verify}
                        <ArrowRight className="ms-2 size-4 rtl:rotate-180" />
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep("signIn")}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {t.auth.differentEmail}
                  </Button>
                </CardFooter>
              </form>
            </>
          )}

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
