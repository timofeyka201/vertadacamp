import crypto from "crypto";

// Demo default — override in production via ADMIN_PASSWORD env var (repo is public).
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "vertada2026";
const SECRET = process.env.ADMIN_SESSION_SECRET || "vertada-camp-admin-secret-2026";

export const ADMIN_COOKIE_NAME = "vertada_admin_session";

export function makeSessionToken(): string {
  return crypto.createHash("sha256").update(`${ADMIN_PASSWORD}:${SECRET}`).digest("hex");
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  return token === makeSessionToken();
}
