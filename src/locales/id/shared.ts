// Teks presentasi komponen UI bersama (shared components) dalam Bahasa Indonesia
// prettier-ignore
export const idShared = {
  perPageSelector: {
    label: "Per halaman:",
    inputTitle: "Ketik angka per halaman lalu tekan Enter",
    inputAria: "Jumlah baris per halaman",
    buttonTooltip: "Pilih opsi per halaman",
    buttonAria: "Buka opsi jumlah baris per halaman",
  },
  pagination: {
    navAria: "Pagination",
    previousTooltip: "Halaman Sebelumnya",
    previousAria: "Halaman sebelumnya",
    nextTooltip: "Halaman Selanjutnya",
    nextAria: "Halaman selanjutnya",
    pageAria: (page: number) => `Halaman ${page}`,
    defaultRangeText: (currentPage: number | string, totalPages: number | string) => `Halaman ${currentPage} dari ${totalPages}`,
    mobilePageIndicator: (currentPage: number | string, totalPages: number | string) => `Hal ${currentPage} / ${totalPages}`,
    rangeText: (start: number | string, end: number | string, total: number | string) => `Menampilkan ${start} - ${end} dari ${total}`,
  },
  fileUpload: {
    deleteTooltip: "Hapus berkas",
    deleteAria: "Hapus berkas",
    dropzoneRejected: "Berkas ditolak",
    dropzoneAnalyzing: "Menganalisis invoice via AI...",
    dropzoneDragActive: "Lepaskan untuk mengunggah",
    dropzoneDefault: "Klik atau seret berkas ke sini",
    dropzoneRejectedDesc: "Bukan invoice sah atau tidak memuat nominal. Unggah struk yang jelas.",
    dropzoneAnalyzingDesc: "Membaca nominal dari struk, biasanya kurang dari 8 detik",
    progressAria: "Progres analisis invoice",
  },
  googleSignIn: {
    defaultLabel: "Masuk dengan Google",
    verifying: "Memverifikasi akun...",
  },
  emptyState: {
    defaultEmptyDataAlt: "Ilustrasi data kosong",
    defaultNoHistoryAlt: "Ilustrasi belum ada riwayat",
  },
  userProfileMenu: {
    menuAria: (name?: string) => (name ? `Menu profil ${name}` : "Menu profil pengguna"),
    profileLabel: "Lihat Profil",
    settingsLabel: "Pengaturan Akun",
    helpCenterLabel: "Pusat Bantuan",
    logoutLabel: "Keluar",
    activeAccount: "Akun Aktif",
  },
  header: {
    openNavAria: "Buka menu navigasi",
    backButtonAria: "Kembali ke halaman sebelumnya",
    backLabel: "Kembali",
  },
  dialog: {
    cancelButton: "Batal",
    deleteButton: "Hapus",
    saveButton: "Simpan",
  },
  button: {
    defaultLoading: "Menyimpan...",
    defaultChildren: "Simpan",
  },
  tag: {
    deleteAria: "Hapus tag",
  },
  brandName: "Berbagi Bites Jogja",
  pageTitle: "BBJ · Berbagi Bites Jogja",
  userRoles: {
    super: "Super Admin",
    core: "Core Staff",
    staff: "Staff",
  },
  monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
  days: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
  divisions: {
    operationalManager: "Operational Manager",
    it: "IT",
    food: "Food",
    medinfo: "Medinfo",
    bendahara: "Bendahara",
    fund: "Fund",
    volunteer: "Volunteer",
    friend: "Friend",
    logistik: "Logistik",
    distribusi: "Distribusi",
    mediaKemitraan: "Media & Kemitraan",
  },
  logoAlt: "Logo Berbagi Bites Jogja",
  progressBar: {
    defaultLabel: "Progres",
  },
  notFound: {
    description: "Halaman yang Anda cari tidak ditemukan.",
    backToHome: "Kembali ke Beranda",
  },
  landing: {
    title: "Berbagi Bites Jogja",
    description: "Sistem manajemen donasi makanan surplus berbasis komunitas. Selamat datang di portal admin BBJ.",
    dashboardButton: "Dashboard Admin",
    designButton: "Buka Katalog Design System (/design)",
  },
  ui: {
    alert: {
      closeAria: "Tutup alert",
    },
    menu: {
      searchPlaceholder: "Cari menu...",
    },
    carousel: {
      previousAria: "Slide sebelumnya",
      nextAria: "Slide selanjutnya",
      paginationAria: "Navigasi slide carousel",
      slideAria: (index: number) => `Buka slide ${index}`,
    },
    toast: {
      closeAria: "Tutup notifikasi",
    },
    clearSearchTooltip: "Hapus pencarian",
    clearSearchAria: "Hapus pencarian",
    optionalHelper: "Opsional",
  },
  design: {
    copySuccess: "Kode berhasil disalin!",
    backToTop: "Kembali ke atas",
    toTopButton: "Ke Atas",
    backToHome: "Kembali ke Beranda Utama",
  },
  errors: {
    apiMessages: {} as Record<string, string>,
    errorCodes: {} as Record<string, string>,
  },
};
