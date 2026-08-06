import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { SupportedLanguageCode } from "./index";

export type LocalizedString = Record<SupportedLanguageCode, string>;

export function getLanguageCode(resolvedLanguage?: string): SupportedLanguageCode {
  return resolvedLanguage?.startsWith("en") ? "en" : "ka";
}

export function localizeField(
  field: LocalizedString,
  language: SupportedLanguageCode,
): string {
  return field[language] ?? field.ka;
}

export function localizeItem<T extends Record<string, unknown>>(
  item: T,
  language: SupportedLanguageCode,
): { [K in keyof T]: T[K] extends LocalizedString ? string : T[K] } {
  const result = {} as Record<string, unknown>;

  for (const [key, value] of Object.entries(item)) {
    if (
      value &&
      typeof value === "object" &&
      "ka" in value &&
      "en" in value
    ) {
      result[key] = localizeField(value as LocalizedString, language);
    } else {
      result[key] = value;
    }
  }

  return result as { [K in keyof T]: T[K] extends LocalizedString ? string : T[K] };
}

export function useLocalizedData<T extends Record<string, unknown>>(data: T[]) {
  const { i18n } = useTranslation();
  const language = getLanguageCode(i18n.resolvedLanguage);

  return useMemo(
    () => data.map((item) => localizeItem(item, language)),
    [data, language],
  );
}
