import { Box } from "lucide-react";
import { ButtonBlock } from "./button-block";
import { ActionIconButtonBlock } from "./action-icon-button-block";
import { InputBlock } from "./input-block";
import { TextareaBlock } from "./textarea-block";
import { CheckboxBlock } from "./checkbox-block";
import { SwitchBlock } from "./switch-block";
import { FilterChipBlock } from "./filter-chip-block";
import { TagBlock } from "./tag-block";
import { OptionCardBlock } from "./option-card-block";
import { FileUploadBlock } from "./file-upload-block";
import { GoogleSignInBlock } from "./google-sign-in-block";
import { BeneficiaryCardBlock } from "./beneficiary-card-block";
import { ProgressBarBlock } from "./progress-bar-block";

export interface ActionsFormSectionProps {
  onCopy: (text: string, id?: string) => void;
  copiedToken: string | null;
}

/**
 * ActionsFormSection: Orchestrator untuk seluruh komponen aksi & formulir BBJ (13 blok).
 * Setiap komponen kini dimodularisasi menjadi blok independen berbasis DocBlock.
 */
export function ActionsFormSection({
  onCopy,
  copiedToken,
}: ActionsFormSectionProps) {
  return (
    <section className="space-y-12 animate-in fade-in duration-200">
      {/* Section Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-4 gap-2">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center font-bold shadow-2xs">
            <Box className="size-5" />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-brand font-semibold block">
              Figma Category · Actions &amp; Form
            </span>
            <h2 className="font-heading-h2 text-[#142023]">
              Actions &amp; Form Components
            </h2>
          </div>
        </div>
        <span className="text-xs text-neutral-500 font-mono bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200 self-start sm:self-auto">
          Node 16:273 - 138:11319 · 13 Komponen
        </span>
      </div>

      <div className="space-y-8">
        <ButtonBlock onCopy={onCopy} copiedToken={copiedToken} />
        <ActionIconButtonBlock onCopy={onCopy} copiedToken={copiedToken} />
        <InputBlock onCopy={onCopy} copiedToken={copiedToken} />
        <TextareaBlock onCopy={onCopy} copiedToken={copiedToken} />
        <CheckboxBlock onCopy={onCopy} copiedToken={copiedToken} />
        <SwitchBlock onCopy={onCopy} copiedToken={copiedToken} />
        <FilterChipBlock onCopy={onCopy} copiedToken={copiedToken} />
        <TagBlock onCopy={onCopy} copiedToken={copiedToken} />
        <OptionCardBlock onCopy={onCopy} copiedToken={copiedToken} />
        <FileUploadBlock onCopy={onCopy} copiedToken={copiedToken} />
        <GoogleSignInBlock onCopy={onCopy} copiedToken={copiedToken} />
        <BeneficiaryCardBlock onCopy={onCopy} copiedToken={copiedToken} />
        <ProgressBarBlock onCopy={onCopy} copiedToken={copiedToken} />
      </div>
    </section>
  );
}
