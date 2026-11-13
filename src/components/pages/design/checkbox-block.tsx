import * as React from "react";
import { Box } from "lucide-react";
import { Checkbox } from "#/components/ui";
import { DocBlock } from "./doc-block";

export interface CheckboxBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * CheckboxBlock: Dokumentasi komponen checkbox sistem BBJ (Node 18:275).
 * Menampilkan matriks 3 status checked (false, true, indeterminate) dalam 2 state (default, disabled),
 * serta demo interaktif dengan tri-state cycling.
 */
export function CheckboxBlock({ onCopy, copiedToken }: CheckboxBlockProps) {
  const [checkbox1, setCheckbox1] = React.useState(true);
  const [checkbox2, setCheckbox2] = React.useState<"indeterminate" | boolean>(
    "indeterminate",
  );

  return (
    <DocBlock
      id="doc-checkbox"
      nodeId="Node 18:275"
      title="5. Checkbox"
      subtitle="src/components/ui/checkbox.tsx"
      icon={<Box className="size-4" />}
      copyCode='<Checkbox checked={true} label="Basi / Tidak Layak" />'
      copyTokenKey="checkbox-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=18-275&t=SzCwTYJWBfVK4FdY-4"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-neutral-600 max-w-[900px]">
        Pilihan on/off di form: Basi / Tidak Layak, Blokir Hero, multi-select
        beneficiary di dropdown. Area klik mencakup label.
      </p>

      {/* 6-variant Matrix (2 columns x 3 rows) matching Node 18:274 */}
      <div className="overflow-x-auto pb-2 -mx-1 px-1">
        <table className="min-w-[600px] w-full border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 text-left">
              <th className="py-3 px-4 font-['Inter'] font-semibold text-xs text-neutral-500 uppercase tracking-wider w-[180px]">
                Checked State
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
                Checked = False
              </td>
              <td className="py-4 px-4">
                <Checkbox
                  checked={false}
                  label="Basi / Tidak Layak"
                  forcedState="default"
                />
              </td>
              <td className="py-4 px-4">
                <Checkbox
                  checked={false}
                  label="Basi / Tidak Layak"
                  forcedState="disabled"
                />
              </td>
            </tr>

            <tr className="hover:bg-neutral-50/50">
              <td className="py-4 px-4 font-['Inter'] font-semibold text-sm text-neutral-900">
                Checked = True
              </td>
              <td className="py-4 px-4">
                <Checkbox
                  checked={true}
                  label="Basi / Tidak Layak"
                  forcedState="default"
                />
              </td>
              <td className="py-4 px-4">
                <Checkbox
                  checked={true}
                  label="Basi / Tidak Layak"
                  forcedState="disabled"
                />
              </td>
            </tr>

            <tr className="hover:bg-neutral-50/50">
              <td className="py-4 px-4 font-['Inter'] font-semibold text-sm text-neutral-900">
                Checked = Indeterminate
              </td>
              <td className="py-4 px-4">
                <Checkbox
                  checked="indeterminate"
                  label="Basi / Tidak Layak"
                  forcedState="default"
                />
              </td>
              <td className="py-4 px-4">
                <Checkbox
                  checked="indeterminate"
                  label="Basi / Tidak Layak"
                  forcedState="disabled"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Interactive Tester */}
      <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-4 sm:gap-6">
        <span className="font-['Inter'] font-semibold text-xs text-neutral-500 w-full sm:w-auto">
          Live Interactive Checkbox:
        </span>
        <Checkbox
          checked={checkbox1}
          onChange={(c) => setCheckbox1(c === true)}
          label="Makanan butuh box berpendingin (4°C)"
        />
        <Checkbox
          checked={checkbox2}
          onChange={() => {
            setCheckbox2((prev) => {
              if (prev === "indeterminate") return true;
              if (prev === true) return false;
              return "indeterminate";
            });
          }}
          label="Pilih Semua Mitra (Klik untuk siklus Tri-State)"
        />
      </div>
    </DocBlock>
  );
}
