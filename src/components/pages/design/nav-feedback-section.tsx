import { ExternalLink } from "lucide-react";
import { NavItemBlock } from "./nav-item-block";
import { BottomNavBlock } from "./bottom-nav-block";
import { MenuBlock } from "./menu-block";
import { ModalBlock } from "./modal-block";
import { ToastBlock } from "./toast-block";
import { AlertBlock } from "./alert-block";
import { TooltipBlock } from "./tooltip-block";
import {
  UserProfileMenuBlock,
  HeaderBlock,
  SidebarBlock,
} from "./layout-shell-blocks";

export interface NavFeedbackSectionProps {
  onCopy: (text: string, id?: string) => void;
  copiedToken: string | null;
}

const NAV_FEEDBACK_BLOCKS: Array<{
  id: string;
  Component: React.ComponentType<NavFeedbackSectionProps>;
}> = [
  { id: "nav-item", Component: NavItemBlock },
  { id: "bottom-nav", Component: BottomNavBlock },
  { id: "menu", Component: MenuBlock },
  { id: "modal", Component: ModalBlock },
  { id: "toast", Component: ToastBlock },
  { id: "alert", Component: AlertBlock },
  { id: "tooltip", Component: TooltipBlock },
  { id: "user-profile-menu", Component: UserProfileMenuBlock },
  { id: "header", Component: HeaderBlock },
  { id: "sidebar", Component: SidebarBlock },
];

/**
 * NavFeedbackSection: Orchestrator untuk komponen navigasi, feedback & layout shell BBJ (10 blok).
 * Dimodularisasi dan dirender dinamis berbasis data-driven blok.
 */
export function NavFeedbackSection({
  onCopy,
  copiedToken,
}: NavFeedbackSectionProps) {
  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-brand">
                Figma Category · Navigation, Feedback &amp; Layout Shell (Node
                19:220 - 112:526)
              </span>
              <span className="text-neutral-300">•</span>
              <span className="font-label text-xs font-semibold text-neutral-500">
                10 Komponen
              </span>
            </div>
            <h2 className="font-heading-h1 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Navigation, Feedback &amp; Layout Shell Components
            </h2>
            <p className="font-body-m max-w-3xl text-sm text-neutral-600">
              Spesifikasi resmi sistem navigasi, respon antarmuka, dan tata
              letak shell Bagi-Bagi Jogja: Nav Item sidebar (3 status), Bottom
              Nav Item mobile (2 status), Menu dropdown multi-pilihan (8
              varian), Modal dialog konfirmasi (2 tone), Toast notifikasi tinta
              gelap BBJ penindih Sonner (4 tone), Alert banner inline (4 tone),
              Tooltip penunjuk aksi (2 placement), User Profile Menu, Top Bar
              Header, serta Sidebar Navigasi Desktop &amp; Mobile.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <a
              href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=12-143"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 shadow-xs transition-colors"
            >
              <span>Buka di Figma</span>
              <ExternalLink className="size-3.5 text-neutral-400" />
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {NAV_FEEDBACK_BLOCKS.map(({ id, Component }) => (
          <Component key={id} onCopy={onCopy} copiedToken={copiedToken} />
        ))}
      </div>
    </div>
  );
}
