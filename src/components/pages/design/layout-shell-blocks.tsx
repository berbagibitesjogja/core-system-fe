import { Layout, Menu, User } from "lucide-react";
import { Header, Sidebar, UserProfileMenu } from "#/components/shared";
import { DocBlock } from "./doc-block";

export interface LayoutShellBlockProps {
  onCopy?: (code: string, id?: string) => void;
  copiedToken?: string | null;
}

/**
 * UserProfileMenuBlock: Dokumentasi komponen User Profile Menu Chip & Dropdown (Figma 112:526).
 */
export function UserProfileMenuBlock({
  onCopy,
  copiedToken,
}: LayoutShellBlockProps) {
  return (
    <DocBlock
      id="doc-user-profile-menu"
      nodeId="Node 112:526"
      title="8. User Profile Menu"
      subtitle="src/components/shared/user-profile-menu.tsx"
      icon={<User className="size-4" />}
      copyCode={`<UserProfileMenu\n  name="Dian Pratiwi"\n  role="Super Admin"\n  division="Divisi Operasional"\n  onLogout={() => {}}\n/>`}
      copyTokenKey="user-profile-menu-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=112-526"
    >
      <p className="font-sans text-sm text-neutral-600 max-w-[900px]">
        Chip profil pengguna yang terletak di Top Bar header. Menampilkan avatar
        inisial/foto Google SSO, nama lengkap, peran/divisi, dan ikon chevron
        dropdown interaktif dengan opsi menu profil, pengaturan, bantuan, serta
        aksi logout.
      </p>

      {/* Interactive Trigger Demo */}
      <div className="space-y-4">
        <h4 className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500">
          Demo Interaktif (Klik untuk membuka menu popover)
        </h4>
        <div className="flex flex-wrap items-center gap-6 p-6 rounded-2xl bg-canvas border border-neutral-200">
          {[
            {
              roleLabel: "Role: Super Admin",
              name: "Dian Pratiwi",
              role: "Super Admin",
              division: "Divisi Operasional",
            },
            {
              roleLabel: "Role: Staff",
              name: "Bima Aditya",
              role: "Staff",
              division: "Logistik Makanan",
            },
          ].map((demo, idx) => (
            <div key={idx}>
              <span className="font-label text-xs text-neutral-500 block mb-2">
                {demo.roleLabel}
              </span>
              <UserProfileMenu
                name={demo.name}
                role={demo.role}
                division={demo.division}
              />
            </div>
          ))}
        </div>
      </div>
    </DocBlock>
  );
}

/**
 * HeaderBlock: Dokumentasi komponen Top Header Bar Admin BBJ (Figma 112:522).
 */
export function HeaderBlock({ onCopy, copiedToken }: LayoutShellBlockProps) {
  return (
    <DocBlock
      id="doc-header"
      nodeId="Node 112:522"
      title="9. Admin Top Header"
      subtitle="src/components/shared/header.tsx"
      icon={<Layout className="size-4" />}
      copyCode={`<Header\n  title="Dashboard"\n  subtitle="Minggu, 8 November 2026"\n  onMenuToggle={() => {}}\n/>`}
      copyTokenKey="header-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=112-522"
    >
      <p className="font-sans text-sm text-neutral-600 max-w-[900px]">
        Top Bar navigasi tingkat atas admin BBJ. Berisi judul halaman dengan
        font Gabarito, tanggal bahasa Indonesia dinamis, tombol menu mobile
        (muncul otomatis di bawah breakpoint lg), serta komponen User Profile
        Menu di sisi kanan.
      </p>

      {/* Pratinjau Header */}
      <div className="space-y-3">
        <h4 className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500">
          Pratinjau Nyata Komponen Header (Di dalam Main, transparan tanpa
          background)
        </h4>
        <div className="rounded-2xl border border-neutral-200 bg-canvas p-4 sm:p-6 shadow-xs">
          <Header
            title="Dashboard"
            subtitle="Minggu, 8 November 2026"
            onMenuToggle={() => alert("Buka menu mobile drawer")}
          />
        </div>
      </div>
    </DocBlock>
  );
}

/**
 * SidebarBlock: Dokumentasi komponen Sidebar Navigasi Admin BBJ (Figma 112:319).
 */
export function SidebarBlock({ onCopy, copiedToken }: LayoutShellBlockProps) {
  return (
    <DocBlock
      id="doc-sidebar"
      nodeId="Node 112:319"
      title="10. Admin Navigation Sidebar"
      subtitle="src/components/shared/sidebar.tsx"
      icon={<Menu className="size-4" />}
      copyCode={`<Sidebar\n  activePath="/admin/dashboard"\n  userRole="super_admin"\n  onLogout={() => {}}\n/>`}
      copyTokenKey="sidebar-code"
      copiedToken={copiedToken}
      onCopy={onCopy}
      figmaUrl="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=112-319"
    >
      <p className="font-sans text-sm text-neutral-600 max-w-[900px]">
        Navigasi utama admin BBJ selebar 264px. Memuat header brand logo Berbagi
        Bites Jogja, kelompok menu terstruktur (Utama, Data, Tim, Sistem),
        indikator badge status fitur, submenu collapsible pada item Reimburse,
        dan tombol logout di bagian bawah.
      </p>

      {/* Pratinjau Mini Sidebar */}
      <div className="space-y-3">
        <h4 className="font-label text-xs font-bold uppercase tracking-wider text-neutral-500">
          Pratinjau Tata Letak Sidebar Desktop
        </h4>
        <div className="flex justify-center p-6 rounded-2xl bg-canvas border border-neutral-200">
          <div className="w-[264px] h-[640px] rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
            <Sidebar
              activePath="/admin/dashboard"
              className="!flex !h-full !sticky-none !w-full"
            />
          </div>
        </div>
      </div>
    </DocBlock>
  );
}
