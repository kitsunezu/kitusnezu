import type { LocalizedString } from "@/types/profile";

export type Locale = "en" | "zh-TW" | "ja";

export function localized(obj: LocalizedString, locale: string): string {
  return obj[locale as Locale] ?? obj.en;
}
