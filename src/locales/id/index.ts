import { idAuth } from "./auth";
import { idCommonErrors } from "./errors";

// Menggabungkan seluruh pesan galat dari modul fitur dan galat umum
export const idErrors = {
  apiMessages: {
    ...idCommonErrors.apiMessages,
    ...idAuth.errors.apiMessages,
  },
  errorCodes: {
    ...idCommonErrors.errorCodes,
    ...idAuth.errors.errorCodes,
  },
  httpStatus: idCommonErrors.httpStatus,
  defaultMessage: idCommonErrors.defaultMessage,
};

export const idLocale = {
  errors: idErrors,
  auth: idAuth,
  commonErrors: idCommonErrors,
};

export { idAuth, idCommonErrors };
