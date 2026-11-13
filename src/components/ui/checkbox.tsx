import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "#/lib/utils";

export type CheckboxChecked = boolean | "indeterminate";
export type CheckboxState = "default" | "disabled";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "checked"
> {
  checked?: CheckboxChecked;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  showLabel?: boolean;
  forcedState?: CheckboxState;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      checked = false,
      onChange,
      label = "Basi / Tidak Layak",
      showLabel = true,
      forcedState,
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? React.useId();
    const effectiveState: CheckboxState =
      forcedState ?? (disabled ? "disabled" : "default");
    const isActuallyDisabled = effectiveState === "disabled";

    const isIndeterminate = checked === "indeterminate";
    const isChecked = checked === true;

    // Box style mapped to Figma tokens
    let boxStyles = "";
    if (isActuallyDisabled) {
      if (isChecked || isIndeterminate) {
        boxStyles = "bg-neutral-200 text-white border-transparent";
      } else {
        boxStyles = "bg-neutral-100 border-[1.5px] border-neutral-200";
      }
    } else {
      if (isChecked || isIndeterminate) {
        boxStyles = "bg-brand text-white border-transparent";
      } else {
        boxStyles =
          "bg-white border-[1.5px] border-border-input hover:border-neutral-900";
      }
    }

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "inline-flex items-center gap-[8px] select-none",
          isActuallyDisabled ? "cursor-not-allowed" : "cursor-pointer",
          className,
        )}
      >
        <span className="relative flex items-center justify-center shrink-0">
          <input
            id={inputId}
            type="checkbox"
            ref={ref}
            checked={isChecked}
            disabled={isActuallyDisabled}
            onChange={(e) => onChange?.(e.target.checked)}
            className="sr-only"
            {...props}
          />
          <span
            className={cn(
              "size-[20px] rounded-[var(--radius-xs,4px)] transition-all flex items-center justify-center shrink-0",
              boxStyles,
            )}
          >
            {isIndeterminate ? (
              <Minus className="size-[14px] stroke-[2.5]" />
            ) : isChecked ? (
              <Check className="size-[14px] stroke-[2.5]" />
            ) : null}
          </span>
        </span>

        {showLabel && label && (
          <span
            className={cn(
              "font-['Inter'] font-normal text-[14px] leading-[20px] whitespace-nowrap",
              isActuallyDisabled ? "text-neutral-400" : "text-neutral-900",
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
