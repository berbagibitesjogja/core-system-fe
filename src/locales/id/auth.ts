// Teks presentasi dan kamus galat modul Autentikasi dalam Bahasa Indonesia
// prettier-ignore
export const idAuth = {
  login: {
    welcomeTitlePart1: "Selamat datang",
    welcomeTitlePart2: "kembali!",
    leadDescription: "Masuk pakai email atau akun Google yang sudah terdaftar sebagai pengurus untuk melanjutkan aksi berbagimu bersama komunitas BBJ.",
    fields: {
      emailLabel: "Email",
      emailPlaceholder: "nama@email.com",
      emailRequired: "Email wajib diisi",
      emailInvalid: "Format email tidak valid",
      passwordLabel: "Kata sandi",
      passwordPlaceholder: "Masukkan kata sandi",
      passwordRequired: "Kata sandi wajib diisi",
      forgotPassword: "Lupa kata sandi?",
      submitButton: "Masuk",
      submittingButton: "Sedang masuk…",
    },
    alerts: {
      incompleteDataTitle: "Data belum lengkap",
      incompleteDataDescription: "Silakan masukkan email dan kata sandi Anda dengan benar.",
      invalidCredentialsTitle: "Email atau kata sandi salah",
      invalidCredentialsDescription: "Periksa lagi penulisannya, lalu coba masuk.",
      unauthorizedRoleTitle: "Belum punya akses admin",
      unauthorizedRoleDescription: "Akunmu terdaftar, tapi tidak memiliki hak akses sebagai admin. Minta pengurus inti untuk mengubah peranmu.",
      accountDeactivatedTitle: "Akun dinonaktifkan",
      accountDeactivatedDescription: "Akun telah dinonaktifkan. Silakan hubungi Administrator BBJ.",
      emailUnverifiedTitle: "Email belum diverifikasi",
      emailUnverifiedDescription: "Silakan verifikasi email Anda sebelum masuk ke sistem.",
      rateLimitedTitle: "Terlalu banyak percobaan",
      rateLimitedDescription: "Terlalu banyak permintaan. Mohon tunggu beberapa saat sebelum mencoba lagi.",
      sessionExpiredTitle: "Sesi kamu sudah berakhir",
      sessionExpiredDescription: "Demi keamanan, kamu perlu masuk lagi untuk melanjutkan.",
      googleFailedTitle: "Verifikasi akun Google gagal",
      googleFailedDescription: "Silakan coba masuk dengan Google sekali lagi.",
    },
    toasts: {
      alreadyLoggedIn: (name: string) => `Anda sudah login. Selamat datang, ${name}`,
      loginSuccess: (name: string) => `Berhasil masuk! Selamat datang, ${name}`,
      logoutSuccess: "Berhasil keluar dari sistem.",
    },
  },

  // Galat spesifik domain autentikasi, akun, sesi, dan hak akses
  errors: {
    apiMessages: {
      // Kredensial & Status Akun
      "Invalid email or password": "Email atau kata sandi salah. Silakan periksa kembali.",
      "Account has been deactivated. Please contact support.": "Akun telah dinonaktifkan. Silakan hubungi Administrator BBJ.",
      "Account has been deactivated": "Akun telah dinonaktifkan. Silakan hubungi Administrator BBJ.",
      "Please verify your email address before logging in.": "Silakan verifikasi email kamu sebelum masuk ke sistem.",
      "User account no longer exists": "Akun pengguna tidak ditemukan di dalam sistem.",

      // Token Sesi & Autentikasi
      "Missing auth header": "Sesi kamu telah berakhir. Silakan masuk kembali.",
      "Invalid auth header": "Sesi autentikasi tidak valid. Silakan masuk kembali.",
      "Invalid or expired authentication token": "Sesi kamu telah berakhir. Silakan masuk kembali.",
      "Authentication required": "Silakan masuk terlebih dahulu untuk mengakses fitur ini.",
      "Invalid refresh token": "Sesi kamu telah kedaluwarsa. Silakan masuk kembali.",
      "Refresh token has been revoked": "Sesi kamu telah dicabut. Silakan masuk kembali.",
      "Refresh token has expired": "Sesi kamu telah kedaluwarsa. Silakan masuk kembali.",
      "Refresh token is required": "Token sesi tidak ditemukan. Silakan masuk kembali.",

      // Hak Akses & Peran Staf
      "Staff access required": "Halaman atau aksi ini hanya dapat diakses oleh staf BBJ.",
      "Operational division or super admin access required": "Hanya staf operasional atau super admin yang memiliki akses ke fitur ini.",
      "Core or super admin access required": "Hanya tim core atau super admin yang memiliki akses ke fitur ini.",
      "Hero access required": "Fitur ini khusus untuk akun Hero Berbagi Bites Jogja.",

      // Undangan Staf & Registrasi
      "Invalid invitation token": "Tautan undangan tidak valid atau sudah tidak berlaku.",
      "Invitation not found or invalid": "Tautan undangan tidak ditemukan atau sudah tidak valid.",
      "This invitation has expired": "Tautan undangan ini telah kedaluwarsa.",
      "This invitation has already been accepted": "Tautan undangan ini sudah pernah digunakan.",
      "This invitation was issued to a different email address": "Undangan ini ditujukan untuk alamat email yang berbeda.",
      "An active staff user with this email already exists": "Pengurus dengan email ini sudah terdaftar aktif.",
      "A pending invitation for this email already exists": "Undangan untuk email ini masih dalam status menunggu.",
      "An active user with this email already exists": "Email ini sudah terdaftar di dalam sistem.",
      "Core role can only invite Staff members": "Peran Core hanya diperbolehkan mengundang anggota Staff.",
      "Staff members are not permitted to invite users": "Anggota Staff tidak memiliki izin untuk mengundang pengguna baru.",
    } as Record<string, string>,

    errorCodes: {
      UNAUTHORIZED: "Sesi kamu telah berakhir atau kredensial tidak valid. Silakan masuk kembali.",
      INVALID_CREDENTIALS: "Email atau kata sandi salah. Silakan periksa kembali.",
      INVALID_TOKEN: "Token sesi tidak valid atau telah kedaluwarsa. Silakan masuk kembali.",
      FORBIDDEN: "Kamu tidak memiliki izin untuk melakukan tindakan ini.",
      EMAIL_NOT_VERIFIED: "Email kamu belum diverifikasi. Silakan periksa kotak masuk email kamu.",
      VAL_002: "Data sudah terdaftar di dalam sistem.",
      VAL_003: "Undangan untuk email ini masih dalam status menunggu.",
      INVITATION_INVALID: "Undangan tidak valid atau sudah kedaluwarsa.",
      INVITATION_ALREADY_USED: "Undangan ini sudah pernah digunakan.",
      INVITATION_EXPIRED: "Undangan ini telah kedaluwarsa.",
    } as Record<string, string>,
  },
};
