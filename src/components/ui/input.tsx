import * as React from "react";
import { cn } from "#/lib/utils";
import { FieldHelper } from "./field-helper";

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
          "border-[1.5px] border-red-500 shadow-focus-ring-danger bg-white";
        break;
      case "focus":
        fieldStyles =
          "border-[1.5px] border-bondi-500 shadow-focus-ring bg-white";
        break;
      case "hover":
        fieldStyles = "border border-neutral-900 bg-white";
        break;
      case "disabled":
        fieldStyles =
          "border border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed";
        break;
      case "filled":
      case "default":
      default:
        fieldStyles =
          "border border-border-input bg-white hover:border-neutral-900 focus-within:border-[1.5px] focus-within:border-bondi-500 focus-within:shadow-focus-ring";
        break;
    }

    return (
      <div
        className={cn("flex flex-col gap-[6px] items-start w-full", className)}
      >
        {showLabel && label && (
          <label
            htmlFor={inputId}
            className={cn(
              "font-['Inter'] font-semibold text-[14px] leading-[20px] select-none whitespace-nowrap",
              isActuallyDisabled ? "text-neutral-400" : "text-neutral-900",
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
                isActuallyDisabled ? "text-neutral-400" : "text-neutral-500",
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
                ? "text-neutral-400 cursor-not-allowed"
                : effectiveState === "default"
                  ? "text-neutral-500 placeholder:text-neutral-500"
                  : "text-neutral-900",
            )}
            {...props}
          />

          {effectiveTrailingIcon && (
            <div
              className={cn(
                "shrink-0 size-[20px] flex items-center justify-center [&_svg]:size-[18px]",
                isActuallyDisabled ? "text-neutral-400" : "text-neutral-500",
              )}
            >
              {effectiveTrailingIcon}
            </div>
          )}
        </div>

        {showHelper && (
          <FieldHelper
            error={isError ? error : undefined}
            helperText={helperText}
          />
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
