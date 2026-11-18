// Teks presentasi dan kamus galat modul Beneficiary (Beneficiary Categories) dalam Bahasa Indonesia
// prettier-ignore
export const idBeneficiary = {
  list: {
    title: "Beneficiary",
    subtitle: "Kelompok penerima manfaat program Berbagi Bites Jogja",
    toasts: {
      deleteSuccess: (name: string) => `Penerima manfaat "${name}" berhasil dihapus dari sistem.`,
      deleteFailed: "Gagal menghapus penerima manfaat. Silakan coba beberapa saat lagi.",
      cannotDelete: "Penerima manfaat tidak dapat dihapus karena masih memiliki riwayat penyaluran aktif.",
    },
  },
  add: {
    title: "Tambah Beneficiary",
    subtitle: "Daftarkan penerima manfaat baru",
    toasts: {
      createSuccess: (name: string) => `Beneficiary "${name}" berhasil ditambahkan ke daftar penerima manfaat.`,
      createFailed: "Gagal menambahkan beneficiary. Silakan coba beberapa saat lagi.",
    },
    alerts: {
      duplicateNameTitle: "Nama beneficiary sudah terdaftar",
      duplicateNameDescription: "Nama penerima manfaat ini sudah digunakan. Silakan gunakan nama resmi lain.",
    },
  },
  edit: {
    title: "Edit Beneficiary",
    subtitle: "Perbarui data penerima manfaat",
    toasts: {
      updateSuccess: (name: string) => `Perubahan beneficiary "${name}" berhasil disimpan.`,
      updateFailed: "Gagal menyimpan perubahan. Silakan coba beberapa saat lagi.",
    },
  },
  detail: {
    title: "Detail Beneficiary",
    subtitle: "Profil dan statistik penyaluran penerima manfaat",
  },
  validation: {
    idRequired: "ID penerima manfaat wajib disertakan.",
    nameRequired: "Nama penerima manfaat wajib diisi.",
  },

  // Galat spesifik domain beneficiary categories dari API backend core-system
  errors: {
    apiMessages: {
      "Invalid variant filter. Allowed: university, kipk, orphanage, nursing_home, shelter, religious_community, foundation, society, other": "Filter jenis kategori tidak valid.",
      "Invalid category ID format": "Format ID penerima manfaat tidak valid.",
      "Beneficiary category not found": "Data penerima manfaat tidak ditemukan di dalam sistem.",
      "Name is required": "Nama penerima manfaat wajib diisi.",
      "Invalid variant. Allowed: university, kipk, orphanage, nursing_home, shelter, religious_community, foundation, society, other": "Jenis kategori penerima manfaat tidak valid.",
      "Email domain can only be set for university variant": "Domain email hanya dapat diatur untuk kategori universitas.",
      "Beneficiary category already exists": "Nama penerima manfaat ini sudah terdaftar aktif di dalam sistem.",
      "Email domain is already registered": "Domain email ini sudah terdaftar pada kategori lain.",
      "Cannot change category variant away from hero-eligible while heroes are actively enrolled in it": "Tidak dapat mengubah jenis kategori karena masih ada Hero aktif yang terdaftar di dalamnya.",
    } as Record<string, string>,

    errorCodes: {
      VAL_001: "Format data penerima manfaat tidak valid atau melanggar aturan kategori.",
      VAL_002: "Nama penerima manfaat atau domain email sudah terdaftar aktif di sistem.",
      NOT_FOUND: "Data penerima manfaat tidak ditemukan di dalam sistem.",
    } as Record<string, string>,
  },
};
