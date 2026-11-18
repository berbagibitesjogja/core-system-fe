// Teks presentasi dan kamus galat modul Partner / Donatur (Sponsors) dalam Bahasa Indonesia
// prettier-ignore
export const idPartner = {
  list: {
    title: "Partner",
    subtitle: "Mitra donatur penyumbang makanan Berbagi Bites Jogja",
    toasts: {
      deleteSuccess: (name: string) => `Donatur "${name}" berhasil dihapus dari sistem.`,
      deleteFailed: "Gagal menghapus donatur. Silakan coba beberapa saat lagi.",
      cannotDelete: "Donatur tidak dapat dihapus karena masih terikat dengan donasi aktif.",
    },
  },
  add: {
    title: "Tambah Donatur",
    subtitle: "Daftarkan mitra penyumbang makanan baru",
    toasts: {
      createSuccess: (name: string) => `Donatur "${name}" berhasil ditambahkan ke daftar Partner.`,
      createFailed: "Gagal menambahkan donatur. Silakan periksa kembali data yang dimasukkan.",
    },
    alerts: {
      duplicateNameTitle: "Nama donatur sudah terdaftar",
      duplicateNameDescription: "Nama donatur ini sudah digunakan. Silakan gunakan nama lain atau sertakan nama cabang.",
    },
  },
  edit: {
    title: "Edit Donatur",
    subtitle: "Perbarui profil mitra penyumbang makanan",
    toasts: {
      updateSuccess: (name: string) => `Perubahan data "${name}" berhasil disimpan.`,
      updateFailed: "Gagal menyimpan perubahan. Silakan coba beberapa saat lagi.",
    },
  },
  detail: {
    title: "Detail Donatur",
    subtitle: "Profil dan riwayat donasi mitra",
  },

  // Galat spesifik domain sponsor/partner dari API backend core-system
  errors: {
    apiMessages: {
      "Active sponsor with this name already exists": "Nama donatur/mitra ini sudah terdaftar aktif di dalam sistem.",
      "Sponsor not found": "Data donatur/mitra tidak ditemukan di dalam sistem.",
      "Invalid sponsor ID format": "Format ID donatur tidak valid.",
      "Referenced logo file does not exist": "Berkas logo yang dipilih tidak ditemukan di server.",
      "File not found or not uploaded": "Berkas logo belum selesai diunggah atau tidak valid.",
      "Cannot delete sponsor with active donations": "Donatur masih memiliki riwayat donasi aktif dan tidak dapat dihapus.",
      "sponsor name cannot be empty": "Nama donatur wajib diisi.",
      "sponsor name exceeds maximum length of 150 characters": "Nama donatur melebihi batas maksimal 150 karakter.",
      "invalid sponsor variant: must be 'company' or 'individual'": "Jenis donatur harus berupa Perusahaan atau Individu.",
      "sponsor address exceeds maximum length of 500 characters": "Alamat donatur melebihi batas maksimal 500 karakter.",
      "invalid email address": "Format alamat email tidak valid.",
      "sponsor email exceeds maximum length of 255 characters": "Alamat email donatur melebihi batas maksimal 255 karakter.",
      "sponsor phone exceeds maximum length of 20 characters": "Nomor telepon donatur melebihi batas maksimal 20 karakter.",
    } as Record<string, string>,

    errorCodes: {
      VAL_001: "Format data tidak valid atau berkas logo belum diunggah.",
      VAL_002: "Nama donatur sudah terdaftar atau berkas logo tidak ditemukan.",
      CONFLICT: "Donatur masih terikat dengan donasi aktif dan tidak dapat dihapus.",
    } as Record<string, string>,
  },
};
