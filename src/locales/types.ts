import type { idAuth } from "./id/auth";
import type { idBeneficiary } from "./id/beneficiary";
import type { idDonation } from "./id/donation";
import type { idCommonErrors } from "./id/errors";
import type { idNavigation } from "./id/navigation";
import type { idPartner } from "./id/partner";
import type { idReimburse } from "./id/reimburse";
import type { idVolunteer } from "./id/volunteer";
import type { idErrors, idLocale } from "./id";

export type Locale = "id";

export type LocaleDictionary = typeof idLocale;
export type ErrorDictionary = typeof idErrors;
export type CommonErrorDictionary = typeof idCommonErrors;
export type AuthDictionary = typeof idAuth;
export type BeneficiaryDictionary = typeof idBeneficiary;
export type DonationDictionary = typeof idDonation;
export type NavigationDictionary = typeof idNavigation;
export type PartnerDictionary = typeof idPartner;
export type ReimburseDictionary = typeof idReimburse;
export type VolunteerDictionary = typeof idVolunteer;
