"use server";

import { cookies } from "next/headers";

const locales = ["en", "zh-TW", "ja"] as const;
type Locale = (typeof locales)[number];

export async function setLocale(locale: Locale) {
  if (!locales.includes(locale)) {
    throw new Error("Unsupported locale");
  }

  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
