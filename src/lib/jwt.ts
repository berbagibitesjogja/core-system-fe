export interface JwtPayload {
  exp?: number;
  iat?: number;
  sub?: string;
  [key: string]: unknown;
}

/**
 * Mendekode payload JWT tanpa verifikasi kriptografis (pemeriksaan proaktif masa berlaku token)
 */
export function parseJwt(tokenStr?: string | null): JwtPayload | null {
  try {
    if (!tokenStr) return null;
    const parts = tokenStr.split(".");
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    if (!base64Url) return null;

    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }

    let jsonPayload = "";
    if (typeof Buffer !== "undefined") {
      jsonPayload = Buffer.from(base64, "base64").toString("utf-8");
    } else if (typeof atob !== "undefined") {
      jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );
    } else {
      return null;
    }

    return JSON.parse(jsonPayload) as JwtPayload;
  } catch {
    return null;
  }
}
