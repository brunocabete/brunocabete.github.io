import type { UIStrings } from "./types";
import config from "@/config";

export { tplStr } from "./format";

const modules = import.meta.glob<{ default: UIStrings }>("./lang/*.ts", {
  eager: true,
});

const translations: Record<string, UIStrings> = {};
for (const [path, mod] of Object.entries(modules)) {
  const locale = path.slice("./lang/".length, -".ts".length);
  translations[locale] = mod.default;
}

const primaryLocale = config.site.lang;

/** List of available locale codes (keys of the translation files). */
export const locales = Object.keys(translations);

/**
 * Returns UI strings for the given locale.
 * Falls back to the primary locale (pt-BR), then to English.
 */
export function useTranslations(
  locale: string | undefined = primaryLocale
): UIStrings {
  const resolved = locale ?? primaryLocale;
  return (
    translations[resolved] ??
    translations[primaryLocale] ??
    translations["en"]
  );
}
