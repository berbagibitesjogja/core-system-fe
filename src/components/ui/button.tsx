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
          "bg-neutral-100 border border-neutral-200 text-neutral-400 shadow-none";
      } else if (variant === "ghost") {
        stateStyle = "bg-transparent text-neutral-400 shadow-none";
      } else {
        stateStyle =
          "bg-neutral-100 text-neutral-400 shadow-none border-transparent";
      }
    } else if (effectiveState === "hover") {
      switch (variant) {
        case "primary":
          stateStyle = "bg-brand-hover text-white shadow-none";
          break;
        case "accent":
          stateStyle =
            "bg-accent-hover text-neutral-900 border-[1.5px] border-neutral-900 shadow-none";
          break;
        case "secondary":
          stateStyle =
            "bg-neutral-100 border border-neutral-300 text-neutral-900";
          break;
        case "ghost":
          stateStyle = "bg-brand-subtle text-brand";
          break;
        case "danger":
          stateStyle = "bg-red-700 text-white";
          break;
        case "outline":
          stateStyle =
            "bg-neutral-100 border border-neutral-900 text-neutral-900";
          break;
      }
    } else {
      // Default & Loading
      switch (variant) {
        case "primary":
          stateStyle =
            "bg-brand text-white shadow-pop-sm hover:bg-brand-hover hover:shadow-none";
          break;
        case "accent":
          stateStyle =
            "bg-accent border-[1.5px] border-neutral-900 text-neutral-900 shadow-pop-sm hover:bg-accent-hover hover:shadow-none";
          break;
        case "secondary":
          stateStyle =
            "bg-surface border border-neutral-300 text-neutral-900 hover:bg-neutral-100";
          break;
        case "ghost":
          stateStyle = "bg-transparent text-brand hover:bg-brand-subtle";
          break;
        case "danger":
          stateStyle = "bg-red-600 text-white hover:bg-red-700";
          break;
        case "outline":
          stateStyle =
            "bg-surface border border-neutral-300 text-neutral-900 hover:bg-neutral-100";
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
