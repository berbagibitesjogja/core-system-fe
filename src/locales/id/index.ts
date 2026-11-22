import { idAuth } from "./auth";
import { idBeneficiary } from "./beneficiary";
import { idDashboard } from "./dashboard";
import { idDonation } from "./donation";
import { idCommonErrors } from "./errors";
import { idHero } from "./hero";
import { idNavigation } from "./navigation";
import { idPartner } from "./partner";
import { idProfile } from "./profile";
import { idReimburse } from "./reimburse";
import { idShared } from "./shared";
import { idVolunteer } from "./volunteer";

// Menggabungkan seluruh pesan galat dari modul fitur dan galat umum
// prettier-ignore
export const idErrors = {
  apiMessages: {
    ...idCommonErrors.apiMessages,
    ...idAuth.errors.apiMessages,
    ...idVolunteer.errors.apiMessages,
    ...idPartner.errors.apiMessages,
    ...idBeneficiary.errors.apiMessages,
    ...idReimburse.errors.apiMessages,
    ...idDonation.errors.apiMessages,
    ...idHero.errors.apiMessages,
    ...idProfile.errors.apiMessages,
    ...idDashboard.errors.apiMessages,
    ...idShared.errors.apiMessages,
  },
  errorCodes: {
    ...idCommonErrors.errorCodes,
    ...idAuth.errors.errorCodes,
    ...idVolunteer.errors.errorCodes,
    ...idPartner.errors.errorCodes,
    ...idBeneficiary.errors.errorCodes,
    ...idReimburse.errors.errorCodes,
    ...idDonation.errors.errorCodes,
    ...idHero.errors.errorCodes,
    ...idProfile.errors.errorCodes,
    ...idDashboard.errors.errorCodes,
    ...idShared.errors.errorCodes,
  },
  httpStatus: idCommonErrors.httpStatus,
  defaultMessage: idCommonErrors.defaultMessage,
};

export const idLocale = {
  errors: idErrors,
  auth: idAuth,
  beneficiary: idBeneficiary,
  commonErrors: idCommonErrors,
  dashboard: idDashboard,
  donation: idDonation,
  hero: idHero,
  navigation: idNavigation,
  partner: idPartner,
  profile: idProfile,
  reimburse: idReimburse,
  shared: idShared,
  volunteer: idVolunteer,
};

export {
  idAuth,
  idBeneficiary,
  idCommonErrors,
  idDashboard,
  idDonation,
  idHero,
  idNavigation,
  idPartner,
  idProfile,
  idReimburse,
  idShared,
  idVolunteer,
};
