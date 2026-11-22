// Teks presentasi dan kamus galat modul Dashboard dalam Bahasa Indonesia
// prettier-ignore
export const idDashboard = {
  welcomeBanner: {
    greeting: (name: string) => `Halo, ${name}!`,
    description: "Terima kasih sudah menjaga makanan tetap sampai ke yang membutuhkan. Ini ringkasan dampak kita bersama sejauh ini.",
  },
  impactStats: {
    title: "Dampak Kami",
    subtitle: "Akumulasi sejak BBJ berdiri",
    foodRescueTitle: "Food Rescue",
    foodRescueUnit: "Aksi",
    foodSavedTitle: "Makanan Diselamatkan",
    foodSavedUnit: "Kg",
    totalHeroesTitle: "Total Heroes",
    totalHeroesUnit: "Orang",
    trendMonth: "bulan ini",
  },
  charts: {
    heroesTitle: "Statistik Heroes",
    heroesSubtitle: "Jumlah heroes penerima makanan per bulan",
    foodTitle: "Statistik Makanan",
    foodSubtitle: "Berat makanan yang diselamatkan per bulan",
    timeRangeLast6Months: "6 bulan terakhir",
    unitPeople: "orang",
    unitKg: "Kg",
    comparedToPreviousMonth: "dibanding Oktober",
    trendHeroes: "+9,5%",
    trendFood: "+6,1%",
  },
  recentActivity: {
    title: "Aktivitas Terbaru",
    superAdminBadge: "Khusus Super Admin",
    seeAll: "Lihat Semua",
    emptyTitle: "Belum ada aktivitas",
    emptyDescription: "Belum ada aktivitas tercatat hari ini.",
    emptyAlt: "Belum ada aktivitas",
  },
  quickActions: {
    title: "Aksi Cepat",
    addDonation: "Tambah Donasi",
    addDonationSubtitle: "Catat aksi food rescue baru",
    requestReimburse: "Ajukan Reimburse",
    requestReimburseSubtitle: "Klaim biaya operasional",
    addVolunteer: "Tambah Volunteer",
    addVolunteerSubtitle: "Daftarkan relawan baru",
  },
  errors: {
    apiMessages: {} as Record<string, string>,
    errorCodes: {} as Record<string, string>,
  },
};