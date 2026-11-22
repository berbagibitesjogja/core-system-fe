// Teks presentasi dan kamus galat modul Profil Pengguna dalam Bahasa Indonesia
// prettier-ignore
export const idProfile = {
  header: {
    title: "Profil Saya",
    subtitle: "Kelola data akun yang sedang kamu pakai",
    backLabel: "Kembali ke Dashboard",
    detailSectionAria: "Detail & Pengaturan Akun",
    navTablistAria: "Navigasi Profil",
  },
  summaryCard: {
    cardAriaLabel: "Ringkasan Profil",
    contactSectionTitle: "Informasi Kontak",
    emailLabel: "Email",
    joinedLabel: "Bergabung",
  },
  tabs: {
    activityLabel: "Aktivitas",
    settingsLabel: "Pengaturan Profil",
  },
  activityTab: {
    title: "Aktivitas saya",
    superAdminBadge: "Khusus Super Admin",
    viewAllLogs: "Lihat semua log",
    mockActivities: [
      { id: "act-1", title: "Masuk ke panel admin", category: "Sistem" as const, timestampLabel: "5 jam yang lalu" },
      { id: "act-2", title: "Menandai reimburse Fauzan selesai", category: "Reimburse" as const, timestampLabel: "Kemarin, 20.14" },
      { id: "act-3", title: "Mengubah role Bima Aditya menjadi Staff", category: "Volunteer" as const, timestampLabel: "7 Nov 2026, 09.30" },
      { id: "act-4", title: "Membuat donasi Holland Bakery", category: "Donasi" as const, timestampLabel: "6 Nov 2026, 15.02" },
      { id: "act-5", title: "Keluar dari panel admin", category: "Sistem" as const, timestampLabel: "5 Nov 2026, 22.47" },
      { id: "act-6", title: "Masuk ke panel admin", category: "Sistem" as const, timestampLabel: "5 Nov 2026, 18.10" },
    ],
  },
  settingsTab: {
    divisionLabel: "Divisi",
    divisionListboxAria: "Pilihan Divisi",
    roleLabel: "Role Sistem",
    roleListboxAria: "Pilihan Role Sistem",
    roleEditableHelper: "Hati-hati: menurunkan role akan membatasi aksesmu.",
    roleLockedHelper: "Hanya Super Admin yang bisa mengubah role.",
    nameLabel: "Nama Lengkap",
    namePlaceholder: "Masukkan nama lengkap",
    emailLabel: "Email",
    emailLockedHelper: "Terhubung dengan akun Google, tidak bisa diubah.",
    whatsappLabel: "Nomor WhatsApp",
    whatsappPlaceholder: "Contoh: 0812-6620-1145",
    saveButton: "Simpan Data Profil",
    savingButton: "Menyimpan...",
  },
  leaveDialog: {
    illustrationAlt: "Ilustrasi ragu tinggalkan halaman",
    title: "Tinggalkan halaman ini?",
    description: "Perubahan data profil kamu belum disimpan dan akan hilang jika keluar sekarang.",
    cancelButton: "Tetap di sini",
    confirmButton: "Keluar tanpa simpan",
  },
  validation: {
    nameRequired: "Nama lengkap wajib diisi.",
    divisionRequired: "Divisi wajib dipilih.",
    whatsappRequired: "Nomor WhatsApp wajib diisi.",
    whatsappInvalid: "Masukkan nomor WhatsApp yang valid (10-14 digit).",
    duplicatePhone: "Nomor WhatsApp ini sudah terdaftar pada akun lain.",
  },
  toasts: {
    updateSuccess: "Data profil berhasil diperbarui",
    updateFailed: "Gagal memperbarui profil. Silakan coba lagi.",
  },
  errors: {
    apiMessages: {} as Record<string, string>,
    errorCodes: {} as Record<string, string>,
  },
};