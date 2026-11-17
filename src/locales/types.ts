import type { idAuth } from "./id/auth";
import type { idCommonErrors } from "./id/errors";
import type { idNavigation } from "./id/navigation";
import type { idErrors, idLocale } from "./id";

export type Locale = "id";

export type LocaleDictionary = typeof idLocale;
export type ErrorDictionary = typeof idErrors;
export type CommonErrorDictionary = typeof idCommonErrors;
export type AuthDictionary = typeof idAuth;
export type NavigationDictionary = typeof idNavigation;
