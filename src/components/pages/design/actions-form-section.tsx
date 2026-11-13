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

const ACTION_FORM_BLOCKS: Array<{
  id: string;
  Component: React.ComponentType<ActionsFormSectionProps>;
}> = [
  { id: "button", Component: ButtonBlock },
  { id: "action-icon-button", Component: ActionIconButtonBlock },
  { id: "input", Component: InputBlock },
  { id: "textarea", Component: TextareaBlock },
  { id: "checkbox", Component: CheckboxBlock },
  { id: "switch", Component: SwitchBlock },
  { id: "filter-chip", Component: FilterChipBlock },
  { id: "tag", Component: TagBlock },
  { id: "option-card", Component: OptionCardBlock },
  { id: "file-upload", Component: FileUploadBlock },
  { id: "google-sign-in", Component: GoogleSignInBlock },
  { id: "beneficiary-card", Component: BeneficiaryCardBlock },
  { id: "progress-bar", Component: ProgressBarBlock },
];

/**
 * ActionsFormSection: Orchestrator untuk seluruh komponen aksi & formulir BBJ (13 blok).
 * Dimodularisasi dan dirender dinamis berbasis data-driven blok.
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
            <h2 className="font-heading-h2 text-neutral-900">
              Actions &amp; Form Components
            </h2>
          </div>
        </div>
        <span className="text-xs text-neutral-500 font-mono bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200 self-start sm:self-auto">
          Node 16:273 - 138:11319 · 13 Komponen
        </span>
      </div>

      <div className="space-y-8">
        {ACTION_FORM_BLOCKS.map(({ id, Component }) => (
          <Component key={id} onCopy={onCopy} copiedToken={copiedToken} />
        ))}
      </div>
    </section>
  );
}
