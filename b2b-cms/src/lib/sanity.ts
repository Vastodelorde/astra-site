import { createClient } from '@sanity/client';
import { starterPosts, type BlogPost } from '../data/blog';
import { starterPostsEn, starterEnSourceSlug } from '../data/blogEn';

// A server-only token enables private-dataset reads; otherwise requests use the public CDN.
const token = import.meta.env.SANITY_TOKEN;
const requestOptions = () => ({ signal: AbortSignal.timeout(6000) });
const hasSanity = Boolean(import.meta.env.PUBLIC_SANITY_PROJECT_ID);
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'offline00';

export const client = createClient({
  projectId,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: token || undefined,
  useCdn: !token,
});

// Resolve references so Sanity results match the local fallback shape.
const segmentPageQuery = `*[_type == "segmentPage" && slug.current == $slug][0]{
  seo,
  hero{ ..., "image": coalesce(imagePath, image.asset->url) },
  tariffsHeading, tariffsHeadingEn, tariffsLead, tariffsLeadEn,
  "tariffs": tariffs[]->{ plan, planEn, speed, unit, unitEn, guar, features, featuresEn, price, per, perEn, tag },
  managersHeading, managersHeadingEn, managersLead, managersLeadEn,
  "managers": managers[]->{ name, nameEn, role, roleEn, note, noteEn, "photo": image.asset->url, "alt": coalesce(alt, name + ", персональний акаунт-менеджер АСТРА"), altEn },
  detailsHeading, detailsHeadingEn, detailsLead, detailsLeadEn, diffs,
  servicesHeading, servicesHeadingEn, servicesLead, servicesLeadEn, services,
  contactHeading, contactHeadingEn, contactLead, contactLeadEn
}`;

export async function getSegmentPage(slug: string) {
  if (!hasSanity) return null;
  try {
    return await client.withConfig({ useCdn: false }).fetch(segmentPageQuery, { slug }, requestOptions());
  } catch (error) {
    console.warn(`[sanity] segment ${slug} unavailable:`, (error as Error)?.message);
    return null;
  }
}

const localizedFields = `{ uk, en }`;
const contentItemFields = `{
  key, title${localizedFields}, subtitle${localizedFields}, body${localizedFields}, result${localizedFields},
  features[]${localizedFields}, label${localizedFields}, href, icon, imagePath, imageAlt${localizedFields}, tag${localizedFields},
  links[]{ label${localizedFields}, href, kind }
}`;
const serviceFields = `{
  key, group, icon, order, title${localizedFields}, body${localizedFields}, label${localizedFields}, hrefUk, hrefEn
}`;
const tariffFields = `{
  plan, planEn, speed, unit, unitEn, guar, features, featuresEn, price, per, perEn, tag, order
}`;
const managedPageQuery = `*[_type == "managedPage" && key == $key][0]{
  title, key,
  seo{ title${localizedFields}, description${localizedFields}, ogTitle${localizedFields}, ogDescription${localizedFields}, canonicalUk, canonicalEn },
  hero{ title${localizedFields}, intro${localizedFields}, label${localizedFields}, imagePath, imageAlt${localizedFields}, ctaLabel${localizedFields} },
  sections[]{ id, heading${localizedFields}, lead${localizedFields}, note${localizedFields}, label${localizedFields}, href, imagePath, imageAlt${localizedFields}, items[]${contentItemFields} },
  "tariffs": tariffs[]->${tariffFields},
  "services": services[]->${serviceFields},
  cta{ title${localizedFields}, text${localizedFields}, label${localizedFields} }
}`;

async function fetchFresh<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!hasSanity) return null;
  try {
    return await client.withConfig({ useCdn: false }).fetch<T>(query, params, requestOptions());
  } catch (error) {
    console.warn('[sanity] content unavailable; using local content:', (error as Error)?.message);
    return null;
  }
}

export function getManagedPage(key: 'home' | 'services' | 'pricing' | 'contacts') {
  return fetchFresh<any>(managedPageQuery, { key });
}

export function getServices() {
  return fetchFresh<any[]>(`*[_type == "service"] | order(order asc) ${serviceFields}`);
}

export function getTariffs() {
  return fetchFresh<any[]>(`*[_type == "tariff"] | order(order asc) ${tariffFields}`);
}

export function getSiteSettings() {
  return fetchFresh<any>(`*[_type == "siteSettings"][0]{
    supportPhoneDisplay, supportPhoneHref,
    supportPhones[]{ label${localizedFields}, href, kind },
    telegramUrl, viberUrl, accountingAddress${localizedFields},
    accountingPhones[]{ label${localizedFields}, href, kind },
    accountingTelegramUrl, accountingViberUrl, email
  }`);
}

const blogFields = `title, "slug": slug.current, publishedAt, category, tags, excerpt,
  "image": cover.asset->url, "imageAlt": cover.alt, body`;

export async function getBlogPosts(locale: 'uk' | 'en' = 'uk'): Promise<BlogPost[]> {
  if (!import.meta.env.PUBLIC_SANITY_PROJECT_ID) return locale === 'en' ? starterPostsEn : starterPosts;
  try {
    if (locale === 'en') {
      const translated = await client.withConfig({ useCdn: false }).fetch<Array<BlogPost & { sourceSlug: string }>>(
        `*[_type == "blogPost" && defined(slug.current) && defined(titleEn) && defined(slugEn.current) && defined(categoryEn) && defined(excerptEn) && defined(bodyEn[0]) && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) {
          "title": titleEn, "slug": slugEn.current, publishedAt, "category": categoryEn, tags,
          "excerpt": excerptEn, "image": cover.asset->url, "imageAlt": coalesce(coverAltEn, cover.alt), "body": bodyEn,
          "sourceSlug": slug.current
        }`,
        {},
        requestOptions(),
      );
      const translatedSources = new Set(translated.map((post) => post.sourceSlug));
      return [...translated, ...starterPostsEn.filter((post) => !Object.entries(starterEnSourceSlug).some(([source, enSlug]) => enSlug === post.slug && translatedSources.has(source)))]
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    }
    return await client.withConfig({ useCdn: false }).fetch(
      `*[_type == "blogPost" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) { ${blogFields} }`,
      {},
      requestOptions(),
    );
  } catch (error) {
    console.warn('[sanity] blog posts unavailable; using local content:', (error as Error)?.message);
    return locale === 'en' ? starterPostsEn : starterPosts;
  }
}
