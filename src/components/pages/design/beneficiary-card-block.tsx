import { Box } from "lucide-react";
import { toast } from "sonner";
import { BeneficiaryCard } from "#/components/shared";
import { DocBlock } from "./doc-block";

export interface BeneficiaryCardBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * BeneficiaryCardBlock: Dokumentasi kartu profil penerima manfaat sistem BBJ (Node 137:563).
 * Menampilkan kartu lembaga dengan metrik relawan Heroes, kilogram dampak, dan indikator progres kuota.
 */
export function BeneficiaryCardBlock({
  onCopy,
  copiedToken,
}: BeneficiaryCardBlockProps) {
  return (
    <DocBlock
      id="doc-beneficiary-card"
      nodeId="Node 137:563"
      title="12. Beneficiary Card"
      subtitle="src/components/shared/beneficiary-card.tsx"
      icon={<Box className="size-4" />}
      copyCode='<BeneficiaryCard name="Universitas Gadjah Mada" type="Kampus" rank="#1" heroesCount={24} impactCount="2.450" sharePercent={92} onDetail={handleDetail} onEdit={handleEdit} onDelete={handleDelete} />'
      copyTokenKey="beneficiary-card-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=137-563&t=SzCwTYJWBfVK4FdY-4"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
        Kartu profil penerima manfaat (panti asuhan, yayasan, komunitas warga)
        dengan metrik relawan Heroes, kilogram dampak surplus pangan, indikator
        kuota bulanan (6px Progress Bar), serta aksi Detail, Edit, dan Hapus
        (Figma Node 137:563). Lebar kartu 352px, avatar 64px, tombol detail 38px
        height.
      </p>

      {/* 3 Live Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BeneficiaryCard
          name="Universitas Gadjah Mada"
          type="Kampus"
          rank="#1"
          avatarName="UGM"
          heroesCount={24}
          impactCount="2.450"
          sharePercent={92}
          shareText="92% dari kuota bulanan tersalurkan"
          onDetail={() => toast.info("Membuka detail Universitas Gadjah Mada")}
          onEdit={() => toast.info("Edit data penerima UGM")}
          onDelete={() => toast.error("Hapus data penerima UGM")}
        />
        <BeneficiaryCard
          name="Panti Asuhan Sinar Melati"
          type="Panti Asuhan"
          rank="#2"
          avatarName="Sinar Melati"
          heroesCount={14}
          impactCount="1.240"
          sharePercent={85}
          shareText="85% dari kuota bulanan tersalurkan"
          onDetail={() =>
            toast.info("Membuka detail Panti Asuhan Sinar Melati")
          }
          onEdit={() => toast.info("Edit data penerima Sinar Melati")}
          onDelete={() => toast.error("Hapus data penerima Sinar Melati")}
        />
        <BeneficiaryCard
          name="Komunitas Dapur Berkah"
          type="Komunitas Warga"
          rank="#3"
          avatarName="Dapur Berkah"
          heroesCount={8}
          impactCount="680"
          sharePercent={60}
          shareText="60% dari kuota bulanan tersalurkan"
          onDetail={() => toast.info("Membuka detail Komunitas Dapur Berkah")}
          onEdit={() => toast.info("Edit data penerima Dapur Berkah")}
          onDelete={() => toast.error("Hapus data penerima Dapur Berkah")}
        />
      </div>
    </DocBlock>
  );
}
