import * as React from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  LoginBrandHeader,
  LoginForm,
  LoginShowcase,
  LoginFooter,
  LOGIN_STATE_ALERTS,
} from "#/components/pages/login";
import type { LoginAlertConfig } from "#/components/pages/login";
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
  beforeLoad: async () => {
    // Arahkan ke dashboard jika sudah login sebagai staf aktif
    const session = await getAuthSession();
    if (session.isAuthenticated && session.isStaff) {
      throw redirect({
        to: "/admin/dashboard",
      });
    }
  },
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const loginFn = useServerFn(loginWithPassword);
  const logoutFn = useServerFn(logout);

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
      setEmailError("Email wajib diisi");
      hasValidationError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailError("Format email tidak valid");
      hasValidationError = true;
    }

    if (!password) {
      setPasswordError("Kata sandi wajib diisi");
      hasValidationError = true;
    }

    if (hasValidationError) {
      setAlert({
        tone: "warning",
        title: "Data belum lengkap",
        description:
          "Silakan masukkan email dan kata ssandi Anda dengan benar.",
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
        setAlert(
          LOGIN_STATE_ALERTS["role-tidak-berwenang"] ?? {
            tone: "warning",
            title: "Belum punya akses admin",
            description:
              "Akunmu terdaftar, tapi tidak memiliki hak akses sebagai admin. Minta pengurus inti untuk mengubah peranmu.",
          },
        );
        return;
      }

      // Navigasi ke rute tujuan setelah login berhasil
      navigate({
        to: search.redirect || "/admin/dashboard",
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
          setAlert(
            LOGIN_STATE_ALERTS["salah-kata-sandi"] ?? {
              tone: "danger",
              title: "Email atau kata sandi salah",
              description: "Periksa lagi penulisannya, lalu coba masuk.",
            },
          );
          return;
        }

        if (err.status === 403 || err.code === "FORBIDDEN") {
          setAlert({
            tone: "danger",
            title: "Akun dinonaktifkan",
            description:
              "Akun telah dinonaktifkan. Silakan hubungi Administrator BBJ.",
          });
          return;
        }

        if (err.code === "EMAIL_NOT_VERIFIED") {
          setAlert({
            tone: "warning",
            title: "Email belum diverifikasi",
            description:
              "Silakan verifikasi email Anda sebelum masuk ke sistem.",
          });
          return;
        }

        if (err.status === 429 || err.code === "RATE_LIMIT_EXCEEDED") {
          setAlert({
            tone: "warning",
            title: "Terlalu banyak percobaan",
            description:
              "Terlalu banyak permintaan. Mohon tunggu beberapa saat sebelum mencoba lagi.",
          });
          return;
        }

        setAlert({
          tone: "danger",
          title: "Gagal masuk",
          description:
            err.message ||
            "Terjadi kendala pada sistem. Silakan coba beberapa saat lagi.",
        });
        return;
      }

      setAlert({
        tone: "danger",
        title: "Gagal masuk",
        description:
          err instanceof Error
            ? err.message
            : "Terjadi kendala pada sistem. Silakan coba beberapa saat lagi.",
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
      navigate({
        to: search.redirect || "/admin/dashboard",
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
