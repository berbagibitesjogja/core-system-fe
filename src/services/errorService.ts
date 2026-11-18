import axios from "axios";
import {
  API_MESSAGE_MAP,
  DEFAULT_ERROR_MESSAGE,
  ERROR_CODE_MAP,
  HTTP_STATUS_FALLBACK,
  getErrorDictionary,
} from "#/locales";

interface ApiErrorPayload {
  status?: string;
  code?: string;
  message?: string;
  ref_id?: string;
  errors?: Record<string, Array<string> | string> | Array<string>;
}

interface ApiError extends Error {
  apiErrors?: Record<string, Array<string>>;
  status?: number;
  code?: string;
  refId?: string;
  rawMessage?: string;
}

// Normalisasi struktur galat kolom dari respons backend
const normalizeErrors = (
  rawErrors?: Record<string, Array<string> | string> | Array<string>,
): Record<string, Array<string>> => {
  if (!rawErrors || typeof rawErrors !== "object") {
    return {};
  }

  if (Array.isArray(rawErrors)) {
    return { global: rawErrors.map(String) };
  }

  const normalized: Record<string, Array<string>> = {};
  Object.entries(rawErrors).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      normalized[key] = val.map(String);
    } else if (typeof val === "string") {
      normalized[key] = [val];
    }
  });

  return normalized;
};

// Ekstraksi informasi galat dari respons HTTP menggunakan kamus locales
const extractErrorInfo = (err: unknown, customMessage?: string) => {
  const dict = getErrorDictionary();

  if (axios.isAxiosError<ApiErrorPayload>(err)) {
    const data = err.response?.data;
    const status = err.response?.status ?? 500;
    const code = data?.code;
    const refId = data?.ref_id;
    const rawMessage = data?.message?.trim();
    const errors = normalizeErrors(data?.errors);

    const apiMessages: Record<string, string> = dict.apiMessages;
    const errorCodes: Record<string, string> = dict.errorCodes;
    const httpStatus: Record<number, string> = dict.httpStatus;

    const message =
      customMessage ||
      (rawMessage ? apiMessages[rawMessage] : undefined) ||
      (code ? errorCodes[code] : undefined) ||
      rawMessage ||
      (status ? httpStatus[status] : undefined) ||
      dict.defaultMessage;

    return { message, errors, status, code, refId, rawMessage };
  }

  if (err instanceof Error) {
    return {
      message: customMessage ?? (err.message || dict.defaultMessage),
      errors: {},
      status: 500,
      code: undefined,
      refId: undefined,
      rawMessage: err.message,
    };
  }

  return {
    message: customMessage ?? dict.defaultMessage,
    errors: {},
    status: 500,
    code: undefined,
    refId: undefined,
    rawMessage: undefined,
  };
};

// Penanganan galat API terstandarisasi
const handleApiError = (err: unknown): never => {
  const { message, errors, status, code, refId, rawMessage } =
    extractErrorInfo(err);
  const error: ApiError = new Error(message);
  error.apiErrors = errors;
  error.status = status;
  error.code = code;
  error.refId = refId;
  error.rawMessage = rawMessage;
  throw error;
};

// Penanganan galat API dengan pesan kustom
const handleApiErrorWithMessage = (
  err: unknown,
  customMessage?: string,
): never => {
  const { message, errors, status, code, refId, rawMessage } = extractErrorInfo(
    err,
    customMessage,
  );
  const error: ApiError = new Error(message);
  error.apiErrors = errors;
  error.status = status;
  error.code = code;
  error.refId = refId;
  error.rawMessage = rawMessage;
  throw error;
};

// Memeriksa apakah galat merupakan instance ApiError
const isApiError = (err: unknown): err is ApiError => {
  if (!(err instanceof Error)) return false;
  const candidate = err as ApiError;
  return candidate.status !== undefined && candidate.apiErrors !== undefined;
};

// Mengambil seluruh daftar pesan galat kolom
const getErrorMessages = (err: ApiError): Array<string> => {
  const messages: Array<string> = [];
  const errors = err.apiErrors ?? {};

  Object.values(errors).forEach((fieldErrors) => {
    if (Array.isArray(fieldErrors)) {
      messages.push(...fieldErrors);
    }
  });

  return messages;
};

// Mengambil pesan galat spesifik untuk suatu kolom
const getFieldError = (err: ApiError, field: string): string | undefined => {
  return err.apiErrors?.[field]?.[0];
};

export {
  handleApiError,
  handleApiErrorWithMessage,
  isApiError,
  getErrorMessages,
  getFieldError,
  API_MESSAGE_MAP,
  ERROR_CODE_MAP,
  HTTP_STATUS_FALLBACK,
  DEFAULT_ERROR_MESSAGE,
  type ApiError,
};
