// Kamus galat umum, infrastruktur HTTP, dan fallback sistem dalam Bahasa Indonesia
// prettier-ignore
export const idCommonErrors = {
  apiMessages: {
    // Batas Kecepatan (Rate Limiting)
    "Too many requests, please try again later": "Terlalu banyak permintaan. Mohon tunggu beberapa saat sebelum mencoba lagi.",

    // Validasi & Permintaan
    "Validation failed": "Data yang dimasukkan belum sesuai. Silakan periksa kembali.",
    "Invalid request body": "Format data yang dikirimkan tidak valid.",

    // Sumber Daya Tidak Ditemukan
    "Reimbursement not found": "Data reimbursement tidak ditemukan.",
    "Food item not found": "Data item makanan tidak ditemukan.",
    "Sponsor not found": "Data sponsor tidak ditemukan.",
    "Beneficiary category not found": "Kategori penerima manfaat tidak ditemukan.",
    "Donation not found": "Data donasi tidak ditemukan.",
    "Hero not found": "Data hero tidak ditemukan.",
    "Staff member not found": "Data staf tidak ditemukan.",
  } as Record<string, string>,

  errorCodes: {
    RATE_LIMIT_EXCEEDED: "Terlalu banyak permintaan. Mohon tunggu beberapa saat sebelum mencoba lagi.",
    NOT_FOUND: "Data atau sumber daya yang diminta tidak ditemukan.",
    CONFLICT: "Terjadi konflik data pada sistem. Silakan periksa kembali.",
    VAL_001: "Format data yang dikirimkan tidak valid. Silakan periksa kembali.",
    INTERNAL_ERROR: "Terjadi kendala internal pada server. Silakan coba beberapa saat lagi.",
  } as Record<string, string>,

  httpStatus: {
    400: "Permintaan tidak dapat diproses. Silakan periksa data yang dimasukkan.",
    401: "Email atau kata sandi tidak sesuai, atau sesi telah berakhir.",
    403: "Kamu tidak memiliki izin untuk mengakses fitur ini.",
    404: "Halaman atau data yang dicari tidak ditemukan.",
    409: "Terjadi konflik data pada sistem.",
    410: "Data atau tautan ini sudah tidak berlaku lagi.",
    429: "Terlalu banyak permintaan. Mohon tunggu beberapa saat sebelum mencoba lagi.",
    500: "Terjadi kendala pada server. Tim kami sedang menanganinya.",
    502: "Layanan server backend sedang tidak dapat dihubungi.",
    503: "Layanan sementara tidak tersedia. Silakan coba lagi nanti.",
    504: "Waktu permintaan habis saat menghubungi server backend.",
  } as Record<number, string>,

  defaultMessage: "Terjadi kendala pada sistem. Silakan coba beberapa saat lagi.",
};
