import avatar1Svg from "#/assets/illustrations/avatars/avatar-1.svg";
import avatar2Svg from "#/assets/illustrations/avatars/avatar-2.svg";
import avatar3Svg from "#/assets/illustrations/avatars/avatar-3.svg";
import avatar4Svg from "#/assets/illustrations/avatars/avatar-4.svg";
import avatar5Svg from "#/assets/illustrations/avatars/avatar-5.svg";
import avatar6Svg from "#/assets/illustrations/avatars/avatar-6.svg";
import partner1Svg from "#/assets/illustrations/avatars/partner-1.svg";
import partner2Svg from "#/assets/illustrations/avatars/partner-2.svg";
import partner3Svg from "#/assets/illustrations/avatars/partner-3.svg";
import partner4Svg from "#/assets/illustrations/avatars/partner-4.svg";
import partner5Svg from "#/assets/illustrations/avatars/partner-5.svg";
import partner6Svg from "#/assets/illustrations/avatars/partner-6.svg";

export const PRESET_AVATARS = [
  avatar1Svg,
  avatar2Svg,
  avatar3Svg,
  avatar4Svg,
  avatar5Svg,
  avatar6Svg,
] as const;

export const PARTNER_AVATARS = [
  partner1Svg,
  partner2Svg,
  partner3Svg,
  partner4Svg,
  partner5Svg,
  partner6Svg,
] as const;

const PARTNER_AVATAR_KEYWORD_RULES: ReadonlyArray<{
  keywords: readonly string[];
  src: string;
}> = [
  {
    keywords: [
      "bakery",
      "roti",
      "bread",
      "donut",
      "donuts",
      "pastry",
      "j.co",
      "parsley",
    ],
    src: partner1Svg,
  },
  {
    keywords: [
      "hotel",
      "ambarukmo",
      "tentrem",
      "sheraton",
      "hyatt",
      "artotel",
      "phoenix",
      "eastparc",
      "mercure",
      "melia",
      "novotel",
      "swiss-bel",
      "marriott",
      "suites",
    ],
    src: partner2Svg,
  },
  {
    keywords: ["starbucks", "kopi", "coffee", "cafe", "kafe", "tea"],
    src: partner3Svg,
  },
  {
    keywords: ["komunitas", "yayasan", "sedekah", "peduli", "berbagi"],
    src: partner5Svg,
  },
  {
    keywords: ["ibu ", "bapak ", "pak ", "bu "],
    src: partner6Svg,
  },
];

function computeSeedHash(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash;
}

// Memilih aset avatar preset berdasarkan indeks urutan baris
export function getPresetAvatarByIndex(index: number): string {
  const safeIndex = Math.abs(Math.trunc(index)) % PRESET_AVATARS.length;
  return PRESET_AVATARS[safeIndex];
}

// Memilih aset avatar preset secara deterministik dari string identitas
export function getPresetAvatarSrc(seed: string): string {
  return PRESET_AVATARS[computeSeedHash(seed) % PRESET_AVATARS.length];
}

// Mengembalikan foto profil hero dari data atau preset avatar secara deterministik
export function getHeroAvatarSrc(hero: {
  id?: string;
  name: string;
  avatarSrc?: string;
}): string {
  if (hero.avatarSrc) return hero.avatarSrc;
  const seed = hero.id ? `${hero.id}-${hero.name}` : hero.name;
  return getPresetAvatarSrc(seed);
}

// Memilih foto/logo profil partner berdasarkan kategori usaha atau nama mitra
export function getPartnerAvatarSrc(partner: {
  id?: string;
  name: string;
  type?: string;
  avatarSrc?: string;
}): string {
  if (partner.avatarSrc) return partner.avatarSrc;

  const lowerName = partner.name.trim().toLowerCase();
  const matchedRule = PARTNER_AVATAR_KEYWORD_RULES.find((rule) =>
    rule.keywords.some((keyword) => lowerName.includes(keyword)),
  );
  if (matchedRule) return matchedRule.src;

  if (partner.type === "Individu") {
    return partner6Svg;
  }

  const orgPool = PARTNER_AVATARS.slice(0, 5);
  return orgPool[
    computeSeedHash(lowerName || partner.id || "partner") % orgPool.length
  ];
}
