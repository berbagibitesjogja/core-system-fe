import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "#/lib/utils";

export type InputState =
  "default" | "hover" | "focus" | "filled" | "error" | "disabled";

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label?: string;
  helperText?: string;
  error?: string;
  forcedState?: InputState;
  size?: "sm" | "md";
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showLabel?: boolean;
  showHelper?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      forcedState,
      size = "md",
      leadingIcon,
      trailingIcon,
      leftIcon,
      rightIcon,
      showLabel = true,
      showHelper = true,
      disabled,
      value,
      defaultValue,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? React.useId();
    const [isFocused, setIsFocused] = React.useState(false);
    const effectiveLeadingIcon = leadingIcon ?? leftIcon;
    const effectiveTrailingIcon = trailingIcon ?? rightIcon;

    // Determine state
    let effectiveState: InputState = "default";
    if (forcedState) {
      effectiveState = forcedState;
    } else if (disabled) {
      effectiveState = "disabled";
    } else if (error) {
      effectiveState = "error";
    } else if (isFocused) {
      effectiveState = "focus";
    } else if (value || defaultValue) {
      effectiveState = "filled";
    }

    const isActuallyDisabled = effectiveState === "disabled";
    const isError = effectiveState === "error";

    // Field border and ring styling
    let fieldStyles = "";
    switch (effectiveState) {
      case "error":
        fieldStyles =
          "border-[1.5px] border-[var(--color-border-danger,#ef4444)] shadow-[0px_0px_0px_3px_#fecaca] bg-white";
        break;
      case "focus":
        fieldStyles =
          "border-[1.5px] border-[var(--color-border-focus,#009ca6)] shadow-[0px_0px_0px_3px_#b0e0e3] bg-white";
        break;
      case "hover":
        fieldStyles =
          "border border-[var(--color-border-ink,#142023)] bg-white";
        break;
      case "disabled":
        fieldStyles =
          "border border-[var(--color-border-default,#e2e7e8)] bg-[var(--color-bg-disabled,#eef1f2)] text-[var(--color-text-disabled,#9aa5a8)] cursor-not-allowed";
        break;
      case "filled":
      case "default":
      default:
        fieldStyles =
          "border border-[var(--color-border-input,#8a9499)] bg-white hover:border-[var(--color-border-ink,#142023)] focus-within:border-[1.5px] focus-within:border-[var(--color-border-focus,#009ca6)] focus-within:shadow-[0px_0px_0px_3px_#b0e0e3]";
        break;
    }

    const currentHelperText = isError && error ? error : helperText;

    return (
      <div
        className={cn(
          "flex flex-col gap-[6px] items-start w-full max-w-[320px]",
          className,
        )}
      >
        {showLabel && label && (
          <label
            htmlFor={inputId}
            className={cn(
              "font-['Inter'] font-semibold text-[14px] leading-[20px] select-none whitespace-nowrap",
              isActuallyDisabled
                ? "text-[var(--color-text-disabled,#9aa5a8)]"
                : "text-[var(--color-text-primary,#142023)]",
            )}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "flex items-center gap-[8px] w-full rounded-[var(--radius-md,12px)] transition-all duration-150 relative overflow-hidden",
            size === "sm" ? "h-[38px] px-[10px]" : "h-[44px] px-[12px]",
            fieldStyles,
          )}
        >
          {effectiveLeadingIcon && (
            <div
              className={cn(
                "shrink-0 size-[20px] flex items-center justify-center [&_svg]:size-[18px]",
                isActuallyDisabled
                  ? "text-[var(--color-text-disabled,#9aa5a8)]"
                  : "text-[var(--color-text-tertiary,#6b777a)]",
              )}
            >
              {effectiveLeadingIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            disabled={isActuallyDisabled}
            value={value}
            defaultValue={defaultValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "flex-1 bg-transparent font-['Inter'] font-normal text-[14px] leading-[20px] outline-none min-w-0",
              isActuallyDisabled
                ? "text-[var(--color-text-disabled,#9aa5a8)] cursor-not-allowed"
                : effectiveState === "default"
                  ? "text-[var(--color-text-tertiary,#6b777a)] placeholder:text-[var(--color-text-tertiary,#6b777a)]"
                  : "text-[var(--color-text-primary,#142023)]",
            )}
            {...props}
          />

          {effectiveTrailingIcon && (
            <div
              className={cn(
                "shrink-0 size-[20px] flex items-center justify-center [&_svg]:size-[18px]",
                isActuallyDisabled
                  ? "text-[var(--color-text-disabled,#9aa5a8)]"
                  : "text-[var(--color-text-tertiary,#6b777a)]",
              )}
            >
              {effectiveTrailingIcon}
            </div>
          )}
        </div>

        {showHelper && currentHelperText && (
          <div className="flex items-center gap-[4px] min-h-[16px] w-full">
            {isError && (
              <AlertTriangle className="size-[14px] text-[var(--color-text-danger,#b91c1c)] shrink-0" />
            )}
            <p
              className={cn(
                "font-['Inter'] font-normal text-[12px] leading-[16px] whitespace-nowrap",
                isError
                  ? "text-[var(--color-text-danger,#b91c1c)]"
                  : "text-[var(--color-text-secondary,#4d585b)]",
              )}
            >
              {currentHelperText}
            </p>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
