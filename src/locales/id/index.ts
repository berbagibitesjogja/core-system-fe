import { idAuth } from "./auth";
import { idCommonErrors } from "./errors";
import { idNavigation } from "./navigation";
import { idVolunteer } from "./volunteer";

// Menggabungkan seluruh pesan galat dari modul fitur dan galat umum
export const idErrors = {
  apiMessages: {
    ...idCommonErrors.apiMessages,
    ...idAuth.errors.apiMessages,
    ...idVolunteer.errors.apiMessages,
  },
  errorCodes: {
    ...idCommonErrors.errorCodes,
    ...idAuth.errors.errorCodes,
    ...idVolunteer.errors.errorCodes,
  },
  httpStatus: idCommonErrors.httpStatus,
  defaultMessage: idCommonErrors.defaultMessage,
};

export const idLocale = {
  errors: idErrors,
  auth: idAuth,
  commonErrors: idCommonErrors,
  navigation: idNavigation,
  volunteer: idVolunteer,
};

export { idAuth, idCommonErrors, idNavigation, idVolunteer };
