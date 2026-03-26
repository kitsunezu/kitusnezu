import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

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

  // 2. Check Accept-Language header
  const headerStore = await headers();
  const acceptLang = headerStore.get("accept-language") ?? "";
  const preferred = acceptLang
    .split(",")
    .map((part) => part.split(";")[0].trim())
    .find((lang) => {
      if (isValidLocale(lang)) return true;
      const prefix = lang.split("-")[0];
      return locales.some((l) => l.startsWith(prefix));
    });

  if (preferred) {
    const matched =
      locales.find((l) => l === preferred) ??
      locales.find((l) => l.startsWith(preferred.split("-")[0]));
    if (matched) {
      return {
        locale: matched,
        timeZone: "Asia/Taipei",
        messages: (await import(`../messages/${matched}.json`)).default,
      };
    }
  }

  // 3. Default to English
  const defaultLocale = "en";
  return {
    locale: defaultLocale,
    timeZone: "Asia/Taipei",
    messages: (await import(`../messages/${defaultLocale}.json`)).default,
  };
});
