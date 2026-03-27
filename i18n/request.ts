import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const locales = ["en", "zh-TW", "ja"] as const;
type Locale = (typeof locales)[number];

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export default getRequestConfig(async () => {
  // 1. Check cookie
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return {
      locale: cookieLocale,      timeZone: "Asia/Taipei",      messages: (await import(`../messages/${cookieLocale}.json`)).default,
    };
  }

  // 2. Default to English
  const defaultLocale = "en";
  return {
    locale: defaultLocale,
    timeZone: "Asia/Taipei",
    messages: (await import(`../messages/${defaultLocale}.json`)).default,
  };
});
