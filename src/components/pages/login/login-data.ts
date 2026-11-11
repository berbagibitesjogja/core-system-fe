import avatar1Svg from "#/assets/illustrations/avatars/avatar-1.svg";
import avatar2Svg from "#/assets/illustrations/avatars/avatar-2.svg";
import avatar3Svg from "#/assets/illustrations/avatars/avatar-3.svg";
import avatar4Svg from "#/assets/illustrations/avatars/avatar-4.svg";
import avatar5Svg from "#/assets/illustrations/avatars/avatar-5.svg";
import avatar6Svg from "#/assets/illustrations/avatars/avatar-6.svg";

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

export interface ShowcaseAvatar {
  src: string;
  name: string;
  alt: string;
}

export interface ShowcaseSlideConfig {
  id: string;
  badgeTop: {
    iconType: "leaf" | "calendar" | "heart";
    bgClass: string;
    label: string;
    value: string;
    ariaLabel: string;
  };
  badgeBottom: {
    avatars: ShowcaseAvatar[];
    label: string;
    value: string;
    ariaLabel: string;
  };
  titlePart1: string;
  titlePart2: string;
  description: string;
}

export const DEFAULT_LOGIN_SLIDES: ShowcaseSlideConfig[] = [
  {
    id: "slide-food-rescue",
    badgeTop: {
      iconType: "leaf",
      bgClass: "bg-brand",
      label: "Makanan terselamatkan",
      value: "3.000+ Kg",
      ariaLabel: "Statistik makanan terselamatkan: lebih dari 3.000 kilogram",
    },
    badgeBottom: {
      avatars: [
        { src: avatar1Svg, name: "Fajar Ramadhan", alt: "Ilustrasi Relawan 1" },
        { src: avatar2Svg, name: "Anisa Nurul", alt: "Ilustrasi Relawan 2" },
        { src: avatar3Svg, name: "Dimas Saputra", alt: "Ilustrasi Relawan 3" },
      ],
      label: "Heroes terbantu",
      value: "15.400",
      ariaLabel: "Statistik heroes terbantu: 14.933 orang",
    },
    titlePart1: "Bersama, kita selamatkan",
    titlePart2: "lebih banyak makanan",
    description:
      "Setiap login membawamu lebih dekat dengan aksi berbagi di Jogja.",
  },
  {
    id: "slide-distribution",
    badgeTop: {
      iconType: "calendar",
      bgClass: "bg-amber-600",
      label: "Perjalanan Aksi",
      value: "> 2 Tahun",
      ariaLabel: "Statistik perjalanan aksi: lebih dari 2 tahun",
    },
    badgeBottom: {
      avatars: [
        { src: avatar4Svg, name: "Rina Astuti", alt: "Ilustrasi Mitra 1" },
        { src: avatar5Svg, name: "Made Tirta", alt: "Ilustrasi Mitra 2" },
        { src: avatar6Svg, name: "Kevin Pratama", alt: "Ilustrasi Mitra 3" },
      ],
      label: "Mitra Donatur",
      value: "20+ Mitra",
      ariaLabel: "Statistik mitra donatur: lebih dari 20 mitra",
    },
    titlePart1: "Distribusi Cepat &",
    titlePart2: "Tepat Sasaran",
    description:
      "Menjangkau panti asuhan, kaum dhuafa, dan pejuang nafkah di seluruh Yogyakarta.",
  },
  {
    id: "slide-collaboration",
    badgeTop: {
      iconType: "heart",
      bgClass: "bg-emerald-600",
      label: "Dampak Sosial",
      value: "100% Nyata",
      ariaLabel: "Statistik dampak sosial: 100% nyata",
    },
    badgeBottom: {
      avatars: [
        { src: avatar2Svg, name: "Bunga Berlian", alt: "Ilustrasi Relawan 1" },
        { src: avatar1Svg, name: "Yoga Kurnia", alt: "Ilustrasi Relawan 2" },
        { src: avatar3Svg, name: "Intan Dewi", alt: "Ilustrasi Relawan 3" },
      ],
      label: "Relawan Aktif",
      value: "100+ Relawan",
      ariaLabel: "Statistik relawan aktif: lebih dari 100 relawan",
    },
    titlePart1: "Kolaborasi Komunitas &",
    titlePart2: "Mitra Makanan",
    description:
      "Bersama kurangi food waste dan tebarkan senyum kebaikan setiap hari.",
  },
];

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
