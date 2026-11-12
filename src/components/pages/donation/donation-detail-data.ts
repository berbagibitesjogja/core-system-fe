import { defaultDonations } from "./donation-data";
import type { DonationItem, DonationProgram } from "./donation-data";

export type DonationHeroPickupStatus = "sudah-diambil" | "belum-diambil";
export type DonationSurplusUnit = "gr" | "ml";

export interface DonationHeroClaimRecord {
  id: string;
  heroId: string;
  name: string;
  sectorName: string;
  beneficiaryName: string;
  status: DonationHeroPickupStatus;
  claimedAt?: string;
}

export interface DonationHeroSearchOption {
  id: string;
  name: string;
  sectorName: string;
  beneficiaryName: string;
  isBlocked: boolean;
}

export interface DonationSurplusFoodItem {
  id: string;
  name: string;
  quantity?: number;
  weight: number;
  unit: DonationSurplusUnit;
  isSpoiled: boolean;
  notes?: string;
}

export interface DonationDetailRecord {
  id: string;
  donorName: string;
  donorInitials: string;
  date: string;
  day: string;
  dateIso: string;
  program: DonationProgram;
  status: DonationItem["status"];
  quotaTotal: number;
  location: string;
  documentationUrl?: string;
  notes: string;
  heroes: DonationHeroClaimRecord[];
  surplusFoods: DonationSurplusFoodItem[];
}

export interface DonationSurplusFormValues {
  name: string;
  quantity?: number;
  weight: number;
  unit: DonationSurplusUnit;
  isSpoiled: boolean;
  notes: string;
}

export const defaultSearchableHeroPool: DonationHeroSearchOption[] = [
  {
    id: "hero-cand-1",
    name: "Nadia Putri",
    sectorName: "Sektor Sleman",
    beneficiaryName: "Panti Asuhan Harapan",
    isBlocked: false,
  },
  {
    id: "hero-cand-2",
    name: "Nadhif Akbar",
    sectorName: "Sektor Utara",
    beneficiaryName: "Rumah Singgah Harmoni",
    isBlocked: false,
  },
  {
    id: "hero-cand-3",
    name: "Nadya Kirana",
    sectorName: "Sektor Kota",
    beneficiaryName: "Komunitas Lansia Berkah",
    isBlocked: false,
  },
  {
    id: "hero-cand-4",
    name: "Nadine Azzahra",
    sectorName: "Sektor Bantul",
    beneficiaryName: "Yayasan Cahaya Bangsa",
    isBlocked: true,
  },
  {
    id: "hero-cand-5",
    name: "Fajar Pratama",
    sectorName: "Sektor Kota",
    beneficiaryName: "Panti Asuhan Harapan",
    isBlocked: false,
  },
  {
    id: "hero-cand-6",
    name: "Dewi Lestari",
    sectorName: "Sektor Selatan",
    beneficiaryName: "Komunitas Lansia Sejahtera",
    isBlocked: false,
  },
  {
    id: "hero-cand-7",
    name: "Bagas Saputra",
    sectorName: "Sektor Barat",
    beneficiaryName: "Sekolah Rakyat Mandiri",
    isBlocked: false,
  },
];

const hollandBakeryHeroes: DonationHeroClaimRecord[] = [
  {
    id: "claim-1",
    heroId: "hero-1",
    name: "Ahmad Fauzi",
    sectorName: "Sektor Utara",
    beneficiaryName: "Panti Asuhan Harapan",
    status: "sudah-diambil",
    claimedAt: "16:10 WIB",
  },
  {
    id: "claim-2",
    heroId: "hero-2",
    name: "Siti Aminah",
    sectorName: "Sektor Selatan",
    beneficiaryName: "Rumah Singgah Harmoni",
    status: "sudah-diambil",
    claimedAt: "16:18 WIB",
  },
  {
    id: "claim-3",
    heroId: "hero-3",
    name: "Rizky Ramadhan",
    sectorName: "Sektor Kota",
    beneficiaryName: "Komunitas Lansia Berkah",
    status: "belum-diambil",
  },
  {
    id: "claim-4",
    heroId: "hero-4",
    name: "Putri Maharani",
    sectorName: "Sektor Sleman",
    beneficiaryName: "Yayasan Cahaya Bangsa",
    status: "sudah-diambil",
    claimedAt: "16:25 WIB",
  },
  {
    id: "claim-5",
    heroId: "hero-5",
    name: "Dimas Kurniawan",
    sectorName: "Sektor Bantul",
    beneficiaryName: "Sekolah Rakyat Mandiri",
    status: "belum-diambil",
  },
  {
    id: "claim-6",
    heroId: "hero-6",
    name: "Ayu Lestari",
    sectorName: "Sektor Timur",
    beneficiaryName: "Panti Asuhan Harapan",
    status: "sudah-diambil",
    claimedAt: "16:32 WIB",
  },
  {
    id: "claim-7",
    heroId: "hero-7",
    name: "Budi Santoso",
    sectorName: "Sektor Utara",
    beneficiaryName: "Panti Asuhan Harapan",
    status: "sudah-diambil",
  },
  {
    id: "claim-8",
    heroId: "hero-8",
    name: "Anisa Rahma",
    sectorName: "Sektor Kota",
    beneficiaryName: "Rumah Singgah Harmoni",
    status: "sudah-diambil",
  },
  {
    id: "claim-9",
    heroId: "hero-9",
    name: "Hendra Wijaya",
    sectorName: "Sektor Sleman",
    beneficiaryName: "Komunitas Lansia Berkah",
    status: "sudah-diambil",
  },
  {
    id: "claim-10",
    heroId: "hero-10",
    name: "Nadia Putri",
    sectorName: "Sektor Sleman",
    beneficiaryName: "Panti Asuhan Harapan",
    status: "sudah-diambil",
  },
  {
    id: "claim-11",
    heroId: "hero-11",
    name: "Bayu Setiawan",
    sectorName: "Sektor Barat",
    beneficiaryName: "Yayasan Cahaya Bangsa",
    status: "belum-diambil",
  },
  {
    id: "claim-12",
    heroId: "hero-12",
    name: "Citra Dewi",
    sectorName: "Sektor Selatan",
    beneficiaryName: "Rumah Singgah Harmoni",
    status: "sudah-diambil",
  },
  {
    id: "claim-13",
    heroId: "hero-13",
    name: "Eko Prasetyo",
    sectorName: "Sektor Timur",
    beneficiaryName: "Sekolah Rakyat Mandiri",
    status: "sudah-diambil",
  },
  {
    id: "claim-14",
    heroId: "hero-14",
    name: "Fitri Handayani",
    sectorName: "Sektor Kota",
    beneficiaryName: "Panti Asuhan Harapan",
    status: "belum-diambil",
  },
  {
    id: "claim-15",
    heroId: "hero-15",
    name: "Gilang Permana",
    sectorName: "Sektor Utara",
    beneficiaryName: "Komunitas Lansia Berkah",
    status: "sudah-diambil",
  },
  {
    id: "claim-16",
    heroId: "hero-16",
    name: "Intan Sari",
    sectorName: "Sektor Sleman",
    beneficiaryName: "Yayasan Cahaya Bangsa",
    status: "sudah-diambil",
  },
  {
    id: "claim-17",
    heroId: "hero-17",
    name: "Joko Susilo",
    sectorName: "Sektor Bantul",
    beneficiaryName: "Rumah Singgah Harmoni",
    status: "sudah-diambil",
  },
  {
    id: "claim-18",
    heroId: "hero-18",
    name: "Kartika Sari",
    sectorName: "Sektor Kota",
    beneficiaryName: "Panti Asuhan Harapan",
    status: "sudah-diambil",
  },
  {
    id: "claim-19",
    heroId: "hero-19",
    name: "Lukman Hakim",
    sectorName: "Sektor Barat",
    beneficiaryName: "Sekolah Rakyat Mandiri",
    status: "belum-diambil",
  },
  {
    id: "claim-20",
    heroId: "hero-20",
    name: "Maya Kusuma",
    sectorName: "Sektor Selatan",
    beneficiaryName: "Komunitas Lansia Berkah",
    status: "sudah-diambil",
  },
  {
    id: "claim-21",
    heroId: "hero-21",
    name: "Naufal Aziz",
    sectorName: "Sektor Timur",
    beneficiaryName: "Yayasan Cahaya Bangsa",
    status: "sudah-diambil",
  },
  {
    id: "claim-22",
    heroId: "hero-22",
    name: "Rina Amelia",
    sectorName: "Sektor Utara",
    beneficiaryName: "Panti Asuhan Harapan",
    status: "sudah-diambil",
  },
];

const hollandBakerySurplusFoods: DonationSurplusFoodItem[] = [
  {
    id: "food-1",
    name: "Roti Manis",
    quantity: 48,
    weight: 2800,
    unit: "gr",
    isSpoiled: false,
    notes: "Varian cokelat dan keju, kemasan satuan rapat",
  },
  {
    id: "food-2",
    name: "Donat Gula",
    quantity: 30,
    weight: 1650,
    unit: "gr",
    isSpoiled: false,
    notes: "Masih lembut, disarankan dikonsumsi hari ini",
  },
  {
    id: "food-3",
    name: "Croissant Butter",
    quantity: 20,
    weight: 1400,
    unit: "gr",
    isSpoiled: false,
    notes: "Disimpan di kotak kardus bersih",
  },
  {
    id: "food-4",
    name: "Susu UHT",
    quantity: 24,
    weight: 2400,
    unit: "ml",
    isSpoiled: false,
    notes: "Kemasan kotak 100 ml, suhu ruang",
  },
  {
    id: "food-5",
    name: "Roti Tawar",
    quantity: 8,
    weight: 1850,
    unit: "gr",
    isSpoiled: true,
    notes: "Tekstur mengeras dan berjamur di bagian pinggir",
  },
];

const donationLocationMap: Record<string, string> = {
  "donasi-1": "Jl. Adi Sucipto No. 42, Sleman",
  "donasi-2": "Jl. Malioboro No. 52-58, Yogyakarta",
  "donasi-3": "Jl. Laksda Adisucipto No. 81, Sleman",
  "donasi-4": "Jl. P. Mangkubumi No. 72A, Yogyakarta",
  "donasi-5": "Jl. Magelang KM 6.5, Sleman",
  "donasi-6": "Jl. Jend. Sudirman No. 89, Yogyakarta",
  "donasi-7": "Jl. P. Mangkubumi No. 72A, Yogyakarta",
  "donasi-8": "Jl. FM Noto No. 7, Kotabaru, Yogyakarta",
  "donasi-9": "Jl. Prawirotaman No. 32, Yogyakarta",
  "donasi-10": "Jl. KHA Dahlan No. 107, Yogyakarta",
};

// Menghitung total berat layak konsumsi dalam kilogram atau liter ekuivalen
export function calculateSurplusSummary(foods: DonationSurplusFoodItem[]) {
  const totalGramsAll = foods.reduce((acc, item) => acc + item.weight, 0);
  const eligibleItems = foods.filter((item) => !item.isSpoiled);
  const spoiledItems = foods.filter((item) => item.isSpoiled);
  const eligibleGrams = eligibleItems.reduce(
    (acc, item) => acc + item.weight,
    0,
  );

  return {
    totalItems: foods.length,
    eligibleCount: eligibleItems.length,
    spoiledCount: spoiledItems.length,
    totalKgNumber: Number((totalGramsAll / 1000).toFixed(1)),
    eligibleKgNumber: Number((eligibleGrams / 1000).toFixed(1)),
    totalWeightFormatted: `${(totalGramsAll / 1000).toFixed(1)} kg`,
  };
}

// Memformat tanggal ringkas untuk poster (misal: "10 Nov 2026")
export function formatShortPosterDate(fullDate: string): string {
  const months: Record<string, string> = {
    Januari: "Jan",
    Februari: "Feb",
    Maret: "Mar",
    April: "Apr",
    Mei: "Mei",
    Juni: "Jun",
    Juli: "Jul",
    Agustus: "Agt",
    September: "Sep",
    Oktober: "Okt",
    November: "Nov",
    Desember: "Des",
  };
  const parts = fullDate.split(" ");
  if (parts.length !== 3) return fullDate;
  return `${parts[0]} ${months[parts[1]] ?? parts[1]} ${parts[2]}`;
}

// Mengambil detail donasi berdasarkan ID serta dukungan mode kosong untuk pratinjau
export function getDonationDetailById(
  id?: string,
  stateMode: "default" | "empty" = "default",
): DonationDetailRecord {
  const baseItem =
    defaultDonations.find((item) => item.id === id) ?? defaultDonations[0];

  const isEmpty = stateMode === "empty" || baseItem.quotaClaimed === 0;

  if (isEmpty) {
    return {
      id: baseItem.id,
      donorName: baseItem.donorName,
      donorInitials: baseItem.initials,
      date: baseItem.date,
      day: baseItem.day,
      dateIso: baseItem.isoDate,
      program: baseItem.program,
      status: baseItem.status,
      quotaTotal: baseItem.quotaTotal,
      location:
        donationLocationMap[baseItem.id] ?? "Area Distribusi BBJ Yogyakarta",
      documentationUrl: "https://drive.google.com",
      notes: "",
      heroes: [],
      surplusFoods: [],
    };
  }

  if (baseItem.id === "donasi-1") {
    return {
      id: baseItem.id,
      donorName: baseItem.donorName,
      donorInitials: baseItem.initials,
      date: baseItem.date,
      day: baseItem.day,
      dateIso: baseItem.isoDate,
      program: baseItem.program,
      status: baseItem.status,
      quotaTotal: baseItem.quotaTotal,
      location: donationLocationMap["donasi-1"],
      documentationUrl: "https://drive.google.com",
      notes:
        "Penjemputan berlangsung lancar pukul 16.00 WIB. Seluruh roti dikemas ulang oleh tim relawan sebelum disalurkan ke titik penerima.",
      heroes: hollandBakeryHeroes,
      surplusFoods: hollandBakerySurplusFoods,
    };
  }

  // Menghasilkan data realistis untuk donasi lain pada daftar
  const targetHeroCount = Math.min(
    Math.max(baseItem.quotaClaimed, 1),
    hollandBakeryHeroes.length,
  );
  const slicedHeroes = hollandBakeryHeroes
    .slice(0, targetHeroCount)
    .map((hero, idx) => ({
      ...hero,
      id: `${baseItem.id}-claim-${idx + 1}`,
      status:
        baseItem.status === "Selesai" || idx % 3 !== 2
          ? ("sudah-diambil" as const)
          : ("belum-diambil" as const),
    }));

  const fallbackFoods: DonationSurplusFoodItem[] =
    baseItem.program === "CSR"
      ? [
          {
            id: `${baseItem.id}-food-1`,
            name: "Nasi Kotak Ayam Bakar",
            quantity: 45,
            weight: 15750,
            unit: "gr",
            isSpoiled: false,
            notes: "Sudah dilengkapi alat makan dan air mineral",
          },
          {
            id: `${baseItem.id}-food-2`,
            name: "Air Mineral Gelas",
            quantity: 48,
            weight: 11520,
            unit: "ml",
            isSpoiled: false,
            notes: "2 dus kemasan baru",
          },
          {
            id: `${baseItem.id}-food-3`,
            name: "Buah Pisang Cavendish",
            quantity: 30,
            weight: 3600,
            unit: "gr",
            isSpoiled: false,
          },
        ]
      : [
          {
            id: `${baseItem.id}-food-1`,
            name: "Paket Hidangan Prasmanan",
            quantity: 25,
            weight: 8500,
            unit: "gr",
            isSpoiled: false,
            notes: "Ditempatkan dalam food container tertutup",
          },
          {
            id: `${baseItem.id}-food-2`,
            name: "Aneka Pastry & Kue Basah",
            quantity: 36,
            weight: 2150,
            unit: "gr",
            isSpoiled: false,
          },
          {
            id: `${baseItem.id}-food-3`,
            name: "Salad Buah Segar",
            quantity: 6,
            weight: 1200,
            unit: "gr",
            isSpoiled: true,
            notes: "Saus terpisah namun buah sudah berubah warna",
          },
        ];

  return {
    id: baseItem.id,
    donorName: baseItem.donorName,
    donorInitials: baseItem.initials,
    date: baseItem.date,
    day: baseItem.day,
    dateIso: baseItem.isoDate,
    program: baseItem.program,
    status: baseItem.status,
    quotaTotal: baseItem.quotaTotal,
    location:
      donationLocationMap[baseItem.id] ?? "Area Distribusi BBJ Yogyakarta",
    documentationUrl: "https://drive.google.com",
    notes:
      "Koordinasi dengan PIC donatur berjalan baik sesuai jadwal penjemputan.",
    heroes: slicedHeroes,
    surplusFoods: fallbackFoods,
  };
}
