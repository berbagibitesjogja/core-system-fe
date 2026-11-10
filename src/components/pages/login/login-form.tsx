import * as React from "react";
import { Eye, EyeOff, Info } from "lucide-react";
import { Alert, Button, Input } from "#/components/ui";
import { GoogleSignInButton } from "#/components/shared";
import type { LoginAlertConfig } from "./login-data";

export interface LoginFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  isLoading: boolean;
  isGoogleLoading?: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleLogin: () => void;
  alert?: LoginAlertConfig | null;
  onCloseAlert?: () => void;
}

export function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  isGoogleLoading = false,
  onSubmit,
  onGoogleLogin,
  alert,
  onCloseAlert,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const isAnyLoading = isLoading || isGoogleLoading;

  return (
    <div className="flex flex-col gap-5 sm:gap-6 items-start w-full max-w-[440px] mx-auto lg:mx-0">
      {/* Headline */}
      <div className="flex flex-col gap-0 w-full animate-headline-enter">
        <h2 className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[44px] xl:text-[48px] leading-[38px] sm:leading-[46px] lg:leading-[52px] xl:leading-[56px] tracking-[-0.48px] text-neutral-900">
          Selamat datang
          <br />
          <span className="text-bondi-700">kembali!</span>
        </h2>
      </div>

      {/* Deskripsi */}
      <p className="font-body text-sm sm:text-base leading-5 sm:leading-6 text-neutral-600 animate-lead-enter">
        Masuk pakai email atau akun Google yang sudah terdaftar sebagai pengurus
        untuk melanjutkan aksi berbagimu bersama komunitas BBJ.
      </p>

      {/* Alert Status (Kondisional: 401, 403, Sesi Habis, dll) */}
      {alert && (
        <Alert
          tone={alert.tone}
          title={alert.title}
          description={alert.description}
          onClose={onCloseAlert}
          className="w-full animate-fade-in-up"
        />
      )}

      {/* Formulir Utama */}
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 items-end w-full animate-form-enter"
        noValidate
      >
        {/* Field Email menggunakan Input UI Component */}
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isAnyLoading}
          placeholder="nama@email.com"
          required
          autoComplete="email"
          className="w-full max-w-none"
        />

        {/* Field Kata Sandi menggunakan Input UI Component dengan Trailing Icon */}
        <Input
          label="Kata sandi"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isAnyLoading}
          placeholder="Masukkan kata sandi"
          required
          autoComplete="current-password"
          className="w-full max-w-none"
          trailingIcon={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={isAnyLoading}
              aria-label={
                showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
              }
              className="size-5 flex items-center justify-center text-neutral-500 hover:text-neutral-900 focus-visible:outline-none cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          }
        />

        {/* Link Lupa Kata Sandi */}
        <div>
          <button
            type="button"
            onClick={() => {
              window.alert(
                "Untuk reset kata sandi, silakan hubungi Administrator BBJ di pengurus@berbagibitesjogja.com",
              );
            }}
            className="font-sans text-sm font-normal text-bondi-600 hover:text-bondi-700 hover:underline cursor-pointer transition-colors"
          >
            Lupa kata sandi?
          </button>
        </div>

        {/* Tombol Submit "Masuk" menggunakan Button UI Component */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          loadingText="Sedang masuk…"
          disabled={isAnyLoading}
          className="w-full h-11"
        >
          Masuk
        </Button>
      </form>

      {/* Tombol Masuk dengan Google menggunakan GoogleSignInButton Component */}
      <div className="w-full animate-google-enter">
        <GoogleSignInButton
          onClick={onGoogleLogin}
          disabled={isAnyLoading}
          isLoading={isGoogleLoading}
          className="w-full max-w-none"
        />
      </div>

      {/* Helper Pendaftaran */}
      <div className="flex items-center gap-2 pt-1 text-neutral-600 animate-helper-enter">
        <Info className="size-4 shrink-0 text-neutral-600" />
        <p className="font-body text-xs leading-4 text-neutral-600">
          Belum terdaftar? Hubungi Administrator BBJ.
        </p>
      </div>
    </div>
  );
}
