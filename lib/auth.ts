import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
  adminPassword,
  createSessionToken,
  isValidSession,
} from "@/lib/session";

export { ADMIN_COOKIE, isValidSession } from "@/lib/session";

export async function verifyPassword(input: string) {
  return input === adminPassword();
}

export async function setAdminCookie() {
  const store = await cookies();
  store.set(ADMIN_COOKIE, await createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearAdminCookie() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

export async function isAdminAuthed() {
  const store = await cookies();
  return isValidSession(store.get(ADMIN_COOKIE)?.value);
}
