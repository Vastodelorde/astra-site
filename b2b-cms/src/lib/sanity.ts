import { createClient } from '@sanity/client';
import { starterPosts, type BlogPost } from '../data/blog';
import { starterPostsEn, starterEnSourceSlug } from '../data/blogEn';

// SANITY_TOKEN is server-only (never shipped to the client). When present the
// build reads directly (works with a private dataset); otherwise it uses the
// public CDN. So no need to make the dataset public.
const token = import.meta.env.SANITY_TOKEN;

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: token || undefined,
  useCdn: !token,
});

// GROQ for a segment page (maliy / seredniy / velykyi), resolving referenced
// managers + tariffs and image asset URLs so the shape matches the local data.
const segmentPageQuery = `*[_type == "segmentPage" && slug.current == $slug][0]{
  seo,
  hero{ ..., "image": coalesce(imagePath, image.asset->url) },
  tariffsHeading, tariffsLead,
  "tariffs": tariffs[]->{ plan, speed, unit, guar, features, price, per, tag },
  managersHeading, managersLead,
  "managers": managers[]->{ name, role, note, "photo": image.asset->url, "alt": coalesce(alt, name + ", персональний акаунт-менеджер АСТРА") },
  detailsHeading, detailsLead, diffs,
  servicesHeading, servicesLead, services,
  contactHeading, contactLead
}`;

export async function getSegmentPage(slug: string) {
  return client.fetch(segmentPageQuery, { slug });
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
      );
      const translatedSources = new Set(translated.map((post) => post.sourceSlug));
      return [...translated, ...starterPostsEn.filter((post) => !Object.entries(starterEnSourceSlug).some(([source, enSlug]) => enSlug === post.slug && translatedSources.has(source)))]
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    }
    return await client.withConfig({ useCdn: false }).fetch(
      `*[_type == "blogPost" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) { ${blogFields} }`,
    );
  } catch (error) {
    if (!import.meta.env.DEV) throw error;
    console.warn('[sanity] blog posts unavailable; using local content');
    return locale === 'en' ? starterPostsEn : starterPosts;
  }
}

export async function getBlogPost(slug: string, locale: 'uk' | 'en' = 'uk'): Promise<BlogPost | null> {
  if (locale === 'en') return (await getBlogPosts('en')).find((post) => post.slug === slug) ?? null;
  if (!import.meta.env.PUBLIC_SANITY_PROJECT_ID) return starterPosts.find((post) => post.slug === slug) ?? null;
  try {
    return await client.withConfig({ useCdn: false }).fetch(
      `*[_type == "blogPost" && slug.current == $slug && defined(publishedAt) && publishedAt <= now()][0] { ${blogFields} }`,
      { slug },
    );
  } catch (error) {
    if (!import.meta.env.DEV) throw error;
    console.warn('[sanity] blog post unavailable; using local content');
    return starterPosts.find((post) => post.slug === slug) ?? null;
  }
}
