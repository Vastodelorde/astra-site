/**
 * Seed the segment pages (maliy / seredniy / velykyi) into Sanity from the local
 * data files, uploading manager photos and de-duplicating shared managers/tariffs.
 * Idempotent (deterministic _id + createOrReplace). Safe to re-run.
 *
 * Run:  node --env-file=.env scripts/seed.ts
 * Needs SANITY_TOKEN (Editor) in .env.
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { maliy } from '../src/data/maliy.ts'
import { seredniy } from '../src/data/seredniy.ts'
import { velykyi } from '../src/data/velykyi.ts'

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
    // managers (dedup + upload once)
    const managerRefs: Ref[] = []
    for (const m of data.managers?.items ?? []) {
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
          _id, _type: 'manager', name: m.name, role: m.role, note: m.note, alt: m.alt,
          image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
        })
        seededManager.add(_id)
      }
      managerRefs.push({ _key: _id, _type: 'reference', _ref: _id })
    }

    // tariffs (dedup)
    const tariffRefs: Ref[] = []
    for (const t of data.tariffs.items) {
      const _id = tariffId(t.speed)
      if (!seededTariff.has(_id)) {
        await client.createOrReplace({
          _id, _type: 'tariff', plan: t.plan, speed: t.speed, unit: t.unit,
          guar: t.guar, features: t.features, price: t.price, per: t.per, tag: t.tag,
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
      seo: data.seo,
      hero: {
        imagePath: data.hero.image,
        imageAlt: data.hero.imageAlt,
        breadcrumbHref: data.hero.breadcrumbHref,
        breadcrumbParent: data.hero.breadcrumbParent,
        breadcrumbLabel: data.hero.breadcrumbLabel,
        h1: data.hero.h1,
        sub: data.hero.sub,
        ctaSecondaryHref: data.hero.ctaSecondaryHref,
        ctaSecondaryLabel: data.hero.ctaSecondaryLabel,
      },
      tariffsHeading: data.tariffs.heading,
      tariffsLead: data.tariffs.lead,
      tariffs: tariffRefs,
      managersHeading: data.managers?.heading,
      managersLead: data.managers?.lead,
      managers: managerRefs,
      detailsHeading: data.details.heading,
      detailsLead: data.details.lead,
      diffs: withKeys(data.details.items, 'diff'),
      servicesHeading: data.services.heading,
      servicesLead: data.services.lead,
      services: withKeys(data.services.items, 'svc'),
      contactHeading: data.contact.heading,
      contactLead: data.contact.lead,
    })
  }

  console.log('\n✓ Seed complete (maliy, seredniy, velykyi).')
}

run().catch((e) => { console.error(e); process.exit(1) })
