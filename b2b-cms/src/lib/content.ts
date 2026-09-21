import type { Locale, Localized } from '../data/siteContent';

export function localize(value: Localized | string | null | undefined, locale: Locale): string {
  if (typeof value === 'string') return value;
  return value?.[locale] || value?.uk || value?.en || '';
}

export function mergeContent<T>(fallback: T, value: unknown): T {
  if (value === null || value === undefined || value === '') return fallback;
  if (Array.isArray(fallback)) {
    if (!Array.isArray(value) || !value.length) return fallback;

    const identity = (item: unknown) => {
      if (!item || typeof item !== 'object') return undefined;
      const record = item as Record<string, unknown>;
      return record.id ?? record.key ?? record.speed;
    };
    const fallbackHasIdentity = fallback.every((item) => identity(item) !== undefined);
    const valueHasIdentity = value.every((item) => identity(item) !== undefined);
    if (!fallbackHasIdentity || !valueHasIdentity) return value as T;

    const valueByIdentity = new Map(value.map((item) => [identity(item), item]));
    const merged = fallback.map((item) => {
      const match = valueByIdentity.get(identity(item));
      return match === undefined ? item : mergeContent(item, match);
    });
    const fallbackIdentities = new Set(fallback.map(identity));
    merged.push(...value.filter((item) => !fallbackIdentities.has(identity(item))));
    return merged as T;
  }
  if (typeof fallback !== 'object' || fallback === null || Array.isArray(value)) return value as T;

  const source = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const result: Record<string, unknown> = { ...(fallback as Record<string, unknown>) };
  for (const [key, fallbackValue] of Object.entries(fallback as Record<string, unknown>)) {
    result[key] = mergeContent(fallbackValue, source[key]);
  }
  for (const [key, sourceValue] of Object.entries(source)) {
    if (!(key in result)) result[key] = sourceValue;
  }
  return result as T;
}

export function getSection<T extends { id?: string }>(page: { sections?: T[] }, id: string): T {
  return (page.sections?.find((section) => section.id === id) || { id }) as T;
}
