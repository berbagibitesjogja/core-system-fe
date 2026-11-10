import * as React from "react";
import {
  FileText,
  Navigation,
  Package,
  Receipt,
  Search,
  User,
} from "lucide-react";
import { Badge, MenuItem } from "#/components/ui";
import { DocBlock } from "./doc-block";

export interface MenuBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * MenuBlock: Dokumentasi menu dropdown & menu item sistem BBJ (Node 21:421).
 * Menampilkan matriks 8 varian (plain vs checkbox dalam 4 state),
 * serta demo panel menu interaktif 300px dengan pencarian.
 */
export function MenuBlock({ onCopy, copiedToken }: MenuBlockProps) {
  const [menuSearch, setMenuSearch] = React.useState("");
  const [selectedBeneficiaries, setSelectedBeneficiaries] = React.useState<
    string[]
  >(["ugm", "brspa"]);

  const toggleBeneficiary = (id: string) => {
    setSelectedBeneficiaries((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <DocBlock
      id="doc-menu"
      nodeId="Node 21:421"
      title="3. Menu & Menu Item"
      subtitle="src/components/ui/menu.tsx"
      icon={<Navigation className="size-4" />}
      copyCode={`<Menu searchable searchPlaceholder="Cari beneficiary...">\n  <MenuItem type="checkbox" label="Universitas Gadjah Mada" meta="student" selected={true} />\n</Menu>`}
      copyTokenKey="menu-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=21-421"
    >
      <p className="font-['Josefin_Sans'] font-normal text-[14px] leading-[20px] text-[#4d585b] max-w-[900px]">
        Baris pilihan di dropdown (lebar 260px, tinggi 52px). Plain: menu
        navigasi (Ajukan Reimburse, Data Reimburse, Logs) dan pilihan tunggal.
        Checkbox: multi-select beneficiary. Disabled + badge Diblokir: hero yang
        diblokir di pencarian Tambah Heroes. Panel Menu (lebar 300px) dilengkapi
        kotak pencarian untuk daftar &gt;7 item.
      </p>

      {/* 8-Variant Matrix Table */}
      <div className="space-y-3">
        <h4 className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500">
          Matriks Varian Menu Item (Plain vs Checkbox × 4 States)
        </h4>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Plain Menu Items */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 space-y-3">
            <span className="font-label text-xs font-bold text-neutral-900 border-b border-neutral-200 pb-2 block">
              Tipe 1: Plain (Navigasi / Aksi Tunggal)
            </span>
            <div className="space-y-2">
              <MenuItem
                type="plain"
                icon={<Receipt className="size-4" />}
                label="Ajukan Reimburse"
                meta="Klaim bensin &amp; operasional"
              />
              <div className="bg-[#eef1f2] rounded-xl">
                <MenuItem
                  type="plain"
                  icon={<FileText className="size-4" />}
                  label="Data Reimburse (Hover)"
                  meta="Laporan riwayat klaim"
                />
              </div>
              <MenuItem
                type="plain"
                icon={<Package className="size-4" />}
                label="Daftar Donasi (Selected)"
                meta="Menu aktif saat ini"
                selected={true}
              />
              <MenuItem
                type="plain"
                icon={<User className="size-4" />}
                label="Akun Staff (Disabled)"
                meta="Hak akses terbatas"
                disabled={true}
              />
            </div>
          </div>

          {/* Checkbox Menu Items */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 space-y-3">
            <span className="font-label text-xs font-bold text-neutral-900 border-b border-neutral-200 pb-2 block">
              Tipe 2: Checkbox (Multi-select Beneficiary / Filter)
            </span>
            <div className="space-y-2">
              <MenuItem
                type="checkbox"
                label="Panti Asuhan Sinar Melati"
                meta="Kategori: Panti Asuhan"
                selected={false}
              />
              <div className="bg-[#eef1f2] rounded-xl">
                <MenuItem
                  type="checkbox"
                  label="Komunitas Dapur Berkah (Hover)"
                  meta="Kategori: Komunitas Dhuafa"
                  selected={false}
                />
              </div>
              <MenuItem
                type="checkbox"
                label="Universitas Gadjah Mada (Selected)"
                meta="Kategori: Kantin Mahasiswa"
                selected={true}
              />
              <div className="relative">
                <MenuItem
                  type="checkbox"
                  label="Hero Donatur (Disabled)"
                  meta="Pelanggaran SOP donasi"
                  disabled={true}
                />
                <div className="absolute right-3 top-3">
                  <Badge tone="danger" styleVariant="soft" dot>
                    Diblokir
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Interactive Menu Panel Demo */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <span className="font-label text-xs font-bold uppercase tracking-wider text-neutral-600">
            Interactive Live Menu Panel (Lebar 300px Sesuai Figma)
          </span>
          <span className="text-xs text-neutral-500">
            Terpilih: <strong>{selectedBeneficiaries.length} Lembaga</strong>
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Menu Dropdown Container */}
          <div className="w-full sm:w-[300px] shrink-0 rounded-2xl border border-neutral-200 bg-white p-2 shadow-[0px_8px_16px_rgba(20,32,35,0.12)] space-y-2">
            {/* Search Bar in Menu */}
            <div className="relative flex items-center rounded-xl bg-neutral-100 px-3 py-2">
              <Search className="size-4 text-neutral-400 shrink-0 mr-2" />
              <input
                type="text"
                placeholder="Cari beneficiary..."
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                className="w-full bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden"
              />
            </div>

            {/* Items List */}
            <div className="space-y-1 max-h-64 overflow-y-auto">
              <MenuItem
                type="checkbox"
                label="Universitas Gadjah Mada"
                meta="student · Sleman"
                selected={selectedBeneficiaries.includes("ugm")}
                onSelect={() => toggleBeneficiary("ugm")}
              />
              <MenuItem
                type="checkbox"
                label="Yayasan Hamba"
                meta="foundation · Pakem"
                selected={selectedBeneficiaries.includes("yayasan-hamba")}
                onSelect={() => toggleBeneficiary("yayasan-hamba")}
              />
              <MenuItem
                type="checkbox"
                label="Masyarakat Umum Maguwo"
                meta="society · Depok"
                selected={selectedBeneficiaries.includes("masyarakat")}
                onSelect={() => toggleBeneficiary("masyarakat")}
              />
              <MenuItem
                type="checkbox"
                label="BRSPA D.I. Yogyakarta"
                meta="foundation · Kasihan"
                selected={selectedBeneficiaries.includes("brspa")}
                onSelect={() => toggleBeneficiary("brspa")}
              />
            </div>
          </div>

          <div className="flex-1 w-full space-y-3 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5">
            <h5 className="font-label text-sm font-semibold text-neutral-900">
              Lembaga yang Terpilih:
            </h5>
            {selectedBeneficiaries.length === 0 ? (
              <p className="text-xs text-neutral-400">
                Belum ada lembaga yang dipilih. Centang salah satu pilihan pada
                menu dropdown di samping.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedBeneficiaries.map((id) => (
                  <Badge key={id} tone="brand" styleVariant="soft" dot>
                    {id.toUpperCase()}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DocBlock>
  );
}
