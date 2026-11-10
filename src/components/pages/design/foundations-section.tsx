import { PrinciplesBlock } from "./principles-block";
import { ColorRampsBlock } from "./color-ramps-block";
import { SemanticTokensBlock } from "./semantic-tokens-block";
import { TypographyScaleBlock } from "./typography-scale-block";
import { GeometryElevationBlock } from "./geometry-elevation-block";

export interface FoundationsSectionProps {
  onCopy: (text: string, id?: string) => void;
  copiedToken: string | null;
}

/**
 * FoundationsSection: Bagian 1 Fondasi & Token Design System BBJ (Node 12:141).
 * Mengorkestrasi 5 blok kartu standar:
 * 1. PrinciplesBlock (Prinsip & Sampul)
 * 2. ColorRampsBlock (Palet 7 Skala Warna)
 * 3. SemanticTokensBlock (Matriks Token Semantik)
 * 4. TypographyScaleBlock (Skala Tipografi Visual)
 * 5. GeometryElevationBlock (Spacing, Radius, & Shadow Tokens)
 */
export function FoundationsSection({
  onCopy,
  copiedToken,
}: FoundationsSectionProps) {
  return (
    <section className="space-y-6 sm:space-y-8 animate-in fade-in duration-200 w-full max-w-full">
      <PrinciplesBlock />
      <ColorRampsBlock onCopy={onCopy} copiedToken={copiedToken} />
      <SemanticTokensBlock />
      <TypographyScaleBlock />
      <GeometryElevationBlock />
    </section>
  );
}
