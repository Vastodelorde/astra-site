/** Idempotently seeds segment pages and shared assets into Sanity. Requires `SANITY_TOKEN`. */
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { maliy } from '../src/data/maliy.ts'
import { seredniy } from '../src/data/seredniy.ts'
import { velykyi } from '../src/data/velykyi.ts'
import { enPages } from '../src/data/enPages.ts'

const here = dirname(fileURLToPath(import.meta.url))
const pub = (p: string) => resolve(here, '..', 'public', p)

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('✗ SANITY_TOKEN missing. Add it to .env and run: node --env-file=.env scripts/seed.ts')
  process.exit(1)
}

const client = createClient({ projectId: 'tya427q1', dataset: 'production', apiVersion: '2024-01-01', token, useCdn: false })

type Ref = { _key: string; _type: 'reference'; _ref: string }
const managerId = (photo: string) => `manager-${photo.match(/manager_(\w+)\.png/)?.[1] ?? photo}`
const tariffId = (speed: string) => `tariff-biznes-${speed.replace(/\s+/g, '')}`
const withKeys = <T extends object>(arr: T[], prefix: string) => arr.map((o, i) => ({ _key: `${prefix}-${i}`, ...o }))

const pages = [
  { slug: 'maliy', title: 'Малий бізнес', data: maliy as any },
  { slug: 'seredniy', title: 'Середній бізнес', data: seredniy as any },
  { slug: 'velykyi', title: 'Великий бізнес', data: velykyi as any },
]

async function run() {
  const uploadedImg = new Map<string, string>()
  const seededManager = new Set<string>()
  const seededTariff = new Set<string>()

  for (const { slug, title, data } of pages) {
    const english = enPages[slug]
    const enTariffs = english.sections.find((section) => section.id === 'taryfy')
    const enManagers = english.sections.find((section) => section.id === 'manager')
    const enDetails = english.sections.find((section) => section.id === 'details')
    const enServices = english.sections.find((section) => section.id === 'services')
    const enContact = english.sections.find((section) => section.id === 'contact')
    const managerRefs: Ref[] = []
    for (const [managerIndex, m] of (data.managers?.items ?? []).entries()) {
      const _id = managerId(m.photo)
      if (!seededManager.has(_id)) {
        let assetId = uploadedImg.get(m.photo)
        if (!assetId) {
          console.log('· upload photo:', m.photo)
          const asset = await client.assets.upload('image', readFileSync(pub(m.photo)), { filename: m.photo.split('/').pop() })
          assetId = asset._id
          uploadedImg.set(m.photo, assetId)
        }
        await client.createOrReplace({
          _id, _type: 'manager', name: m.name, nameEn: enManagers?.items?.[managerIndex]?.title || m.name,
          role: m.role, roleEn: enManagers?.items?.[managerIndex]?.body || 'Dedicated account manager',
          note: m.note, noteEn: '', alt: m.alt, altEn: enManagers?.items?.[managerIndex]?.title || m.name,
          image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
        })
        seededManager.add(_id)
      }
      managerRefs.push({ _key: _id, _type: 'reference', _ref: _id })
    }

    const tariffRefs: Ref[] = []
    for (const [tariffIndex, t] of data.tariffs.items.entries()) {
      const _id = tariffId(t.speed)
      if (!seededTariff.has(_id)) {
        await client.createOrReplace({
          _id, _type: 'tariff', plan: t.plan, planEn: enTariffs?.items?.[tariffIndex]?.title,
          speed: t.speed, unit: t.unit, unitEn: 'Mbps', guar: t.guar,
          features: t.features, featuresEn: enTariffs?.items?.[tariffIndex]?.features,
          price: t.price, per: t.per, perEn: 'UAH/mo', tag: t.tag, order: tariffIndex,
        })
        seededTariff.add(_id)
      }
      tariffRefs.push({ _key: _id, _type: 'reference', _ref: _id })
    }

    console.log('· segmentPage:', slug)
    await client.createOrReplace({
      _id: `segmentPage-${slug}`,
      _type: 'segmentPage',
      title,
      slug: { _type: 'slug', current: slug },
      seo: {
        ...data.seo,
        titleEn: english.title,
        descriptionEn: english.description,
        canonicalEn: `https://astra.in.ua/b2b/en/${slug}.html`,
        ogTitleEn: english.title,
        ogDescriptionEn: english.description,
      },
      hero: {
        imagePath: data.hero.image,
        imageAlt: data.hero.imageAlt,
        imageAltEn: english.hero.title,
        breadcrumbHref: data.hero.breadcrumbHref,
        breadcrumbParent: data.hero.breadcrumbParent,
        breadcrumbParentEn: english.hero.parentLabel || 'Solutions',
        breadcrumbLabel: data.hero.breadcrumbLabel,
        breadcrumbLabelEn: english.hero.label,
        h1: data.hero.h1,
        h1En: english.hero.title,
        sub: data.hero.sub,
        subEn: english.hero.intro,
        ctaSecondaryHref: data.hero.ctaSecondaryHref,
        ctaSecondaryLabel: data.hero.ctaSecondaryLabel,
        ctaSecondaryLabelEn: 'View plans',
      },
      tariffsHeading: data.tariffs.heading,
      tariffsHeadingEn: enTariffs?.heading,
      tariffsLead: data.tariffs.lead,
      tariffsLeadEn: enTariffs?.lead,
      tariffs: tariffRefs,
      managersHeading: data.managers?.heading,
      managersHeadingEn: enManagers?.heading,
      managersLead: data.managers?.lead,
      managersLeadEn: enManagers?.lead,
      managers: managerRefs,
      detailsHeading: data.details.heading,
      detailsHeadingEn: enDetails?.heading,
      detailsLead: data.details.lead,
      detailsLeadEn: enDetails?.lead,
      diffs: withKeys(data.details.items.map((item: any, index: number) => ({
        ...item, titleEn: enDetails?.items?.[index]?.title, bodyEn: enDetails?.items?.[index]?.body,
      })), 'diff'),
      servicesHeading: data.services.heading,
      servicesHeadingEn: enServices?.heading,
      servicesLead: data.services.lead,
      servicesLeadEn: enServices?.lead,
      services: withKeys(data.services.items.map((item: any, index: number) => ({
        ...item, titleEn: enServices?.items?.[index]?.title, bodyEn: enServices?.items?.[index]?.body,
        hrefEn: enServices?.items?.[index]?.href, labelEn: item.all ? 'Explore the catalog' : 'Explore',
      })), 'svc'),
      contactHeading: data.contact.heading,
      contactHeadingEn: enContact?.heading,
      contactLead: data.contact.lead,
      contactLeadEn: enContact?.lead,
    })
  }

  console.log('\n✓ Seed complete (maliy, seredniy, velykyi).')
}

run().catch((e) => { console.error(e); process.exit(1) })
