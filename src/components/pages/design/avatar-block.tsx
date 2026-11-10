import * as React from "react";
import { RotateCcw } from "lucide-react";
import { Avatar, Button } from "#/components/ui";
import type { AvatarShape, AvatarSize } from "#/components/ui";
import { cn } from "#/lib/utils";
import { DocBlock } from "./doc-block";

export interface AvatarBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * AvatarBlock: Dokumentasi komponen Avatar sistem BBJ (Node 17:237).
 * Menampilkan matriks 12 kombinasi (3 size × 2 shape: circle & rounded × 2 type: initial & image)
 * serta live tester interaktif.
 */
export function AvatarBlock({ onCopy, copiedToken }: AvatarBlockProps) {
  const [avatarSize, setAvatarSize] = React.useState<AvatarSize>("md");
  const [avatarShape, setAvatarShape] = React.useState<AvatarShape>("circle");
  const [avatarType, setAvatarType] = React.useState<"initial" | "image">(
    "initial",
  );
  const [avatarName, setAvatarName] = React.useState("Utari Galih");

  return (
    <DocBlock
      id="doc-avatar"
      nodeId="Node 17:237"
      title="2. Avatar"
      subtitle="src/components/ui/avatar.tsx"
      copyCode='<Avatar name="Utari Galih" size="md" shape="circle" />'
      copyTokenKey="avatar-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=17-237"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
        Foto profil Google SSO (Type Image) atau inisial (Type Initial). Bentuk
        Circle untuk orang (admin, volunteer, hero). Bentuk Rounded untuk
        lembaga (beneficiary, sponsor/logo mitra). Small 32px, Medium 40px,
        Large 64px.
      </p>

      {/* 12-Variant Matrix Display */}
      <div className="space-y-3">
        <h4 className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500">
          Matriks Varian Figma (12 Kombinasi)
        </h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Small 32px */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
              <span className="font-label text-xs font-bold text-neutral-900">
                Small · 32×32px
              </span>
              <span className="text-[11px] text-neutral-500">
                Tabel &amp; Kartu Ringkas
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center text-xs">
              <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                <Avatar name="UG" size="sm" shape="circle" />
                <span className="text-[11px] text-neutral-600">
                  Circle Initial
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                <Avatar
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  size="sm"
                  shape="circle"
                />
                <span className="text-[11px] text-neutral-600">
                  Circle Image
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                <Avatar name="BB" size="sm" shape="rounded" />
                <span className="text-[11px] text-neutral-600">
                  Rounded Initial
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                <Avatar
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80"
                  size="sm"
                  shape="rounded"
                />
                <span className="text-[11px] text-neutral-600">
                  Rounded Image
                </span>
              </div>
            </div>
          </div>

          {/* Medium 40px */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
              <span className="font-label text-xs font-bold text-neutral-900">
                Medium · 40×40px (Default)
              </span>
              <span className="text-[11px] text-neutral-500">
                Header &amp; Profil Nav
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center text-xs">
              <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                <Avatar name="UG" size="md" shape="circle" />
                <span className="text-[11px] text-neutral-600">
                  Circle Initial
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                <Avatar
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  size="md"
                  shape="circle"
                />
                <span className="text-[11px] text-neutral-600">
                  Circle Image
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                <Avatar name="BB" size="md" shape="rounded" />
                <span className="text-[11px] text-neutral-600">
                  Rounded Initial
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                <Avatar
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80"
                  size="md"
                  shape="rounded"
                />
                <span className="text-[11px] text-neutral-600">
                  Rounded Image
                </span>
              </div>
            </div>
          </div>

          {/* Large 64px */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
              <span className="font-label text-xs font-bold text-neutral-900">
                Large · 64×64px
              </span>
              <span className="text-[11px] text-neutral-500">
                Halaman Profil Detail
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center text-xs">
              <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                <Avatar name="UG" size="lg" shape="circle" />
                <span className="text-[11px] text-neutral-600">
                  Circle Initial
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                <Avatar
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  size="lg"
                  shape="circle"
                />
                <span className="text-[11px] text-neutral-600">
                  Circle Image
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                <Avatar name="BB" size="lg" shape="rounded" />
                <span className="text-[11px] text-neutral-600">
                  Rounded Initial
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-3">
                <Avatar
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80"
                  size="lg"
                  shape="rounded"
                />
                <span className="text-[11px] text-neutral-600">
                  Rounded Image
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Interactive Avatar Tester */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
            Interactive Live Avatar Tester
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setAvatarSize("md");
              setAvatarShape("circle");
              setAvatarType("initial");
              setAvatarName("Utari Galih");
            }}
          >
            <RotateCcw className="size-3.5" />
            <span>Reset</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Ukuran (Size)
            </label>
            <div className="flex rounded-xl border border-neutral-300 bg-white p-1">
              {(["sm", "md", "lg"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setAvatarSize(s)}
                  className={cn(
                    "flex-1 rounded-lg py-1 text-xs font-semibold uppercase transition-colors",
                    avatarSize === s
                      ? "bg-brand text-white"
                      : "text-neutral-600 hover:text-neutral-900",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Bentuk (Shape)
            </label>
            <div className="flex rounded-xl border border-neutral-300 bg-white p-1">
              <button
                type="button"
                onClick={() => setAvatarShape("circle")}
                className={cn(
                  "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                  avatarShape === "circle"
                    ? "bg-brand text-white"
                    : "text-neutral-600 hover:text-neutral-900",
                )}
              >
                Circle
              </button>
              <button
                type="button"
                onClick={() => setAvatarShape("rounded")}
                className={cn(
                  "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                  avatarShape === "rounded"
                    ? "bg-brand text-white"
                    : "text-neutral-600 hover:text-neutral-900",
                )}
              >
                Rounded
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Tipe Tampilan
            </label>
            <div className="flex rounded-xl border border-neutral-300 bg-white p-1">
              <button
                type="button"
                onClick={() => setAvatarType("initial")}
                className={cn(
                  "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                  avatarType === "initial"
                    ? "bg-brand text-white"
                    : "text-neutral-600 hover:text-neutral-900",
                )}
              >
                Initial
              </button>
              <button
                type="button"
                onClick={() => setAvatarType("image")}
                className={cn(
                  "flex-1 rounded-lg py-1 text-xs font-semibold transition-colors",
                  avatarType === "image"
                    ? "bg-brand text-white"
                    : "text-neutral-600 hover:text-neutral-900",
                )}
              >
                Image
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Nama / Inisial
            </label>
            <input
              type="text"
              value={avatarName}
              onChange={(e) => setAvatarName(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:border-brand focus:outline-hidden"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <Avatar
              name={avatarName}
              src={
                avatarType === "image"
                  ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                  : undefined
              }
              size={avatarSize}
              shape={avatarShape}
            />
            <div className="space-y-0.5">
              <p className="font-label text-sm font-semibold text-neutral-900">
                {avatarName || "Anonim"}
              </p>
              <p className="text-xs text-neutral-500">
                Size: {avatarSize.toUpperCase()} · Shape: {avatarShape} · Type:{" "}
                {avatarType}
              </p>
            </div>
          </div>
          <span className="font-mono text-xs text-neutral-400">
            Inisial:{" "}
            {avatarName
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase() || "?"}
          </span>
        </div>
      </div>
    </DocBlock>
  );
}
