import * as React from "react";
import { Box } from "lucide-react";
import { toast } from "#/components/ui";
import { GoogleSignInButton } from "#/components/shared";
import { DocBlock } from "./doc-block";

export interface GoogleSignInBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * GoogleSignInBlock: Dokumentasi tombol login Google resmi sistem BBJ (Node 32:536).
 * Menampilkan 4 varian status (default, hover, loading, disabled) serta simulasi interaktif.
 */
export function GoogleSignInBlock({
  onCopy,
  copiedToken,
}: GoogleSignInBlockProps) {
  const [googleLoading, setGoogleLoading] = React.useState(false);

  return (
    <DocBlock
      id="doc-google-signin"
      nodeId="Node 32:536"
      title="11. Google Sign-In Button"
      subtitle="src/components/shared/google-sign-in-button.tsx"
      icon={<Box className="size-4" />}
      copyCode="<GoogleSignInButton onClick={handleSignIn} />"
      copyTokenKey="google-btn-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=32-536&t=SzCwTYJWBfVK4FdY-4"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
        Satu-satunya jalan masuk admin (PRD: Google Identity Services). Klik
        membuka Google Account Chooser. Loading: setelah token diterima dan
        dikirim ke POST /api/v1/auth/google. Jika popup ditutup, kembali ke
        Default tanpa request. Logo Google mengikuti pedoman merek Google,
        jangan diubah warnanya.
      </p>

      {/* 4-variant Matrix matching Node 32:535 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-2">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Default
          </span>
          <GoogleSignInButton forcedState="default" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Hover
          </span>
          <GoogleSignInButton forcedState="hover" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Loading
          </span>
          <GoogleSignInButton forcedState="loading" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            State = Disabled
          </span>
          <GoogleSignInButton forcedState="disabled" />
        </div>
      </div>

      {/* Interactive Tester */}
      <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-4">
        <span className="font-['Inter'] font-semibold text-xs text-neutral-500 w-full sm:w-auto">
          Live Interactive Button (Simulasi verifikasi 1.2 detik):
        </span>
        <div className="max-w-sm w-full">
          <GoogleSignInButton
            isLoading={googleLoading}
            onClick={() => {
              setGoogleLoading(true);
              setTimeout(() => {
                setGoogleLoading(false);
                toast.success("Berhasil terautentikasi via Google!");
              }, 1200);
            }}
          />
        </div>
      </div>
    </DocBlock>
  );
}
