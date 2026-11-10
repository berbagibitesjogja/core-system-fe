import * as React from "react";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "#/components/ui";
import { BeneficiaryCard } from "#/components/shared";
import { DocBlock } from "./doc-block";

export interface BeneficiaryDisplayBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * BeneficiaryDisplayBlock: Dokumentasi kartu profil penerima manfaat sistem BBJ (Node 137:563).
 * Menampilkan kartu profil lembaga dengan metrik relawan, dampak pangan, dan progress kuota bulanan.
 */
export function BeneficiaryDisplayBlock({
  onCopy,
  copiedToken,
}: BeneficiaryDisplayBlockProps) {
  const [beneficiaryName, setBeneficiaryName] = React.useState(
    "Panti Asuhan Sinar Melati",
  );
  const [beneficiaryType, setBeneficiaryType] = React.useState("Panti Asuhan");
  const [beneficiaryRank, setBeneficiaryRank] = React.useState("#1");
  const [beneficiaryHeroes, setBeneficiaryHeroes] = React.useState(65);
  const [beneficiaryImpact, setBeneficiaryImpact] = React.useState(280);
  const [beneficiaryShare, setBeneficiaryShare] = React.useState(60);

  return (
    <DocBlock
      id="doc-beneficiary-card"
      nodeId="Node 137:563"
      title="9. Beneficiary Card"
      subtitle="src/components/shared/beneficiary-card.tsx"
      copyCode={`<BeneficiaryCard\n  name="Panti Asuhan Sinar Melati"\n  type="Panti Asuhan"\n  rank="#1"\n  heroesCount={65}\n  impactCount={280}\n  sharePercent={60}\n  onDetail={() => {}}\n  onEdit={() => {}}\n  onDelete={() => {}}\n/>`}
      copyTokenKey="beneficiary-card-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=137-563"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
        Kartu presentasi profil lembaga penerima manfaat (panti asuhan,
        komunitas dhuafa, yayasan, universitas). Menampilkan identitas lembaga
        dengan Avatar rounded 64px, pill type lembaga, rank nomor, dua kolom
        metrik terpisah divider vertikal (Heroes Orang &amp; Impact Kg),
        Progress Bar kuota bulanan tersalurkan, serta tombol aksi cepat (Detail,
        Edit, Hapus).
      </p>

      {/* 3 Real-World Cards Grid */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h4 className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500">
            Showcase Kartu Lembaga Penerima (Lebar 352px · Responsive)
          </h4>
          <span className="text-xs text-neutral-400">
            Uji Coba Aksi Detail / Edit / Hapus via Toast
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <BeneficiaryCard
            name="Universitas Gadjah Mada"
            type="Kantin Dhuafa"
            rank="#1"
            heroesCount={120}
            impactCount={450}
            sharePercent={75}
            onDetail={() =>
              toast.info("Membuka detail dampak UGM...", {
                description: "450 Kg makanan telah tersalurkan bulan ini.",
              })
            }
            onEdit={() => toast.success("Membuka formulir edit data UGM")}
            onDelete={() => toast.error("Aksi hapus hanya untuk Super Admin")}
          />

          <BeneficiaryCard
            name="Panti Asuhan Sinar Melati"
            type="Panti Asuhan"
            rank="#2"
            heroesCount={65}
            impactCount={280}
            sharePercent={45}
            onDetail={() =>
              toast.info("Membuka detail Panti Asuhan Sinar Melati...", {
                description: "280 Kg makanan telah tersalurkan bulan ini.",
              })
            }
            onEdit={() =>
              toast.success("Membuka formulir edit data Sinar Melati")
            }
            onDelete={() => toast.error("Aksi hapus hanya untuk Super Admin")}
          />

          <BeneficiaryCard
            name="Komunitas Dapur Berkah Jogja"
            type="Komunitas Relawan"
            rank="#3"
            heroesCount={90}
            impactCount={320}
            sharePercent={90}
            onDetail={() =>
              toast.info("Membuka detail Komunitas Dapur Berkah...", {
                description: "320 Kg makanan telah tersalurkan bulan ini.",
              })
            }
            onEdit={() =>
              toast.success("Membuka formulir edit data Dapur Berkah")
            }
            onDelete={() => toast.error("Aksi hapus hanya untuk Super Admin")}
          />
        </div>
      </div>

      {/* Live Interactive Beneficiary Card Tester */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
            Interactive Live Beneficiary Card Tester
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setBeneficiaryName("Panti Asuhan Sinar Melati");
              setBeneficiaryType("Panti Asuhan");
              setBeneficiaryRank("#1");
              setBeneficiaryHeroes(65);
              setBeneficiaryImpact(280);
              setBeneficiaryShare(60);
            }}
          >
            <RotateCcw className="size-3.5" />
            <span>Reset</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Nama Lembaga
            </label>
            <input
              type="text"
              value={beneficiaryName}
              onChange={(e) => setBeneficiaryName(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:border-brand focus:outline-hidden"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Kategori Lembaga (Type)
            </label>
            <select
              value={beneficiaryType}
              onChange={(e) => setBeneficiaryType(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 focus:border-brand focus:outline-hidden"
            >
              <option value="Panti Asuhan">Panti Asuhan</option>
              <option value="Komunitas Relawan">Komunitas Relawan</option>
              <option value="Kantin Dhuafa">Kantin Dhuafa</option>
              <option value="Pondok Pesantren">Pondok Pesantren</option>
              <option value="Yayasan Sosial">Yayasan Sosial</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Peringkat (Rank)
            </label>
            <input
              type="text"
              value={beneficiaryRank}
              onChange={(e) => setBeneficiaryRank(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:border-brand focus:outline-hidden"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Heroes (Orang)
            </label>
            <input
              type="number"
              value={beneficiaryHeroes}
              onChange={(e) => setBeneficiaryHeroes(Number(e.target.value))}
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:border-brand focus:outline-hidden"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-600">
              Impact (Kg)
            </label>
            <input
              type="number"
              value={beneficiaryImpact}
              onChange={(e) => setBeneficiaryImpact(Number(e.target.value))}
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-800 focus:border-brand focus:outline-hidden"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-label text-xs font-semibold text-neutral-600">
                Persentase Kuota
              </label>
              <span className="font-mono text-xs font-bold text-brand">
                {beneficiaryShare}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={beneficiaryShare}
              onChange={(e) => setBeneficiaryShare(Number(e.target.value))}
              className="w-full accent-brand cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-4">
          <span className="text-xs text-neutral-500">
            Hasil Preview Real-time:
          </span>
          <BeneficiaryCard
            name={beneficiaryName || "Lembaga Tanpa Nama"}
            type={beneficiaryType}
            rank={beneficiaryRank}
            heroesCount={beneficiaryHeroes}
            impactCount={beneficiaryImpact}
            sharePercent={beneficiaryShare}
            onDetail={() => toast.info(`Detail untuk ${beneficiaryName}...`)}
            onEdit={() => toast.success(`Edit ${beneficiaryName}...`)}
            onDelete={() => toast.error("Hanya untuk Admin Super")}
          />
        </div>
      </div>
    </DocBlock>
  );
}
