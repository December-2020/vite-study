import i18n from "@/locales";

export function useI18n(key?: string, namespace?: string) {
  if (!key) return key;
  const { t } = i18n.global;
  let value = `${namespace}.${key}`;
  if (!namespace) {
    value = key;
  } else if (key.startsWith(namespace)) {
    value = key;
  }
  return t(value);
}
