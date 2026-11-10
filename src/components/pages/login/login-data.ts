export type LoginState =
  | "default"
  | "loading"
  | "salah-kata-sandi"
  | "belum-terdaftar"
  | "role-tidak-berwenang"
  | "sesi-habis"
  | "verifikasi-google-gagal";

export interface LoginAlertConfig {
  tone: "danger" | "warning" | "info" | "success";
  title: string;
  description: string;
}

// Konfigurasi template alert response sesuai spesifikasi Figma (node 108:524, 108:936, 108:1315, 108:1696, 108:2077)
export const LOGIN_STATE_ALERTS: Partial<Record<LoginState, LoginAlertConfig>> =
  {
    "salah-kata-sandi": {
      tone: "danger",
      title: "Email atau kata sandi salah",
      description: "Periksa lagi penulisannya, lalu coba masuk.",
    },
    "belum-terdaftar": {
      tone: "danger",
      title: "Akun belum terdaftar",
      description:
        "Akun ini belum terdaftar di database Berbagi Bites Jogja, jadi akses ditolak. Hubungi Administrator BBJ untuk didaftarkan.",
    },
    "role-tidak-berwenang": {
      tone: "warning",
      title: "Belum punya akses admin",
      description:
        "Akunmu terdaftar, tapi tidak memiliki hak akses sebagai admin. Minta pengurus inti untuk mengubah peranmu.",
    },
    "sesi-habis": {
      tone: "info",
      title: "Sesi kamu sudah berakhir",
      description: "Demi keamanan, kamu perlu masuk lagi untuk melanjutkan.",
    },
    "verifikasi-google-gagal": {
      tone: "danger",
      title: "Verifikasi akun Google gagal",
      description: "Silakan coba masuk dengan Google sekali lagi.",
    },
  };
