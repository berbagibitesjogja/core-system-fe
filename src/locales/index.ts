import { idErrors, idLocale } from "./id";
import type { ErrorDictionary, Locale, LocaleDictionary } from "./types";

export const DEFAULT_LOCALE: Locale = "id";

// Mengambil kamus galat terintegrasi untuk bahasa aktif
export function getErrorDictionary(
  _locale: Locale = DEFAULT_LOCALE,
): ErrorDictionary {
  return idErrors;
}

// Mengambil kamus teks lengkap untuk bahasa aktif
export function getLocaleDictionary(
  _locale: Locale = DEFAULT_LOCALE,
): LocaleDictionary {
  return idLocale;
}

// Ekspor langsung kamus galat default untuk kemudahan akses
export const API_MESSAGE_MAP = idErrors.apiMessages;
export const ERROR_CODE_MAP = idErrors.errorCodes;
export const HTTP_STATUS_FALLBACK = idErrors.httpStatus;
export const DEFAULT_ERROR_MESSAGE = idErrors.defaultMessage;

export * from "./types";
export * from "./id";
