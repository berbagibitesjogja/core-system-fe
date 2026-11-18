// Teks presentasi dan kamus galat modul Donasi & Penyaluran Makanan dalam Bahasa Indonesia
// prettier-ignore
export const idDonation = {
  list: {
    title: "Donasi",
    subtitle: "Aksi food rescue dan program CSR yang sedang berjalan",
    toasts: {
      deleteSuccess: (donorName: string) => `Donasi untuk ${donorName} berhasil dihapus.`,
      deleteFailed: "Gagal menghapus donasi. Pastikan status donasi masih dalam bentuk draf.",
      cancelSuccess: "Aksi donasi berhasil dibatalkan.",
      cancelFailed: "Gagal membatalkan donasi. Silakan coba lagi.",
      completeSuccess: "Aksi donasi telah ditandai selesai.",
      completeFailed: "Gagal menyelesaikan donasi. Silakan coba lagi.",
      publishSuccess: "Donasi berhasil diumumkan dan dibuka.",
      publishFailed: "Gagal mengumumkan donasi. Silakan periksa kelengkapan data.",
      closeSuccess: "Aksi donasi berhasil ditutup.",
      closeFailed: "Gagal menutup donasi. Silakan coba lagi.",
      reopenSuccess: "Aksi donasi berhasil dibuka kembali.",
      reopenFailed: "Gagal membuka donasi kembali.",
    },
  },
  add: {
    title: "Tambah Donasi",
    subtitle: "Buat aksi food rescue baru",
    toasts: {
      createSuccess: (donorName: string) => `Donasi untuk ${donorName} berhasil ditambahkan!`,
      createFailed: "Gagal menambahkan donasi. Silakan periksa kembali data yang dimasukkan.",
    },
  },
  edit: {
    title: "Edit Donasi",
    subtitle: "Perbarui informasi aksi donasi",
    toasts: {
      updateSuccess: (donorName: string) => `Perubahan donasi ${donorName} berhasil disimpan.`,
      updateFailed: "Gagal menyimpan perubahan donasi. Silakan coba beberapa saat lagi.",
    },
  },
  detail: {
    title: "Detail Donasi",
    subtitle: "Informasi lengkap aksi penyaluran makanan",
    toasts: {
      attendanceAttendedSuccess: "Kehadiran hero berhasil dikonfirmasi (Sudah Diambil).",
      attendanceAbsentSuccess: "Status hero diperbarui menjadi tidak hadir.",
      attendanceFailed: "Gagal memperbarui status kehadiran hero.",
      surplusAddSuccess: "Surplus food berhasil dicatat.",
      surplusUpdateSuccess: "Perubahan surplus food berhasil disimpan.",
      surplusDeleteSuccess: "Surplus food berhasil dihapus.",
    },
  },
  validation: {
    donorRequired: "Pilih donatur / sponsor wajib diisi.",
    quotaPositive: "Kuota harus berupa angka positif minimal 1.",
    pickupDateRequired: "Tanggal pengambilan wajib diisi.",
    locationRequired: "Lokasi pengambilan wajib diisi.",
    mapsUrlRequired: "Link Google Maps wajib diisi.",
    beneficiaryRequired: "Pilih minimal satu kelompok beneficiaries.",
  },
  errors: {
    apiMessages: {
      "Sponsor has been deleted": "Mitra donatur terpilih telah dinonaktifkan atau dihapus dari sistem.",
      "Cannot mark absent before event start": "Pencatatan tidak hadir hanya dapat dilakukan setelah acara penjemputan dimulai.",
      "Attendance window not open": "Konfirmasi kehadiran baru dapat dilakukan 1 jam sebelum jadwal penjemputan dimulai.",
      "You are not eligible for this targeted donation event": "Penerima tidak memenuhi kriteria target aksi donasi ini.",
      "Donation event is not open for reservations": "Aksi donasi sedang tidak membuka kuota pemesanan.",
      "Only draft donations can be deleted": "Hanya donasi berstatus draf yang dapat dihapus dari sistem.",
      "Completed and cancelled donations are immutable": "Donasi yang telah selesai atau dibatalkan tidak dapat diubah lagi.",
      "Cannot set event time in the past for active donation": "Jadwal acara penjemputan tidak boleh berada di masa lalu.",
    },
    errorCodes: {
      QUOTA_BELOW_ACTIVE_CLAIMS: "Kuota tidak boleh lebih kecil dari jumlah voucher yang telah diklaim.",
      ALREADY_CLAIMED: "Hero telah memiliki reservasi aktif untuk donasi ini.",
      CANNOT_MARK_ABSENT_BEFORE_EVENT_START: "Absensi tidak hadir hanya dapat dicatat setelah waktu acara tiba.",
      ATTENDANCE_WINDOW_NOT_OPEN: "Jendela konfirmasi kehadiran baru dibuka 1 jam sebelum jadwal donasi.",
    },
  },
};
