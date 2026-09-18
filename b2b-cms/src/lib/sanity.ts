import { createClient } from '@sanity/client';
import { starterPosts, type BlogPost } from '../data/blog';

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

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!import.meta.env.PUBLIC_SANITY_PROJECT_ID) return starterPosts;
  return client.withConfig({ useCdn: false }).fetch(
    `*[_type == "blogPost" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) { ${blogFields} }`,
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!import.meta.env.PUBLIC_SANITY_PROJECT_ID) return starterPosts.find((post) => post.slug === slug) ?? null;
  return client.withConfig({ useCdn: false }).fetch(
    `*[_type == "blogPost" && slug.current == $slug && defined(publishedAt) && publishedAt <= now()][0] { ${blogFields} }`,
    { slug },
  );
}
