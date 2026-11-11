import * as React from "react";
import { cn } from "#/lib/utils";
import { FieldHelper } from "./field-helper";

export type TextareaState = "default" | "focus" | "error" | "disabled";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  forcedState?: TextareaState;
  showLabel?: boolean;
  showHelper?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      forcedState,
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
    const textareaId = id ?? React.useId();
    const [isFocused, setIsFocused] = React.useState(false);

    let effectiveState: TextareaState = "default";
    if (forcedState) {
      effectiveState = forcedState;
    } else if (disabled) {
      effectiveState = "disabled";
    } else if (error) {
      effectiveState = "error";
    } else if (isFocused) {
      effectiveState = "focus";
    }

    const isActuallyDisabled = effectiveState === "disabled";
    const isError = effectiveState === "error";

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
      case "disabled":
        fieldStyles =
          "border border-[var(--color-border-default,#e2e7e8)] bg-[var(--color-bg-disabled,#eef1f2)] text-[var(--color-text-disabled,#9aa5a8)] cursor-not-allowed";
        break;
      case "default":
      default:
        fieldStyles =
          "border border-[var(--color-border-input,#8a9499)] bg-white hover:border-[var(--color-border-ink,#142023)] focus:border-[1.5px] focus:border-[var(--color-border-focus,#009ca6)] focus:shadow-[0px_0px_0px_3px_#b0e0e3]";
        break;
    }

    return (
      <div
        className={cn(
          "flex flex-col gap-[6px] items-start w-full max-w-[320px]",
          className,
        )}
      >
        {showLabel && label && (
          <label
            htmlFor={textareaId}
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

        <textarea
          id={textareaId}
          ref={ref}
          disabled={isActuallyDisabled}
          value={value}
          defaultValue={defaultValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "h-[112px] w-full p-[12px] rounded-[var(--radius-md,12px)] transition-all duration-150 outline-none resize-none font-['Inter'] font-normal text-[14px] leading-[20px]",
            fieldStyles,
            isActuallyDisabled
              ? "text-[var(--color-text-disabled,#9aa5a8)] cursor-not-allowed"
              : effectiveState === "default"
                ? "text-[var(--color-text-tertiary,#6b777a)] placeholder:text-[var(--color-text-tertiary,#6b777a)]"
                : "text-[var(--color-text-primary,#142023)]",
          )}
          {...props}
        />

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

Textarea.displayName = "Textarea";
