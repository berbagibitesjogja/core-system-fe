import * as React from "react";
import type { HeaderProps } from "./header";
import type { SidebarProps } from "./sidebar";

export interface AdminLayoutContextType {
  setHeaderOverride: (props: Partial<HeaderProps> | null) => void;
  setSidebarUserRole: (role: SidebarProps["userRole"] | null) => void;
}

export const AdminLayoutContext =
  React.createContext<AdminLayoutContextType | null>(null);

/**
 * Mengakses kontrol override Header dan peran Sidebar pada layout Admin.
 */
export function useAdminLayout(): AdminLayoutContextType | null {
  return React.useContext(AdminLayoutContext);
}
