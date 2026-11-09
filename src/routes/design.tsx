import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUp, Box } from "lucide-react";
import { toast } from "#/components/ui/toast";

import { Badge } from "#/components/ui/badge";
import { FilterChip } from "#/components/shared";
import {
  ActionsFormSection,
  DataDisplaySection,
  NavFeedbackSection,
  FoundationsSection,
  ExampleSection,
} from "#/components/pages/design";

export const Route = createFileRoute("/design")({
  component: DesignShowcasePage,
});

function DesignShowcasePage() {
  const [activeSection, setActiveSection] =
    React.useState<string>("foundations");
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopy = (text: string, id?: string) => {
    navigator.clipboard.writeText(text);
    const key = id || text;
    setCopiedToken(key);
    toast.success("Kode berhasil disalin!");
    setTimeout(() => setCopiedToken(null), 1800);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Track active section via IntersectionObserver on scroll
  React.useEffect(() => {
    const sectionIds = [
      "foundations",
      "actions",
      "datadisplay",
      "navfeedback",
      "example",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-canvas font-sans antialiased text-neutral-900 p-6 md:p-12 space-y-16"
    >
      {/* Top Breadcrumb & Hero Header (WP4 Style) */}
      <header className="border-b border-neutral-200 pb-8 space-y-6 max-w-[1600px] mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-brand hover:text-brand-hover transition-colors group cursor-pointer"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Beranda Utama</span>
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <p className="font-overline text-brand tracking-widest uppercase text-xs font-bold">
              Berbagi Bites Jogja · Admin Design System &amp; UI Components
            </p>
            <h1 className="font-display-xl text-neutral-900 tracking-tight text-3xl sm:text-4xl lg:text-5xl">
              Design System Showcase &amp; Component Docs
            </h1>
            <p className="font-body-m text-neutral-600 leading-relaxed text-sm sm:text-base">
              Dokumentasi sistem desain terpadu dalam 1 halaman utuh: token
              fondasi (Figma 12:141), 13 komponen aksi &amp; form (Figma 16:273
              - 138:11319), 9 komponen data display &amp; tabel (Figma 17:197 -
              137:563), 7 komponen navigasi &amp; feedback (Figma 19:220 -
              20:371), serta contoh penerapan layar administratif utuh (Figma
              23:334).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Badge tone="brand" styleVariant="soft" dot>
              Tailwind CSS v4 &amp; TanStack Start
            </Badge>
            <Badge tone="accent" styleVariant="soft" dot>
              13 Actions &amp; Form
            </Badge>
            <Badge tone="success" styleVariant="soft" dot>
              9 Data Display Items
            </Badge>
            <Badge tone="brand" styleVariant="soft" dot>
              7 Nav &amp; Feedback Items
            </Badge>
          </div>
        </div>

        {/* Sticky Anchor Quick Jump Bar */}
        <div className="sticky top-0 z-30 -mx-6 md:-mx-12 px-6 md:px-12 py-3.5 bg-canvas/90 backdrop-blur-md border-y border-neutral-200/80 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider font-label mr-2 hidden sm:inline">
            Lompat Cepat:
          </span>
          <FilterChip
            selected={activeSection === "foundations"}
            onClick={() => scrollToSection("foundations")}
          >
            🎨 1. Fondasi &amp; Token (12:141)
          </FilterChip>
          <FilterChip
            selected={activeSection === "actions"}
            onClick={() => scrollToSection("actions")}
            count={13}
          >
            ⚡ 2. Actions &amp; Form (16:273)
          </FilterChip>
          <FilterChip
            selected={activeSection === "datadisplay"}
            onClick={() => scrollToSection("datadisplay")}
            count={9}
          >
            📊 3. Data Display (17:197)
          </FilterChip>
          <FilterChip
            selected={activeSection === "navfeedback"}
            onClick={() => scrollToSection("navfeedback")}
            count={7}
          >
            🧭 4. Nav &amp; Feedback (19:220)
          </FilterChip>
          <FilterChip
            selected={activeSection === "example"}
            onClick={() => scrollToSection("example")}
          >
            📋 5. Contoh Layar Admin (23:334)
          </FilterChip>
        </div>
      </header>

      {/* Main Single-Page Scroll Container */}
      <main className="max-w-[1600px] mx-auto space-y-24">
        {/* ================================================================== */}
        {/* SECTION 1: FONDASI & TOKEN DESAIN                                  */}
        {/* ================================================================== */}
        <section id="foundations" className="space-y-6 scroll-mt-28">
          <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 pb-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-bondi-50 text-brand flex items-center justify-center font-bold">
                <Box className="size-4" />
              </div>
              <div>
                <h2 className="font-heading-h2 text-xl sm:text-2xl font-bold text-neutral-900">
                  1. Fondasi Desain &amp; Token Semantik
                </h2>
                <p className="text-xs text-neutral-500">
                  Figma Node 12:141 · Color Ramps, Radii, Shadows, Spacing &amp;
                  Typography
                </p>
              </div>
            </div>
            <span className="font-mono text-xs px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
              src/styles.css
            </span>
          </div>

          <FoundationsSection onCopy={handleCopy} copiedToken={copiedToken} />
        </section>

        {/* ================================================================== */}
        {/* SECTION 2: ACTIONS & FORM                                          */}
        {/* ================================================================== */}
        <section id="actions" className="space-y-6 scroll-mt-28">
          <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 pb-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-sunny-100 text-sunny-800 flex items-center justify-center font-bold">
                <Box className="size-4" />
              </div>
              <div>
                <h2 className="font-heading-h2 text-xl sm:text-2xl font-bold text-neutral-900">
                  2. Actions &amp; Form Components
                </h2>
                <p className="text-xs text-neutral-500">
                  Figma Node 16:273 - 138:11319 · 13 Komponen Aksi, Tombol,
                  Input &amp; Unggah
                </p>
              </div>
            </div>
            <span className="font-mono text-xs px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
              13 Komponen Reusable
            </span>
          </div>

          <ActionsFormSection onCopy={handleCopy} copiedToken={copiedToken} />
        </section>

        {/* ================================================================== */}
        {/* SECTION 3: DATA DISPLAY                                            */}
        {/* ================================================================== */}
        <section id="datadisplay" className="space-y-6 scroll-mt-28">
          <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 pb-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-green-100 text-green-800 flex items-center justify-center font-bold">
                <Box className="size-4" />
              </div>
              <div>
                <h2 className="font-heading-h2 text-xl sm:text-2xl font-bold text-neutral-900">
                  3. Data Display &amp; Table Components
                </h2>
                <p className="text-xs text-neutral-500">
                  Figma Node 17:197 - 137:563 · 9 Komponen Penyajian Data,
                  Status, Metrik &amp; Tabel
                </p>
              </div>
            </div>
            <span className="font-mono text-xs px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
              9 Komponen Reusable
            </span>
          </div>

          <DataDisplaySection onCopy={handleCopy} copiedToken={copiedToken} />
        </section>

        {/* ================================================================== */}
        {/* SECTION 4: NAV & FEEDBACK                                          */}
        {/* ================================================================== */}
        <section id="navfeedback" className="space-y-6 scroll-mt-28">
          <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 pb-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-bondi-100 text-bondi-900 flex items-center justify-center font-bold">
                <Box className="size-4" />
              </div>
              <div>
                <h2 className="font-heading-h2 text-xl sm:text-2xl font-bold text-neutral-900">
                  4. Navigation &amp; Feedback Components
                </h2>
                <p className="text-xs text-neutral-500">
                  Figma Node 19:220 - 20:371 · 7 Komponen Navigasi, Menu, Modal,
                  Toast &amp; Alert
                </p>
              </div>
            </div>
            <span className="font-mono text-xs px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
              7 Komponen Reusable
            </span>
          </div>

          <NavFeedbackSection onCopy={handleCopy} copiedToken={copiedToken} />
        </section>

        {/* ================================================================== */}
        {/* SECTION 5: CONTOH LAYAR ADMIN (MOCKUP UTUH)                        */}
        {/* ================================================================== */}
        <section id="example" className="space-y-6 scroll-mt-28">
          <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 pb-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-sunny-100 text-neutral-900 flex items-center justify-center font-bold">
                <Box className="size-4" />
              </div>
              <div>
                <h2 className="font-heading-h2 text-xl sm:text-2xl font-bold text-neutral-900">
                  5. Contoh Layar Admin: Daftar Donasi
                </h2>
                <p className="text-xs text-neutral-500">
                  Figma Node 23:334 · Implementasi Penuh 100% Komponen Reusable
                  BBJ
                </p>
              </div>
            </div>
            <span className="font-mono text-xs px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
              Live Interactive Prototype
            </span>
          </div>

          <ExampleSection />
        </section>
      </main>

      {/* Quick Scroll-to-Top Button (Pojok Kiri Bawah) */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--color-bg-brand,#007d85)] text-white shadow-pop-md hover:bg-[var(--color-bg-brand-hover,#005e64)] active:translate-y-0.5 transition-all duration-200 cursor-pointer font-['Inter'] font-semibold text-xs border-[1.5px] border-[#142023] animate-in fade-in slide-in-from-bottom-4 select-none"
          title="Kembali ke atas"
          aria-label="Kembali ke atas"
        >
          <ArrowUp className="size-4 shrink-0" />
          <span>Ke Atas</span>
        </button>
      )}
    </div>
  );
}
