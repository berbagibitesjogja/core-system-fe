import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "#/lib/utils";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

export type GoogleSignInState = "default" | "hover" | "loading" | "disabled";

export interface GoogleSignInButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  forcedState?: GoogleSignInState;
  label?: string;
}

export function GoogleSignInButton({
  isLoading = false,
  forcedState,
  disabled,
  label = "Masuk dengan Google",
  className,
  ...props
}: GoogleSignInButtonProps) {
  const currentState: GoogleSignInState =
    forcedState ?? (disabled ? "disabled" : isLoading ? "loading" : "default");

  const isDisabled = currentState === "disabled";
  const isHover = currentState === "hover";
  const isCurrentlyLoading = currentState === "loading";

  return (
    <button
      type="button"
      disabled={isDisabled || isCurrentlyLoading}
      className={cn(
        "relative flex h-[44px] w-full max-w-[400px] items-center justify-center gap-2 px-5 rounded-full font-['Inter'] text-[14px] font-semibold leading-[20px] transition-all duration-150 select-none outline-none cursor-pointer whitespace-nowrap",
        isDisabled
          ? "bg-[#eef1f2] border border-[#e2e7e8] text-[#9aa5a8] cursor-not-allowed pointer-events-none opacity-80"
          : isHover
            ? "bg-[#eef1f2] border border-[#cdd4d6] text-[#142023]"
            : isCurrentlyLoading
              ? "bg-white border border-[#cdd4d6] text-[#142023] cursor-wait"
              : "bg-white border border-[#cdd4d6] text-[#142023] hover:bg-[#eef1f2]",
        "focus-visible:ring-3 focus-visible:ring-[#b0e0e3]",
        className,
      )}
      {...props}
    >
      <div className="size-[20px] shrink-0 relative flex items-center justify-center">
        {isCurrentlyLoading ? (
          <Loader2 className="size-[18px] animate-spin text-[#142023]" />
        ) : (
          <GoogleIcon
            className={cn(
              "size-[20px]",
              isDisabled && "grayscale opacity-50 contrast-50",
            )}
          />
        )}
      </div>
      <span>{isCurrentlyLoading ? "Memverifikasi akun..." : label}</span>
    </button>
  );
}
