import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "#/lib/utils";

export type ButtonVariant =
  "primary" | "accent" | "secondary" | "ghost" | "danger" | "outline";
export type ButtonSize = "md" | "sm";
export type ButtonState = "default" | "hover" | "loading" | "disabled";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  forcedState?: ButtonState;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingText = "Menyimpan...",
      forcedState,
      leftIcon,
      rightIcon,
      children = "Simpan Donasi",
      disabled,
      ...props
    },
    ref,
  ) => {
    const effectiveState: ButtonState =
      forcedState ??
      (disabled ? "disabled" : isLoading ? "loading" : "default");

    const isActuallyDisabled = effectiveState === "disabled";
    const isActuallyLoading = effectiveState === "loading";

    // Base sizing and typography
    const sizeClasses =
      size === "sm"
        ? "h-[36px] px-[16px] py-[8px] gap-[6px] text-[14px] leading-[20px]"
        : "h-[44px] px-[20px] py-[12px] gap-[8px] text-[14px] leading-[20px]";

    // Variant styling mapped to Figma tokens
    let stateStyle = "";
    if (effectiveState === "disabled") {
      if (variant === "secondary") {
        stateStyle =
          "bg-[var(--color-bg-disabled,#eef1f2)] border border-[var(--color-border-default,#e2e7e8)] text-[var(--color-text-disabled,#9aa5a8)] shadow-none";
      } else if (variant === "ghost") {
        stateStyle =
          "bg-transparent text-[var(--color-text-disabled,#9aa5a8)] shadow-none";
      } else {
        stateStyle =
          "bg-[var(--color-bg-disabled,#eef1f2)] text-[var(--color-text-disabled,#9aa5a8)] shadow-none border-transparent";
      }
    } else if (effectiveState === "hover") {
      switch (variant) {
        case "primary":
          stateStyle =
            "bg-[var(--color-bg-brand-hover,#005e64)] text-white shadow-none";
          break;
        case "accent":
          stateStyle =
            "bg-[var(--color-bg-accent-hover,#ffce2e)] text-[var(--color-text-on-accent,#142023)] border-[1.5px] border-[var(--color-border-ink,#142023)] shadow-none";
          break;
        case "secondary":
          stateStyle =
            "bg-[var(--color-bg-subtle,#eef1f2)] border border-[var(--color-border-strong,#cdd4d6)] text-[var(--color-text-primary,#142023)]";
          break;
        case "ghost":
          stateStyle =
            "bg-[var(--color-bg-brand-subtle,#e6f5f6)] text-[var(--color-text-brand,#007d85)]";
          break;
        case "danger":
          stateStyle = "bg-[var(--color-bg-danger-hover,#b91c1c)] text-white";
          break;
        case "outline":
          stateStyle =
            "bg-[var(--color-bg-subtle,#eef1f2)] border border-[var(--color-border-ink,#142023)] text-[var(--color-text-primary,#142023)]";
          break;
      }
    } else {
      // Default & Loading
      switch (variant) {
        case "primary":
          stateStyle =
            "bg-[var(--color-bg-brand,#007d85)] text-white drop-shadow-[0px_2px_0px_#142023] hover:bg-[var(--color-bg-brand-hover,#005e64)] hover:drop-shadow-none";
          break;
        case "accent":
          stateStyle =
            "bg-[var(--color-bg-accent,#ffda57)] border-[1.5px] border-[var(--color-border-ink,#142023)] text-[var(--color-text-on-accent,#142023)] drop-shadow-[0px_2px_0px_#142023] hover:bg-[var(--color-bg-accent-hover,#ffce2e)] hover:drop-shadow-none";
          break;
        case "secondary":
          stateStyle =
            "bg-[var(--color-bg-surface,white)] border border-[var(--color-border-strong,#cdd4d6)] text-[var(--color-text-primary,#142023)] hover:bg-[var(--color-bg-subtle,#eef1f2)]";
          break;
        case "ghost":
          stateStyle =
            "bg-transparent text-[var(--color-text-brand,#007d85)] hover:bg-[var(--color-bg-brand-subtle,#e6f5f6)]";
          break;
        case "danger":
          stateStyle =
            "bg-[var(--color-bg-danger,#dc2626)] text-white hover:bg-[var(--color-bg-danger-hover,#b91c1c)]";
          break;
        case "outline":
          stateStyle =
            "bg-[var(--color-bg-surface,white)] border border-[var(--color-border-strong,#cdd4d6)] text-[var(--color-text-primary,#142023)] hover:bg-[var(--color-bg-subtle,#eef1f2)]";
          break;
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={isActuallyDisabled || isActuallyLoading}
        className={cn(
          "inline-flex flex-row items-center justify-center font-['Inter'] font-semibold select-none rounded-[var(--radius-full,999px)] transition-all duration-150 outline-none shrink-0 whitespace-nowrap [&>svg]:shrink-0 [&_svg]:shrink-0",
          !isActuallyDisabled &&
            !isActuallyLoading &&
            "cursor-pointer active:translate-x-[1px] active:translate-y-[1px]",
          isActuallyDisabled && "cursor-not-allowed pointer-events-none",
          sizeClasses,
          stateStyle,
          className,
        )}
        {...props}
      >
        {isActuallyLoading ? (
          <>
            <Loader2
              className={cn(
                "animate-spin shrink-0",
                size === "sm" ? "size-[16px]" : "size-[20px]",
              )}
            />
            <span>{loadingText}</span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span
                className={cn(
                  "shrink-0 inline-flex items-center justify-center",
                  size === "sm" ? "size-[16px]" : "size-[20px]",
                )}
              >
                {leftIcon}
              </span>
            )}
            {children}
            {rightIcon && (
              <span
                className={cn(
                  "shrink-0 inline-flex items-center justify-center",
                  size === "sm" ? "size-[16px]" : "size-[20px]",
                )}
              >
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
