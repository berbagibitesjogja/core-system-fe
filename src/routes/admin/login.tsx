import * as React from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  LoginBrandHeader,
  LoginForm,
  LoginShowcase,
  LoginFooter,
} from "#/components/pages/login";
import type { LoginAlertConfig } from "#/components/pages/login";
import { toast } from "#/components/ui/toast";
import { DEFAULT_ERROR_MESSAGE, idAuth } from "#/locales";
import {
  getAuthSession,
  loginWithPassword,
  logout,
} from "#/services/authService";
import { getFieldError, isApiError } from "#/services/errorService";

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/admin/login")({
  validateSearch: (search) => loginSearchSchema.parse(search),
  beforeLoad: async ({ search }) => {
    // Ambil data sesi pengguna untuk verifikasi status login
    const session = await getAuthSession();

    // Jika pengguna sudah memiliki sesi staf aktif, langsung alihkan ke rute tujuan
    if (session.isAuthenticated && session.isStaff) {
      const targetUrl =
        search.redirect &&
        search.redirect !== "/admin/login" &&
        !search.redirect.includes("/admin/login")
          ? search.redirect
          : "/admin/dashboard";

      throw redirect({
        to: targetUrl,
      });
    }

    return {
      session,
    };
  },
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const loginFn = useServerFn(loginWithPassword);
  const logoutFn = useServerFn(logout);

  // Bersihkan sisa cache lokal sesi jika berada di halaman login
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("bbj_user");
      localStorage.removeItem("user");
    }
  }, []);

  // State form dan proses otentikasi
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState<string | undefined>();
  const [passwordError, setPasswordError] = React.useState<
    string | undefined
  >();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [alert, setAlert] = React.useState<LoginAlertConfig | null>(null);

  // Reset error kolom saat pengguna mengedit input
  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (emailError) setEmailError(undefined);
    if (alert) setAlert(null);
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (passwordError) setPasswordError(undefined);
    if (alert) setAlert(null);
  };

  // Handler submit login email & kata sandi
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    let hasValidationError = false;

    if (!trimmedEmail) {
      setEmailError(idAuth.login.fields.emailRequired);
      hasValidationError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailError(idAuth.login.fields.emailInvalid);
      hasValidationError = true;
    }

    if (!password) {
      setPasswordError(idAuth.login.fields.passwordRequired);
      hasValidationError = true;
    }

    if (hasValidationError) {
      toast.warning(idAuth.login.alerts.incompleteDataDescription);
      setAlert({
        tone: "warning",
        title: idAuth.login.alerts.incompleteDataTitle,
        description: idAuth.login.alerts.incompleteDataDescription,
      });
      return;
    }

    setIsSubmitting(true);
    setAlert(null);

    try {
      const response = await loginFn({
        data: {
          email: trimmedEmail,
          password,
        },
      });

      // Validasi hak akses staf untuk portal admin
      if (!response.data.user.is_staff) {
        // Bersihkan sesi karena akun bukan staf
        await logoutFn();
        toast.error(idAuth.login.alerts.unauthorizedRoleDescription);
        setAlert({
          tone: "warning",
          title: idAuth.login.alerts.unauthorizedRoleTitle,
          description: idAuth.login.alerts.unauthorizedRoleDescription,
        });
        return;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("bbj_user", JSON.stringify(response.data.user));
      }

      toast.success(idAuth.login.toasts.loginSuccess(response.data.user.name));

      // Navigasi ke rute tujuan setelah login berhasil
      const targetUrl =
        search.redirect &&
        search.redirect !== "/admin/login" &&
        !search.redirect.includes("/admin/login")
          ? search.redirect
          : "/admin/dashboard";

      navigate({
        to: targetUrl,
      });
    } catch (err: unknown) {
      if (isApiError(err)) {
        const backendEmailError = getFieldError(err, "email");
        const backendPasswordError = getFieldError(err, "password");

        if (backendEmailError) setEmailError(backendEmailError);
        if (backendPasswordError) setPasswordError(backendPasswordError);

        if (
          err.status === 401 ||
          err.code === "UNAUTHORIZED" ||
          err.code === "INVALID_CREDENTIALS"
        ) {
          toast.error(idAuth.login.alerts.invalidCredentialsDescription);
          setAlert({
            tone: "danger",
            title: idAuth.login.alerts.invalidCredentialsTitle,
            description: idAuth.login.alerts.invalidCredentialsDescription,
          });
          return;
        }

        if (err.status === 403 || err.code === "FORBIDDEN") {
          toast.error(idAuth.login.alerts.accountDeactivatedDescription);
          setAlert({
            tone: "danger",
            title: idAuth.login.alerts.accountDeactivatedTitle,
            description: idAuth.login.alerts.accountDeactivatedDescription,
          });
          return;
        }

        if (err.code === "EMAIL_NOT_VERIFIED") {
          toast.warning(idAuth.login.alerts.emailUnverifiedDescription);
          setAlert({
            tone: "warning",
            title: idAuth.login.alerts.emailUnverifiedTitle,
            description: idAuth.login.alerts.emailUnverifiedDescription,
          });
          return;
        }

        if (err.status === 429 || err.code === "RATE_LIMIT_EXCEEDED") {
          toast.error(idAuth.login.alerts.rateLimitedDescription);
          setAlert({
            tone: "warning",
            title: idAuth.login.alerts.rateLimitedTitle,
            description: idAuth.login.alerts.rateLimitedDescription,
          });
          return;
        }

        const fallbackErrorMsg = err.message || DEFAULT_ERROR_MESSAGE;
        toast.error(fallbackErrorMsg);
        setAlert({
          tone: "danger",
          title: "Gagal masuk",
          description: fallbackErrorMsg,
        });
        return;
      }

      const nonApiErrorMsg =
        err instanceof Error ? err.message : DEFAULT_ERROR_MESSAGE;
      toast.error(nonApiErrorMsg);
      setAlert({
        tone: "danger",
        title: "Gagal masuk",
        description: nonApiErrorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler masuk dengan Google SSO
  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setAlert(null);

    // Simulasi otentikasi Google sebelum endpoint OAuth backend aktif
    setTimeout(() => {
      setIsGoogleLoading(false);
      const targetUrl =
        search.redirect &&
        search.redirect !== "/admin/login" &&
        !search.redirect.includes("/admin/login")
          ? search.redirect
          : "/admin/dashboard";

      navigate({
        to: targetUrl,
      });
    }, 600);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-white font-sans antialiased overflow-x-hidden">
      {/* Formulir Login Admin */}
      <section
        aria-label="Formulir Masuk Admin"
        className="w-full lg:w-[480px] xl:w-[540px] 2xl:w-[580px] shrink-0 min-h-screen bg-white flex flex-col justify-between px-6 sm:px-10 lg:px-12 py-8 sm:py-10 relative z-10"
      >
        <div className="w-full max-w-[440px] mx-auto flex-1 flex flex-col justify-between min-h-[580px]">
          {/* Header Brand */}
          <LoginBrandHeader />

          {/* Form Konten & Interaksi */}
          <div className="my-auto py-6 sm:py-8 w-full">
            <LoginForm
              email={email}
              setEmail={handleEmailChange}
              password={password}
              setPassword={handlePasswordChange}
              emailError={emailError}
              passwordError={passwordError}
              isLoading={isSubmitting}
              isGoogleLoading={isGoogleLoading}
              onSubmit={handleLoginSubmit}
              onGoogleLogin={handleGoogleLogin}
              alert={alert}
              onCloseAlert={() => setAlert(null)}
            />
          </div>

          {/* Footer Hak Cipta */}
          <LoginFooter />
        </div>
      </section>

      {/* Showcase Branding */}
      <section
        aria-label="Showcase Dampak Komunitas"
        className="hidden lg:flex flex-1 min-h-screen bg-white p-4 sm:p-5 lg:p-6 overflow-hidden items-center justify-center"
      >
        <div className="w-full h-full max-h-[960px]">
          <LoginShowcase />
        </div>
      </section>
    </div>
  );
}
