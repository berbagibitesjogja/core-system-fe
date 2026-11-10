import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import {
  LoginBrandHeader,
  LoginForm,
  LoginShowcase,
  LoginFooter,
} from "#/components/pages/login";
import type { LoginAlertConfig } from "#/components/pages/login";

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/admin/login")({
  validateSearch: (search) => loginSearchSchema.parse(search),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  // State form dan proses otentikasi
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [alert, setAlert] = React.useState<LoginAlertConfig | null>(null);

  // Handler submit login email & kata sandi
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setAlert({
        tone: "warning",
        title: "Data belum lengkap",
        description: "Silakan masukkan email dan kata sandi Anda.",
      });
      return;
    }

    setIsSubmitting(true);
    setAlert(null);

    // Simulasi transisi masuk ke dashboard sebelum API backend dihubungkan
    setTimeout(() => {
      setIsSubmitting(false);
      navigate({
        to: search.redirect || "/admin/dashboard",
      });
    }, 600);
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
      {/* Formulir Login Admin (Meniru luasan WP4: fixed-width responsive pada desktop) */}
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
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
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

      {/* Showcase Branding (Meniru luasan WP4: flex-1 mengisi penuh area kanan) */}
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
