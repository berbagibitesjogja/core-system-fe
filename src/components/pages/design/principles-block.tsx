import { DocBlock } from "./doc-block";

/**
 * PrinciplesBlock: Blok pengantar dan 4 prinsip desain utama BBJ (Node 12:141).
 */
export function PrinciplesBlock() {
  return (
    <DocBlock
      id="foundations-principles"
      overline="Design System v1 · Admin"
      title="Berbagi Bites Jogja"
      description="Fondasi visual & komponen untuk sistem manajemen BBJ. Fun & simple: hangat seperti komunitasnya, tetap rapi untuk kerja data harian relawan."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 pt-2">
        <div className="p-4 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
          <h4 className="font-heading-h4 text-sm font-bold text-neutral-900">
            Fun, tapi jelas
          </h4>
          <p className="font-body-s text-xs text-neutral-600 leading-relaxed">
            Kuning aksen, sudut membulat, dan pop shadow dipakai hemat untuk
            momen penting. Tabel dan form tetap tenang supaya data mudah
            dipindai.
          </p>
        </div>

        <div className="p-4 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
          <h4 className="font-heading-h4 text-sm font-bold text-neutral-900">
            Satu aksi utama
          </h4>
          <p className="font-body-s text-xs text-neutral-600 leading-relaxed">
            Satu tombol tosca solid per layar untuk alur utama. Aksi lain
            memakai secondary, ghost, atau outline.
          </p>
        </div>

        <div className="p-4 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
          <h4 className="font-heading-h4 text-sm font-bold text-neutral-900">
            Hormati role
          </h4>
          <p className="font-body-s text-xs text-neutral-600 leading-relaxed">
            Aksi sensitif (hapus mitra, approve reimburse) diberi batas visual
            jelas (merah/danger, konfirmasi modal).
          </p>
        </div>

        <div className="p-4 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
          <h4 className="font-heading-h4 text-sm font-bold text-neutral-900">
            Mobile itu lapangan
          </h4>
          <p className="font-body-s text-xs text-neutral-600 leading-relaxed">
            Relawan hero memakai hp saat penjemputan. Target sentuh minimal
            44px, teks terbaca di bawah matahari.
          </p>
        </div>
      </div>
    </DocBlock>
  );
}
