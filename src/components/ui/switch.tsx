import * as React from "react";
import { cn } from "#/lib/utils";

export type ToggleState = "default" | "disabled";

export interface SwitchProps {
  checked?: boolean;
  on?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  forcedState?: ToggleState;
  label?: React.ReactNode;
  showLabel?: boolean;
  className?: string;
  id?: string;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      on,
      onChange,
      disabled,
      forcedState,
      label = "Umumkan",
      showLabel = true,
      className,
      id,
    },
    ref,
  ) => {
    const switchId = id ?? React.useId();
    const effectiveChecked = on ?? checked ?? false;
    const effectiveState: ToggleState =
      forcedState ?? (disabled ? "disabled" : "default");
    const isActuallyDisabled = effectiveState === "disabled";

    let trackStyle = "";
    if (isActuallyDisabled) {
      trackStyle = effectiveChecked
        ? "bg-[var(--color-bondi-200,#b0e0e3)] cursor-not-allowed"
        : "bg-[var(--color-bg-muted,#e2e7e8)] cursor-not-allowed";
    } else {
      trackStyle = effectiveChecked
        ? "bg-[var(--color-bg-brand,#007d85)] cursor-pointer"
        : "bg-[var(--color-border-input,#8a9499)] hover:bg-[var(--color-neutral-600,#4d585b)] cursor-pointer";
    }

    return (
      <div
        className={cn(
          "inline-flex items-center gap-[12px] select-none",
          className,
        )}
      >
        <button
          id={switchId}
          type="button"
          role="switch"
          aria-checked={effectiveChecked}
          ref={ref}
          disabled={isActuallyDisabled}
          onClick={() => !isActuallyDisabled && onChange?.(!effectiveChecked)}
          className={cn(
            "relative inline-flex h-[24px] w-[44px] shrink-0 items-center rounded-full transition-colors duration-200 outline-none p-[2px]",
            trackStyle,
          )}
        >
          <span
            className={cn(
              "pointer-events-none block size-[20px] rounded-full bg-white shadow-[0px_2px_4px_rgba(20,32,35,0.15)] ring-0 transition-transform duration-200 ease-in-out",
              effectiveChecked ? "translate-x-[20px]" : "translate-x-0",
            )}
          />
        </button>

        {showLabel && label && (
          <label
            htmlFor={switchId}
            className={cn(
              "font-['Inter'] font-semibold text-[14px] leading-[20px] whitespace-nowrap",
              isActuallyDisabled
                ? "text-[var(--color-text-disabled,#9aa5a8)] cursor-not-allowed"
                : "text-[var(--color-text-primary,#142023)] cursor-pointer",
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Switch.displayName = "Switch";
export const Toggle = Switch;
