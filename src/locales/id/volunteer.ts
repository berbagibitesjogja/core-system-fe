// Teks presentasi dan kamus galat modul Volunteer / Staff dalam Bahasa Indonesia
// prettier-ignore
export const idVolunteer = {
  list: {
    title: "Volunteer",
    subtitle: "Anggota tim dan relawan Berbagi Bites Jogja",
    toasts: {
      deleteSuccess: (name: string) => `Volunteer "${name}" berhasil dihapus dari sistem.`,
      deleteFailed: "Gagal menghapus volunteer. Silakan coba beberapa saat lagi.",
    },
  },
  add: {
    title: "Tambah Volunteer",
    subtitle: "Daftarkan anggota baru ke dalam sistem BBJ",
    toasts: {
      inviteSuccess: (name: string) => `Undangan untuk "${name}" berhasil dikirim ke email.`,
      inviteFailed: "Gagal mengirimkan undangan. Silakan periksa kembali data yang dimasukkan.",
    },
    alerts: {
      duplicateEmailTitle: "Email sudah terdaftar",
      duplicateEmailDescription: "Email ini sudah terdaftar sebagai pengurus atau memiliki undangan aktif.",
      divisionLoadFailedTitle: "Gagal memuat divisi",
      divisionLoadFailedDescription: "Daftar divisi gagal dimuat dari server. Silakan coba muat ulang.",
    },
  },
  detail: {
    title: "Detail Volunteer",
    subtitle: "Profil dan pengaturan anggota",
    toasts: {
      updateSuccess: (name: string) => `Perubahan data profil "${name}" berhasil disimpan.`,
      updateFailed: "Gagal menyimpan perubahan. Silakan coba beberapa saat lagi.",
      deleteSuccess: (name: string) => `Volunteer "${name}" berhasil dihapus.`,
      deleteFailed: "Gagal menghapus anggota. Silakan periksa izin atau status akun.",
    },
    alerts: {
      lastSuperTitle: "Aksi tidak diizinkan",
      lastSuperDescription: "Tidak dapat menurunkan peran atau menghapus satu-satunya Super Administrator yang tersisa.",
      forbiddenDemoteTitle: "Hak akses tidak mencukupi",
      forbiddenDemoteDescription: "Pengurus Core hanya diizinkan mempromosikan staf ke Core di divisinya sendiri.",
    },
  },

  // Galat spesifik domain staf, hak akses hierarki, dan mutasi peran
  errors: {
    apiMessages: {
      "Cannot demote the only remaining Super Administrator": "Tidak dapat mengubah peran satu-satunya Super Administrator yang tersisa di sistem.",
      "Cannot remove the only remaining Super Administrator": "Tidak dapat menghapus satu-satunya Super Administrator yang tersisa di sistem.",
      "Cannot kick yourself. Use the resign endpoint to step down.": "Tidak dapat menghapus akun sendiri. Gunakan fitur pengunduran diri untuk keluar.",
      "Core members can only promote staff within their own division": "Pengurus Core hanya diperbolehkan mempromosikan anggota di divisinya sendiri.",
      "Only Super Administrators can reassign staff divisions": "Hanya Super Administrator yang memiliki izin memindahkan divisi anggota.",
      "Core members can only promote staff to Core": "Pengurus Core hanya diperbolehkan mempromosikan staf ke peran Core.",
      "Staff member not found": "Data anggota staf tidak ditemukan di dalam sistem.",
      "Invalid staff user ID format": "Format ID anggota tidak valid.",
      "Staff member already has role 'staff'": "Anggota ini sudah memiliki peran Staff.",
      "Staff member already has role 'core'": "Anggota ini sudah memiliki peran Core.",
      "Staff member already has role 'super'": "Anggota ini sudah memiliki peran Super Admin.",
      "division_id must be a valid integer": "ID divisi harus berupa angka yang valid.",
      "Division not found": "Divisi yang dipilih tidak ditemukan di dalam sistem.",
      "Email is already registered as staff": "Email ini sudah terdaftar aktif sebagai pengurus BBJ.",
      "Invitation already pending": "Undangan untuk email ini masih dalam status menunggu konfirmasi.",
      "An active staff user with this email already exists": "Pengurus dengan email ini sudah terdaftar aktif di dalam sistem.",
      "A pending invitation for this email already exists": "Undangan pendaftaran untuk email ini masih dalam status menunggu.",
      "Core role can only invite Staff members": "Peran Core hanya diperbolehkan mengundang anggota dengan tingkat Staff.",
      "Staff members are not permitted to invite users": "Anggota dengan peran Staff tidak memiliki izin untuk mengundang pengguna baru.",
    } as Record<string, string>,

    errorCodes: {
      ROLE_LAST_SUPER: "Tidak dapat mengubah atau menghapus satu-satunya Super Administrator yang tersisa.",
      VAL_002: "Email ini sudah terdaftar sebagai pengurus aktif di dalam sistem.",
      VAL_003: "Undangan untuk email ini masih dalam status menunggu konfirmasi.",
    } as Record<string, string>,
  },
};
