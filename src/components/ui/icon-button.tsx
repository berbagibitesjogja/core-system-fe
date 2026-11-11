import * as React from "react";
import { Tooltip } from "./tooltip";
import { cn } from "#/lib/utils";

export type IconButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type IconButtonSize = "md" | "sm";
export type IconButtonState = "default" | "hover" | "disabled";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  forcedState?: IconButtonState;
  tooltip?: React.ReactNode;
  tooltipPlacement?: "top" | "bottom";
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "secondary",
      size = "md",
      forcedState,
      disabled,
      tooltip,
      tooltipPlacement = "top",
      children,
      ...props
    },
    ref,
  ) => {
    const effectiveState: IconButtonState =
      forcedState ?? (disabled ? "disabled" : "default");
    const isActuallyDisabled = effectiveState === "disabled";

    const sizeClasses = size === "sm" ? "size-[36px]" : "size-[44px]";
    const iconSizeClasses =
      size === "sm" ? "[&_svg]:size-[18px]" : "[&_svg]:size-[20px]";

    let stateStyle = "";
    if (effectiveState === "disabled") {
      switch (variant) {
        case "primary":
        case "secondary":
          stateStyle =
            "bg-[var(--color-bg-disabled,#eef1f2)] text-[var(--color-text-disabled,#9aa5a8)] border-transparent pointer-events-none";
          break;
        case "ghost":
        case "danger":
          stateStyle =
            "bg-transparent text-[var(--color-text-disabled,#9aa5a8)] border-transparent pointer-events-none";
          break;
      }
    } else if (effectiveState === "hover") {
      switch (variant) {
        case "primary":
          stateStyle = "bg-[var(--color-bg-brand-hover,#005e64)] text-white";
          break;
        case "secondary":
          stateStyle =
            "bg-[var(--color-bg-subtle,#eef1f2)] border border-[var(--color-border-strong,#cdd4d6)] text-[var(--color-text-primary,#142023)]";
          break;
        case "ghost":
          stateStyle =
            "bg-[var(--color-bg-subtle,#eef1f2)] text-[var(--color-text-primary,#142023)]";
          break;
        case "danger":
          stateStyle =
            "bg-[var(--color-bg-danger-subtle,#fef2f2)] text-[var(--color-text-danger,#dc2626)]";
          break;
      }
    } else {
      // Default
      switch (variant) {
        case "primary":
          stateStyle =
            "bg-[var(--color-bg-brand,#007d85)] text-white hover:bg-[var(--color-bg-brand-hover,#005e64)]";
          break;
        case "secondary":
          stateStyle =
            "bg-[var(--color-bg-surface,white)] border border-[var(--color-border-strong,#cdd4d6)] text-[var(--color-text-primary,#142023)] hover:bg-[var(--color-bg-subtle,#eef1f2)]";
          break;
        case "ghost":
          stateStyle =
            "bg-transparent text-[var(--color-text-primary,#142023)] hover:bg-[var(--color-bg-subtle,#eef1f2)]";
          break;
        case "danger":
          stateStyle =
            "bg-transparent text-[var(--color-text-danger,#dc2626)] hover:bg-[var(--color-bg-danger-subtle,#fef2f2)]";
          break;
      }
    }

    const button = (
      <button
        ref={ref}
        type="button"
        disabled={isActuallyDisabled}
        className={cn(
          "inline-flex items-center justify-center rounded-[var(--radius-full,999px)] transition-all duration-150 select-none shrink-0 outline-none",
          !isActuallyDisabled &&
            "cursor-pointer active:translate-x-[1px] active:translate-y-[1px]",
          isActuallyDisabled && "cursor-not-allowed pointer-events-none",
          sizeClasses,
          iconSizeClasses,
          stateStyle,
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );

    if (tooltip) {
      return (
        <Tooltip content={tooltip} placement={tooltipPlacement}>
          {button}
        </Tooltip>
      );
    }

    return button;
  },
);

IconButton.displayName = "IconButton";
