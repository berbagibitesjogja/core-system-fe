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
          "border-[1.5px] border-red-500 shadow-focus-ring-danger bg-white";
        break;
      case "focus":
        fieldStyles =
          "border-[1.5px] border-bondi-500 shadow-focus-ring bg-white";
        break;
      case "disabled":
        fieldStyles =
          "border border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed";
        break;
      case "default":
      default:
        fieldStyles =
          "border border-border-input bg-white hover:border-neutral-900 focus:border-[1.5px] focus:border-bondi-500 focus:shadow-focus-ring";
        break;
    }

    return (
      <div
        className={cn("flex flex-col gap-[6px] items-start w-full", className)}
      >
        {showLabel && label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "font-['Inter'] font-semibold text-[14px] leading-[20px] select-none whitespace-nowrap",
              isActuallyDisabled ? "text-neutral-400" : "text-neutral-900",
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
              ? "text-neutral-400 cursor-not-allowed"
              : effectiveState === "default"
                ? "text-neutral-500 placeholder:text-neutral-500"
                : "text-neutral-900",
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
