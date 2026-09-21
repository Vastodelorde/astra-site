import { createClient } from '@sanity/client';
import {
  contactPageFallback,
  homePageFallback,
  pricingPageFallback,
  serviceCatalogFallback,
  servicesPageFallback,
  siteSettingsFallback,
  tariffCatalogFallback,
} from '../src/data/siteContent.ts';

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error('SANITY_TOKEN is missing. Run with: node --env-file=.env scripts/seed-site-content.ts');
  process.exit(1);
}

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'tya427q1',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const localizedArray = (values: any[] = [], prefix: string) => values.map((value, index) => ({
  _key: `${prefix}-${index}`,
  _type: 'localizedString',
  ...value,
}));
const links = (values: any[] = [], prefix: string) => values.map((value, index) => ({
  _key: `${prefix}-${index}`,
  _type: 'contentLink',
  ...value,
}));
const items = (values: any[] = [], prefix: string) => values.map((value, index) => ({
  _key: value.key || `${prefix}-${index}`,
  _type: 'contentItem',
  ...value,
  features: localizedArray(value.features, `${prefix}-${index}-feature`),
  links: links(value.links, `${prefix}-${index}-link`),
}));
const sections = (values: any[] = [], prefix: string) => values.map((value, index) => ({
  _key: value.id || `${prefix}-${index}`,
  _type: 'contentSection',
  ...value,
  items: items(value.items, `${prefix}-${value.id || index}`),
}));

async function run() {
  const serviceRefs = [];
  for (const service of serviceCatalogFallback as any[]) {
    const _id = `service-${slugify(service.key)}`;
    await client.createIfNotExists({ _id, _type: 'service', ...service });
    serviceRefs.push({ _key: _id, _type: 'reference', _ref: _id });
  }

  const tariffRefs = [];
  for (const tariff of tariffCatalogFallback as any[]) {
    const _id = `tariff-biznes-${tariff.speed.replace(/\s+/g, '')}`;
    await client.createIfNotExists({ _id, _type: 'tariff', ...tariff });
    tariffRefs.push({ _key: _id, _type: 'reference', _ref: _id });
  }

  const pages = [homePageFallback, servicesPageFallback, pricingPageFallback, contactPageFallback] as any[];
  for (const page of pages) {
    await client.createIfNotExists({
      _id: `managedPage-${page.key}`,
      _type: 'managedPage',
      ...page,
      sections: sections(page.sections, page.key),
      services: page.key === 'services' ? serviceRefs : undefined,
      tariffs: page.key === 'pricing' ? tariffRefs : undefined,
    });
  }

  await client.createIfNotExists({
    _id: 'siteSettings',
    _type: 'siteSettings',
    ...siteSettingsFallback,
    supportPhones: links(siteSettingsFallback.supportPhones, 'support-phone'),
    accountingPhones: links(siteSettingsFallback.accountingPhones, 'accounting-phone'),
  });

  console.log(`Ensured ${pages.length} pages, ${serviceRefs.length} services, ${tariffRefs.length} tariffs and site settings exist.`);
}

run().catch((error) => {
  console.error('Content seed failed:', error instanceof Error ? error.message : 'Unknown error');
  process.exit(1);
});
