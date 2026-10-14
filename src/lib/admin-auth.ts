import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "admin_session";

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

export function passwordsMatch(input: string, expected: string) {
  return timingSafeEqual(digest(input), digest(expected));
}

function sessionToken() {
  return createHmac("sha256", process.env.ADMIN_PASSWORD ?? "").update("portfolio-admin-v1").digest("hex");
}

export async function isAdmin() {
  const password = process.env.ADMIN_PASSWORD?.trim();
  if (!password) return false;
  const jar = await cookies();
  const token = jar.get(cookieName)?.value;
  if (!token) return false;
  return passwordsMatch(token, sessionToken());
}

export async function startAdminSession() {
  const jar = await cookies();
  jar.set(cookieName, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function endAdminSession() {
  const jar = await cookies();
  jar.delete(cookieName);
}
