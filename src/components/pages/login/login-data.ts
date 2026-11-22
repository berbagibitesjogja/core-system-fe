import avatar1Svg from "#/assets/illustrations/avatars/avatar-1.svg";
import avatar2Svg from "#/assets/illustrations/avatars/avatar-2.svg";
import avatar3Svg from "#/assets/illustrations/avatars/avatar-3.svg";
import avatar4Svg from "#/assets/illustrations/avatars/avatar-4.svg";
import avatar5Svg from "#/assets/illustrations/avatars/avatar-5.svg";
import avatar6Svg from "#/assets/illustrations/avatars/avatar-6.svg";
import { idAuth } from "#/locales/id/auth";

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
      label: idAuth.login.showcase.slide1BadgeTopLabel,
      value: "3.000+ Kg",
      ariaLabel: idAuth.login.showcase.slide1BadgeTopAria,
    },
    badgeBottom: {
      avatars: [
        {
          src: avatar1Svg,
          name: "Fajar Ramadhan",
          alt: idAuth.login.showcase.volunteerPhotoAltIndex(1),
        },
        {
          src: avatar2Svg,
          name: "Anisa Nurul",
          alt: idAuth.login.showcase.volunteerPhotoAltIndex(2),
        },
        {
          src: avatar3Svg,
          name: "Dimas Saputra",
          alt: idAuth.login.showcase.volunteerPhotoAltIndex(3),
        },
      ],
      label: idAuth.login.showcase.slide1BadgeBottomLabel,
      value: "15.400",
      ariaLabel: idAuth.login.showcase.slide1BadgeBottomAria,
    },
    titlePart1: idAuth.login.showcase.slide1TitlePart1,
    titlePart2: idAuth.login.showcase.slide1TitlePart2,
    description: idAuth.login.showcase.slide1Description,
  },
  {
    id: "slide-distribution",
    badgeTop: {
      iconType: "calendar",
      bgClass: "bg-amber-600",
      label: idAuth.login.showcase.slide2BadgeTopLabel,
      value: "> 2 Tahun",
      ariaLabel: idAuth.login.showcase.slide2BadgeTopAria,
    },
    badgeBottom: {
      avatars: [
        {
          src: avatar4Svg,
          name: "Rina Astuti",
          alt: idAuth.login.showcase.partnerPhotoAltIndex(1),
        },
        {
          src: avatar5Svg,
          name: "Made Tirta",
          alt: idAuth.login.showcase.partnerPhotoAltIndex(2),
        },
        {
          src: avatar6Svg,
          name: "Kevin Pratama",
          alt: idAuth.login.showcase.partnerPhotoAltIndex(3),
        },
      ],
      label: idAuth.login.showcase.slide2BadgeBottomLabel,
      value: idAuth.login.showcase.partnersCountValue,
      ariaLabel: idAuth.login.showcase.slide2BadgeBottomAria,
    },
    titlePart1: idAuth.login.showcase.slide2TitlePart1,
    titlePart2: idAuth.login.showcase.slide2TitlePart2,
    description: idAuth.login.showcase.slide2Description,
  },
  {
    id: "slide-collaboration",
    badgeTop: {
      iconType: "heart",
      bgClass: "bg-emerald-600",
      label: idAuth.login.showcase.slide3BadgeTopLabel,
      value: "100% Nyata",
      ariaLabel: idAuth.login.showcase.slide3BadgeTopAria,
    },
    badgeBottom: {
      avatars: [
        {
          src: avatar2Svg,
          name: "Bunga Berlian",
          alt: idAuth.login.showcase.volunteerPhotoAltIndex(1),
        },
        {
          src: avatar1Svg,
          name: "Yoga Kurnia",
          alt: idAuth.login.showcase.volunteerPhotoAltIndex(2),
        },
        {
          src: avatar3Svg,
          name: "Intan Dewi",
          alt: idAuth.login.showcase.volunteerPhotoAltIndex(3),
        },
      ],
      label: idAuth.login.showcase.slide3BadgeBottomLabel,
      value: idAuth.login.showcase.volunteersCountValue,
      ariaLabel: idAuth.login.showcase.slide3BadgeBottomAria,
    },
    titlePart1: idAuth.login.showcase.slide3TitlePart1,
    titlePart2: idAuth.login.showcase.slide3TitlePart2,
    description: idAuth.login.showcase.slide3Description,
  },
];

// Konfigurasi template alert response sesuai spesifikasi Figma (node 108:524, 108:936, 108:1315, 108:1696, 108:2077)
export const LOGIN_STATE_ALERTS: Partial<Record<LoginState, LoginAlertConfig>> =
  {
    "salah-kata-sandi": {
      tone: "danger",
      title: idAuth.login.alerts.invalidCredentialsTitle,
      description: idAuth.login.alerts.invalidCredentialsDescription,
    },
    "belum-terdaftar": {
      tone: "danger",
      title: idAuth.login.alerts.unregisteredAccountTitle,
      description: idAuth.login.alerts.unregisteredAccountDescription,
    },
    "role-tidak-berwenang": {
      tone: "warning",
      title: idAuth.login.alerts.unauthorizedRoleTitle,
      description: idAuth.login.alerts.unauthorizedRoleDescription,
    },
    "sesi-habis": {
      tone: "info",
      title: idAuth.login.alerts.sessionExpiredTitle,
      description: idAuth.login.alerts.sessionExpiredDescription,
    },
    "verifikasi-google-gagal": {
      tone: "danger",
      title: idAuth.login.alerts.googleFailedTitle,
      description: idAuth.login.alerts.googleFailedDescription,
    },
  };
