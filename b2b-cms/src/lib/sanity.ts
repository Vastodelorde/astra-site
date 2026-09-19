import { createClient } from '@sanity/client';
import { starterPosts, type BlogPost } from '../data/blog';
import { starterPostsEn, starterEnSourceSlug } from '../data/blogEn';

// A server-only token enables private-dataset reads; otherwise requests use the public CDN.
const token = import.meta.env.SANITY_TOKEN;
const requestOptions = () => ({ signal: AbortSignal.timeout(6000) });

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: token || undefined,
  useCdn: !token,
});

// Resolve references so Sanity results match the local fallback shape.
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
  return client.fetch(segmentPageQuery, { slug }, requestOptions());
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
