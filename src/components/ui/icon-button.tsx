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
            "bg-neutral-100 text-neutral-400 border-transparent pointer-events-none";
          break;
        case "ghost":
        case "danger":
          stateStyle =
            "bg-transparent text-neutral-400 border-transparent pointer-events-none";
          break;
      }
    } else if (effectiveState === "hover") {
      switch (variant) {
        case "primary":
          stateStyle = "bg-brand-hover text-white";
          break;
        case "secondary":
          stateStyle =
            "bg-neutral-100 border border-neutral-300 text-neutral-900";
          break;
        case "ghost":
          stateStyle = "bg-neutral-100 text-neutral-900";
          break;
        case "danger":
          stateStyle = "bg-red-50 text-red-600";
          break;
      }
    } else {
      // Default
      switch (variant) {
        case "primary":
          stateStyle = "bg-brand text-white hover:bg-brand-hover";
          break;
        case "secondary":
          stateStyle =
            "bg-surface border border-neutral-300 text-neutral-900 hover:bg-neutral-100";
          break;
        case "ghost":
          stateStyle = "bg-transparent text-neutral-900 hover:bg-neutral-100";
          break;
        case "danger":
          stateStyle = "bg-transparent text-red-600 hover:bg-red-50";
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
