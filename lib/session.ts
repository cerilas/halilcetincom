export const ADMIN_COOKIE = "hc_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function secret() {
  return process.env.ADMIN_SECRET ?? "dev-local-secret-halil-cetin";
}

export function adminPassword() {
  return process.env.ADMIN_PASSWORD ?? "halilcetin2026";
}

export async function hmac(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionToken() {
  const exp = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = `admin.${exp}`;
  return `${payload}.${await hmac(payload)}`;
}

export async function isValidSession(token?: string) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [role, exp, sig] = parts;
  const payload = `${role}.${exp}`;
  if (sig !== (await hmac(payload))) return false;
  if (Number(exp) < Date.now()) return false;
  return role === "admin";
}
