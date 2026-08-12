import { createHash } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "ch_admin_session";

function getExpectedToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(password).digest("hex");
}

export function checkAdminPassword(candidate: string): string | null {
  const expected = getExpectedToken();
  if (!expected || !process.env.ADMIN_PASSWORD) return null;
  return candidate === process.env.ADMIN_PASSWORD ? expected : null;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const expected = getExpectedToken();
  if (!expected) return false;
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value === expected;
}
