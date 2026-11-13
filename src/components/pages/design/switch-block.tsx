import * as React from "react";
import { Box } from "lucide-react";
import { Toggle } from "#/components/ui";
import { DocBlock } from "./doc-block";

export interface SwitchBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * SwitchBlock: Dokumentasi toggle/switch sistem BBJ (Node 18:295).
 * Menampilkan matriks 2 status (on=false, on=true) dalam 2 state (default, disabled)
 * serta live tester pengaturan langsung.
 */
export function SwitchBlock({ onCopy, copiedToken }: SwitchBlockProps) {
  const [switchState, setSwitchState] = React.useState(true);
  const [interactiveToggle, setInteractiveToggle] = React.useState(true);

  return (
    <DocBlock
      id="doc-toggle"
      nodeId="Node 18:295"
      title="6. Toggle (Switch)"
      subtitle="src/components/ui/switch.tsx"
      icon={<Box className="size-4" />}
      copyCode='<Toggle on={switchState} onChange={setSwitchState} label="Umumkan" />'
      copyTokenKey="toggle-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=18-295&t=SzCwTYJWBfVK4FdY-4"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-neutral-600 max-w-[900px]">
        Switch untuk pengaturan yang langsung berlaku: Donasi (CSR) dan Umumkan
        (broadcast ke relawan) di form donasi. Track 48×28px pill, Thumb 22×22px
        white circle with 2px stroke and pop-shadow.
      </p>

      {/* 4-variant Matrix (2 columns x 2 rows) matching Node 18:294 */}
      <div className="overflow-x-auto pb-2 -mx-1 px-1">
        <table className="min-w-[600px] w-full border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 text-left">
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider w-[180px]">
                On State
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                State = Default
              </th>
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider">
                State = Disabled
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            <tr className="hover:bg-neutral-50/50">
              <td className="py-4 px-4 font-['Inter'] font-semibold text-sm text-neutral-900">
                On = False
              </td>
              <td className="py-4 px-4">
                <Toggle on={false} label="Umumkan" forcedState="default" />
              </td>
              <td className="py-4 px-4">
                <Toggle on={false} label="Umumkan" forcedState="disabled" />
              </td>
            </tr>

            <tr className="hover:bg-neutral-50/50">
              <td className="py-4 px-4 font-['Inter'] font-semibold text-sm text-neutral-900">
                On = True
              </td>
              <td className="py-4 px-4">
                <Toggle on={true} label="Umumkan" forcedState="default" />
              </td>
              <td className="py-4 px-4">
                <Toggle on={true} label="Umumkan" forcedState="disabled" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Interactive Tester */}
      <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-4 sm:gap-6">
        <span className="font-['Inter'] font-semibold text-xs text-neutral-500 w-full sm:w-auto">
          Live Interactive Toggle:
        </span>
        <Toggle
          on={interactiveToggle}
          onChange={setInteractiveToggle}
          label={`Broadcast ke Relawan (${interactiveToggle ? "Aktif" : "Non-aktif"})`}
        />
        <Toggle
          checked={switchState}
          onChange={setSwitchState}
          label={`Notifikasi WhatsApp (${switchState ? "Aktif" : "Non-aktif"})`}
        />
      </div>
    </DocBlock>
  );
}
