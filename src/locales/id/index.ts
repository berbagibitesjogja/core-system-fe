import { idAuth } from "./auth";
import { idBeneficiary } from "./beneficiary";
import { idCommonErrors } from "./errors";
import { idNavigation } from "./navigation";
import { idPartner } from "./partner";
import { idVolunteer } from "./volunteer";

// Menggabungkan seluruh pesan galat dari modul fitur dan galat umum
export const idErrors = {
  apiMessages: {
    ...idCommonErrors.apiMessages,
    ...idAuth.errors.apiMessages,
    ...idVolunteer.errors.apiMessages,
    ...idPartner.errors.apiMessages,
    ...idBeneficiary.errors.apiMessages,
  },
  errorCodes: {
    ...idCommonErrors.errorCodes,
    ...idAuth.errors.errorCodes,
    ...idVolunteer.errors.errorCodes,
    ...idPartner.errors.errorCodes,
    ...idBeneficiary.errors.errorCodes,
  },
  httpStatus: idCommonErrors.httpStatus,
  defaultMessage: idCommonErrors.defaultMessage,
};

export const idLocale = {
  errors: idErrors,
  auth: idAuth,
  beneficiary: idBeneficiary,
  commonErrors: idCommonErrors,
  navigation: idNavigation,
  partner: idPartner,
  volunteer: idVolunteer,
};

export { idAuth, idBeneficiary, idCommonErrors, idNavigation, idPartner, idVolunteer };
