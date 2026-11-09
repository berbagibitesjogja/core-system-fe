import * as React from "react";
import {
  Building,
  Calendar,
  Check,
  Copy,
  ExternalLink,
  Eye,
  Heart,
  Home,
  Package,
  Pencil,
  Plus,
  Search,
  Trash2,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";

import {
  Avatar,
  Badge,
  Button,
  Dialog,
  IconButton,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/ui";
import { FilterChip, NavItem, Pagination } from "#/components/shared";
import { toast } from "#/components/ui/toast";
import { EXAMPLE_DONATION_ROWS } from "./design-data";

export function ExampleSection() {
  const [activeNav, setActiveNav] = React.useState("donasi");
  const [selectedFilter, setSelectedFilter] = React.useState<
    "Semua" | "Food Rescue" | "CSR"
  >("Semua");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortDirection, setSortDirection] = React.useState<
    "asc" | "desc" | "none"
  >("asc");
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);

  // Dialog State
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Form State for Add Donation
  const [newDonorName, setNewDonorName] = React.useState("");
  const [newCategory, setNewCategory] = React.useState<"Food Rescue" | "CSR">(
    "Food Rescue",
  );
  const [newQuota, setNewQuota] = React.useState("30 / 30");

  const [donations, setDonations] = React.useState(EXAMPLE_DONATION_ROWS);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(id);
    toast.success("Kode berhasil disalin!");
    setTimeout(() => setCopiedToken(null), 1800);
  };

  // Filtered & Sorted donations
  const filteredDonations = React.useMemo(() => {
    const list = donations.filter((item) => {
      const matchFilter =
        selectedFilter === "Semua" || item.category === selectedFilter;
      const matchSearch =
        item.donor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.day.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.date.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDate =
        !dateFilter ||
        item.date.toLowerCase().includes(dateFilter.toLowerCase());
      return matchFilter && matchSearch && matchDate;
    });

    if (sortDirection === "asc") {
      return [...list].sort((a, b) => a.donor.localeCompare(b.donor));
    } else if (sortDirection === "desc") {
      return [...list].sort((a, b) => b.donor.localeCompare(a.donor));
    }
    return list;
  }, [donations, selectedFilter, searchQuery, dateFilter, sortDirection]);

  const handleToggleSort = () => {
    setSortDirection((prev) =>
      prev === "none" ? "asc" : prev === "asc" ? "desc" : "none",
    );
  };

  const handleAddDonation = () => {
    if (!newDonorName.trim()) {
      toast.error("Nama donatur wajib diisi!");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const newEntry = {
        id: `DON-2026-${String(donations.length + 1).padStart(3, "0")}`,
        day: "Hari ini",
        date: "25 September 2026",
        donor: newDonorName.trim(),
        quota: newQuota.trim() || "20 / 20",
        category: newCategory,
        status: "Aktif",
        statusTone: "brand" as const,
      };
      setDonations([newEntry, ...donations]);
      setIsSubmitting(false);
      setIsAddDialogOpen(false);
      setNewDonorName("");
      toast.success(`Donasi dari ${newEntry.donor} berhasil ditambahkan!`);
    }, 500);
  };

  const handleDeleteConfirm = () => {
    if (!deleteTargetId) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const target = donations.find((d) => d.id === deleteTargetId);
      setDonations(donations.filter((d) => d.id !== deleteTargetId));
      setIsSubmitting(false);
      setDeleteTargetId(null);
      toast.success(
        `Data donasi ${target?.donor || deleteTargetId} berhasil dihapus.`,
      );
    }, 500);
  };

  return (
    <section className="space-y-8 animate-in fade-in duration-200">
      {/* Header Documentation Card */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-brand">
                Node 23:334
              </span>
              <span className="text-neutral-300">•</span>
              <span className="font-label text-xs font-semibold text-neutral-500">
                Penerapan Berbasis Komponen Reusable
              </span>
            </div>
            <h2 className="font-heading-h1 text-2xl font-bold text-neutral-900 sm:text-3xl">
              Contoh Layar Admin: Daftar Donasi
            </h2>
            <p className="font-body-m max-w-3xl text-sm text-neutral-600">
              Layar administratif utuh yang dibangun 100% menggunakan susunan
              komponen reusable yang telah dibuat (bukan markup HTML mentah):
              komponen{" "}
              <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded text-neutral-800">
                &lt;NavItem&gt;
              </code>
              ,{" "}
              <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded text-neutral-800">
                &lt;Button&gt;
              </code>
              ,{" "}
              <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded text-neutral-800">
                &lt;FilterChip&gt;
              </code>
              ,{" "}
              <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded text-neutral-800">
                &lt;Input&gt;
              </code>
              ,{" "}
              <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded text-neutral-800">
                &lt;Table&gt;
              </code>
              ,{" "}
              <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded text-neutral-800">
                &lt;Badge&gt;
              </code>
              ,{" "}
              <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded text-neutral-800">
                &lt;IconButton&gt;
              </code>
              ,{" "}
              <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded text-neutral-800">
                &lt;Pagination&gt;
              </code>
              ,{" "}
              <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded text-neutral-800">
                &lt;Dialog&gt;
              </code>
              , dan sistem notifikasi{" "}
              <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded text-neutral-800">
                toast
              </code>
              .
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                handleCopy(`<ExampleDaftarDonasi />`, "example-page-code")
              }
            >
              {copiedToken === "example-page-code" ? (
                <Check className="size-3.5 text-green-600" />
              ) : (
                <Copy className="size-3.5" />
              )}
              Salin Contoh Kode
            </Button>
            <a
              href="https://www.figma.com/design/ZJKa78CI7k6ob5lhfGYIUv/BBJ-2026?node-id=23-334"
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100 transition-colors"
              title="Buka di Figma"
            >
              <ExternalLink className="size-4" />
            </a>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <Badge tone="brand" styleVariant="soft" dot>
            &lt;NavItem&gt; Sidebar Desktop 240px
          </Badge>
          <Badge tone="accent" styleVariant="soft" dot>
            &lt;FilterChip&gt; Toolbar Pilihan
          </Badge>
          <Badge tone="success" styleVariant="soft" dot>
            &lt;Table&gt; Komponen Standar BBJ
          </Badge>
          <Badge tone="neutral" styleVariant="soft" dot>
            &lt;Dialog&gt; + &lt;Toast&gt; Interaktif
          </Badge>
        </div>
      </div>

      {/* =========================================================================
          LIVE MOCKUP: Contoh Layar Admin (Figma Node 23:334)
      ========================================================================= */}
      <div className="rounded-[24px] border border-neutral-200 bg-[#f5f7f7] shadow-sm overflow-hidden flex flex-col lg:flex-row min-h-[760px]">
        {/* SIDEBAR DESKTOP */}
        <aside className="w-full lg:w-[240px] bg-white border-b lg:border-b-0 lg:border-r border-[#e2e7e8] flex flex-col justify-between shrink-0 p-4 select-none">
          <div className="space-y-4">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-2.5 pb-3 pl-2 pt-1 border-b lg:border-b-0 border-neutral-100">
              <div className="size-9 rounded-[10px] bg-brand text-white font-['Gabarito'] font-semibold text-xl flex items-center justify-center shrink-0 shadow-xs">
                B
              </div>
              <span className="font-['Gabarito'] font-semibold text-lg text-neutral-900 tracking-tight">
                BBJ Admin
              </span>
            </div>

            {/* Reusable NavItem List */}
            <nav className="space-y-1">
              <NavItem
                label="Home"
                icon={<Home className="size-5" />}
                isActive={activeNav === "home"}
                onClick={() => setActiveNav("home")}
              />
              <NavItem
                label="Donasi"
                icon={<Package className="size-5" />}
                isActive={activeNav === "donasi"}
                onClick={() => setActiveNav("donasi")}
              />
              <NavItem
                label="Beneficiaries"
                icon={<Users className="size-5" />}
                isActive={activeNav === "beneficiaries"}
                onClick={() => setActiveNav("beneficiaries")}
              />
              <NavItem
                label="Heroes"
                icon={<Heart className="size-5" />}
                isActive={activeNav === "heroes"}
                onClick={() => setActiveNav("heroes")}
              />
              <NavItem
                label="Partner"
                icon={<Building className="size-5" />}
                isActive={activeNav === "partner"}
                onClick={() => setActiveNav("partner")}
              />
              <NavItem
                label="Volunteer"
                icon={<User className="size-5" />}
                isActive={activeNav === "volunteer"}
                onClick={() => setActiveNav("volunteer")}
              />
              <NavItem
                label="Reimburse"
                icon={<Wallet className="size-5" />}
                hasChildren
                isActive={activeNav === "reimburse"}
                onClick={() => setActiveNav("reimburse")}
              />
            </nav>
          </div>

          {/* Reusable Avatar Component in Profile */}
          <div className="pt-4 mt-6 border-t border-neutral-100 flex items-center gap-3 px-2">
            <Avatar name="Admin Operasional" size="sm" shape="rounded" />
            <div className="flex-1 min-w-0">
              <p className="font-label text-xs font-semibold text-neutral-900 truncate">
                Admin Operasional
              </p>
              <p className="text-[11px] text-neutral-500 font-sans">
                admin@bbj.org
              </p>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between overflow-x-auto">
          <div className="space-y-6">
            {/* Page Header (Node 23:432) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="font-['Gabarito'] font-bold text-2xl sm:text-3xl lg:text-[32px] text-neutral-900 tracking-tight leading-tight">
                  Daftar Donasi
                </h1>
                <p className="font-['Josefin_Sans'] text-sm text-neutral-600">
                  Kelola aksi food rescue, kuota heroes, dan status pengambilan.
                </p>
              </div>

              {/* Reusable Button Component */}
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsAddDialogOpen(true)}
                className="shadow-pop-sm shrink-0"
              >
                <Plus className="size-5" />
                Tambah Donasi
              </Button>
            </div>

            {/* Toolbar (Node 23:446) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Reusable FilterChip Components */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                <FilterChip
                  selected={selectedFilter === "Semua"}
                  onClick={() => setSelectedFilter("Semua")}
                  count={donations.length}
                >
                  Semua
                </FilterChip>
                <FilterChip
                  selected={selectedFilter === "Food Rescue"}
                  onClick={() => setSelectedFilter("Food Rescue")}
                >
                  Food Rescue
                </FilterChip>
                <FilterChip
                  selected={selectedFilter === "CSR"}
                  onClick={() => setSelectedFilter("CSR")}
                >
                  CSR
                </FilterChip>
              </div>

              {/* Reusable Input Components (Search & Date Range matching Node 23:334) */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="w-full sm:w-[260px]">
                  <Input
                    size="sm"
                    placeholder="Cari nama donatur..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    leftIcon={<Search className="size-4 text-neutral-400" />}
                    rightIcon={
                      searchQuery ? (
                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                          aria-label="Hapus pencarian"
                          className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
                        >
                          <X className="size-3.5" />
                        </button>
                      ) : undefined
                    }
                    className="w-full max-w-none text-xs bg-white"
                  />
                </div>

                <div className="w-full sm:w-[170px]">
                  <Input
                    size="sm"
                    placeholder="Dari Tanggal"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    leftIcon={<Calendar className="size-4 text-neutral-400" />}
                    className="w-full max-w-none text-xs bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Reusable Table System (Table, TableHeader, TableRow, TableHead, TableBody, TableCell) */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    sort={sortDirection}
                    onSort={handleToggleSort}
                    className="w-[220px]"
                  >
                    Tanggal
                  </TableHead>
                  <TableHead>Nama Donatur</TableHead>
                  <TableHead align="right" className="w-[120px]">
                    Kuota
                  </TableHead>
                  <TableHead className="w-[160px]">Status</TableHead>
                  <TableHead align="right" className="w-[160px]">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredDonations.length > 0 ? (
                  filteredDonations.map((row) => (
                    <TableRow key={row.id}>
                      {/* Cell 1: Tanggal (Stack) */}
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-label text-sm font-semibold text-neutral-900 leading-5">
                            {row.day}
                          </span>
                          <span className="font-body-s text-xs text-neutral-500 leading-4">
                            {row.date}
                          </span>
                        </div>
                      </TableCell>

                      {/* Cell 2: Nama Donatur */}
                      <TableCell>
                        <span className="font-body-m text-sm text-neutral-900">
                          {row.donor}
                        </span>
                      </TableCell>

                      {/* Cell 3: Kuota */}
                      <TableCell align="right">
                        <span className="font-label text-sm font-semibold text-neutral-900">
                          {row.quota}
                        </span>
                      </TableCell>

                      {/* Cell 4: Reusable Badge Component */}
                      <TableCell>
                        <Badge tone={row.statusTone} styleVariant="soft" dot>
                          {row.status}
                        </Badge>
                      </TableCell>

                      {/* Cell 5: Reusable IconButton Components */}
                      <TableCell align="right">
                        <div className="inline-flex items-center justify-end gap-1">
                          <IconButton
                            size="sm"
                            variant="ghost"
                            aria-label="Lihat detail donasi"
                            onClick={() =>
                              toast.info(
                                `Melihat rincian donasi: ${row.donor} (${row.quota})`,
                              )
                            }
                          >
                            <Eye className="size-4" />
                          </IconButton>

                          <IconButton
                            size="sm"
                            variant="ghost"
                            aria-label="Ubah data donasi"
                            onClick={() =>
                              toast.info(
                                `Membuka form edit donasi: ${row.donor}`,
                              )
                            }
                          >
                            <Pencil className="size-4" />
                          </IconButton>

                          <IconButton
                            size="sm"
                            variant="danger"
                            aria-label="Hapus donasi"
                            onClick={() => setDeleteTargetId(row.id)}
                          >
                            <Trash2 className="size-4" />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center text-sm text-neutral-500"
                    >
                      Tidak ada data donasi yang cocok dengan kriteria filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Reusable Pagination Component */}
          <div className="pt-4 border-t border-neutral-200/60">
            <Pagination
              currentPage={currentPage}
              totalPages={40}
              onPageChange={setCurrentPage}
              rangeText={`1 - 10 dari 392 donasi`}
            />
          </div>
        </main>
      </div>

      {/* Reusable Dialog Component: Tambah Donasi Baru */}
      <Dialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        tone="default"
        title="Tambah Donasi Baru"
        description="Masukkan nama mitra donatur, program penyaluran, serta alokasi kuota porsi."
        confirmText="Simpan Donasi"
        isConfirmLoading={isSubmitting}
        onConfirm={handleAddDonation}
      >
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="font-label text-xs font-semibold text-neutral-700">
              Nama Mitra / Donatur
            </label>
            <Input
              placeholder="Contoh: Hotel Grand Ambarrukmo"
              value={newDonorName}
              onChange={(e) => setNewDonorName(e.target.value)}
              className="h-10 text-xs bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-label text-xs font-semibold text-neutral-700">
                Kategori Program
              </label>
              <select
                value={newCategory}
                onChange={(e) =>
                  setNewCategory(e.target.value as "Food Rescue" | "CSR")
                }
                className="w-full h-10 px-3 rounded-md border border-neutral-300 bg-white font-label text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand"
              >
                <option value="Food Rescue">Food Rescue</option>
                <option value="CSR">CSR</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-label text-xs font-semibold text-neutral-700">
                Kuota (Porsi)
              </label>
              <Input
                placeholder="Misal: 30 / 30"
                value={newQuota}
                onChange={(e) => setNewQuota(e.target.value)}
                className="h-10 text-xs bg-white"
              />
            </div>
          </div>
        </div>
      </Dialog>

      {/* Reusable Dialog Component: Hapus Donasi (Danger Tone) */}
      <Dialog
        isOpen={deleteTargetId !== null}
        onClose={() => setDeleteTargetId(null)}
        tone="danger"
        title="Hapus Data Donasi Ini?"
        description="Donasi yang dihapus tidak dapat dipulihkan kembali dari sistem rekapitulasi food rescue."
        confirmText="Ya, Hapus Donasi"
        isConfirmLoading={isSubmitting}
        onConfirm={handleDeleteConfirm}
      />
    </section>
  );
}
