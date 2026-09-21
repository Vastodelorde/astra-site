import type { EnglishPage } from '../data/enPages';
import {
  contactPageFallback,
  homePageFallback,
  pricingPageFallback,
  serviceCatalogFallback,
  servicesPageFallback,
  siteSettingsFallback,
  tariffCatalogFallback,
} from '../data/siteContent';
import { getManagedPage, getSegmentPage, getServices, getSiteSettings, getTariffs } from './sanity';
import { getSection, localize, mergeContent } from './content';

const pageConfig = {
  index: ['home', homePageFallback],
  poslugy: ['services', servicesPageFallback],
  taryfy: ['pricing', pricingPageFallback],
  kontakty: ['contacts', contactPageFallback],
} as const;

const en = (value: any) => localize(value, 'en');

function itemToEnglish(item: any, sectionId: string) {
  return {
    title: en(item.title),
    body: en(sectionId === 'segments-size' ? item.subtitle : sectionId === 'pain' ? item.result : item.body),
    href: item.href,
    image: item.imagePath,
    features: item.features?.map(en),
    icon: item.icon,
  };
}

export async function getEnglishManagedPage(slug: string, fallback: EnglishPage): Promise<EnglishPage> {
  const config = pageConfig[slug as keyof typeof pageConfig];
  if (!config) return fallback;

  const [key, localFallback] = config;
  const managed = mergeContent(localFallback, await getManagedPage(key));
  const result: EnglishPage = {
    ...fallback,
    title: en(managed.seo.title),
    description: en(managed.seo.description),
    source: en(managed.hero.label),
    hero: {
      ...fallback.hero,
      image: managed.hero.imagePath,
      title: en(managed.hero.title),
      intro: en(managed.hero.intro),
      label: en(managed.hero.label),
    },
    sections: fallback.sections.map((baseSection) => {
      if (!baseSection.id) return baseSection;
      const section = getSection<any>(managed, baseSection.id);
      return {
        ...baseSection,
        heading: en(section.heading) || baseSection.heading,
        lead: en(section.lead) || baseSection.lead,
        note: en(section.note) || baseSection.note,
        items: section.items?.length
          ? section.items.map((item: any) => itemToEnglish(item, baseSection.id!))
          : baseSection.items,
      };
    }),
    cta: managed.cta ? {
      title: en(managed.cta.title),
      text: en(managed.cta.text),
      label: en(managed.cta.label),
    } : fallback.cta,
  };

  if (slug === 'poslugy') {
    const services = mergeContent(serviceCatalogFallback, await getServices());
    result.sections = result.sections.map((section) => ({
      ...section,
      items: services.filter((service: any) => service.group === section.id).map((service: any) => ({
        title: en(service.title), body: en(service.body), href: service.hrefEn, icon: service.icon,
      })),
    }));
  }

  if (slug === 'taryfy') {
    const tariffs = mergeContent(tariffCatalogFallback, await getTariffs());
    result.sections = result.sections.map((section) => section.id === 'plans' ? {
      ...section,
      items: tariffs.map((tariff: any) => ({
        title: tariff.planEn || tariff.plan,
        body: `${tariff.speed} ${tariff.unitEn || 'Mbps'} · ${tariff.price} ${tariff.perEn || 'UAH/mo'}${tariff.guar ? ` · ${tariff.guar}` : ''}`,
        features: tariff.featuresEn?.length ? tariff.featuresEn : tariff.features,
      })),
    } : section);
  }

  if (slug === 'kontakty') {
    const settings = mergeContent(siteSettingsFallback, await getSiteSettings());
    result.sections = result.sections.map((section) => section.id === 'contacts' ? {
      ...section,
      items: section.items?.map((item, index) => {
        if (index === 0) return { ...item, links: [
          { label: settings.supportPhoneDisplay, href: settings.supportPhoneHref },
          ...settings.supportPhones.map((phone: any) => ({ label: en(phone.label), href: phone.href })),
        ] };
        if (index === 1) return { ...item, links: [
          { label: 'Telegram', href: settings.telegramUrl }, { label: 'Viber', href: settings.viberUrl },
        ] };
        return { ...item, body: `${item.body} ${en(settings.accountingAddress)}`, links: [
          ...settings.accountingPhones.map((phone: any) => ({ label: en(phone.label), href: phone.href })),
          { label: settings.email, href: `mailto:${settings.email}` },
        ] };
      }),
    } : section);
  }

  return result;
}

export async function getEnglishSegmentPage(slug: string, fallback: EnglishPage): Promise<EnglishPage> {
  const cms = await getSegmentPage(slug);
  if (!cms) return fallback;

  const text = (english: any, current: string | undefined) => english || current || '';
  return {
    ...fallback,
    title: text(cms.seo?.titleEn, fallback.title),
    description: text(cms.seo?.descriptionEn, fallback.description),
    hero: {
      ...fallback.hero,
      title: text(cms.hero?.h1En, fallback.hero.title),
      intro: text(cms.hero?.subEn, fallback.hero.intro),
      label: text(cms.hero?.breadcrumbLabelEn, fallback.hero.label),
      parentLabel: text(cms.hero?.breadcrumbParentEn, fallback.hero.parentLabel),
      image: cms.hero?.imagePath || fallback.hero.image,
    },
    sections: fallback.sections.map((section) => {
      if (section.id === 'taryfy') return {
        ...section,
        heading: text(cms.tariffsHeadingEn, section.heading),
        lead: text(cms.tariffsLeadEn, section.lead),
        items: cms.tariffs?.length ? cms.tariffs.map((tariff: any) => ({
          title: tariff.planEn || tariff.plan,
          body: `${tariff.speed} ${tariff.unitEn || tariff.unit} · ${tariff.price} ${tariff.perEn || tariff.per}${tariff.guar ? ` · ${tariff.guar}` : ''}`,
          features: tariff.featuresEn?.length ? tariff.featuresEn : tariff.features,
        })) : section.items,
      };
      if (section.id === 'manager') return {
        ...section,
        heading: text(cms.managersHeadingEn, section.heading),
        lead: text(cms.managersLeadEn, section.lead),
        items: cms.managers?.length ? cms.managers.map((manager: any, index: number) => ({
          title: manager.nameEn || manager.name,
          body: manager.roleEn || manager.role,
          image: section.items?.[index]?.image,
        })) : section.items,
      };
      if (section.id === 'details') return {
        ...section,
        heading: text(cms.detailsHeadingEn, section.heading),
        lead: text(cms.detailsLeadEn, section.lead),
        items: cms.diffs?.length ? cms.diffs.map((item: any) => ({
          title: item.titleEn || item.title,
          body: item.bodyEn || item.body,
        })) : section.items,
      };
      if (section.id === 'services') return {
        ...section,
        heading: text(cms.servicesHeadingEn, section.heading),
        lead: text(cms.servicesLeadEn, section.lead),
        items: cms.services?.length ? cms.services.map((item: any, index: number) => ({
          title: item.titleEn || item.title,
          body: item.bodyEn || item.body,
          href: item.hrefEn || item.href,
          icon: section.items?.[index]?.icon,
        })) : section.items,
      };
      if (section.id === 'contact') return {
        ...section,
        heading: text(cms.contactHeadingEn, section.heading),
        lead: text(cms.contactLeadEn, section.lead),
      };
      return section;
    }),
  };
}
