import { defineField, defineType } from 'sanity'

export const segmentPageType = defineType({
  name: 'segmentPage',
  title: 'Сторінка сегмента',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Назва (внутрішня)', type: 'string' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'maliy / seredniy / velykyi',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'titleEn', title: 'Title (EN)', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'descriptionEn', title: 'Description (EN)', type: 'text', rows: 3 },
        { name: 'canonical', title: 'Canonical URL', type: 'url' },
        { name: 'canonicalEn', title: 'Canonical URL (EN)', type: 'url' },
        { name: 'ogTitle', title: 'OG Title', type: 'string' },
        { name: 'ogTitleEn', title: 'OG Title (EN)', type: 'string' },
        { name: 'ogDescription', title: 'OG Description', type: 'text', rows: 2 },
        { name: 'ogDescriptionEn', title: 'OG Description (EN)', type: 'text', rows: 2 },
      ],
    }),

    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        { name: 'imagePath', title: 'Фонове зображення (шлях у /img)', type: 'string', description: 'Напр. img/dir-network.jpg' },
        { name: 'imageAlt', title: 'Alt зображення', type: 'string' },
        { name: 'imageAltEn', title: 'Image alt (EN)', type: 'string' },
        { name: 'breadcrumbHref', title: 'Хлібна крихта: посилання', type: 'string', initialValue: 'index.html' },
        { name: 'breadcrumbParent', title: 'Хлібна крихта: батько', type: 'string', initialValue: 'Рішення' },
        { name: 'breadcrumbParentEn', title: 'Breadcrumb parent (EN)', type: 'string', initialValue: 'Solutions' },
        { name: 'breadcrumbLabel', title: 'Хлібна крихта: поточна', type: 'string' },
        { name: 'breadcrumbLabelEn', title: 'Breadcrumb label (EN)', type: 'string' },
        { name: 'h1', title: 'Заголовок H1', type: 'string' },
        { name: 'h1En', title: 'H1 (EN)', type: 'string' },
        { name: 'sub', title: 'Підзаголовок', type: 'text', rows: 3 },
        { name: 'subEn', title: 'Subtitle (EN)', type: 'text', rows: 3 },
        { name: 'ctaSecondaryHref', title: 'CTA (друга): посилання', type: 'string', initialValue: '#taryfy' },
        { name: 'ctaSecondaryLabel', title: 'CTA (друга): текст', type: 'string', initialValue: 'Переглянути тарифи' },
        { name: 'ctaSecondaryLabelEn', title: 'Secondary CTA label (EN)', type: 'string', initialValue: 'View plans' },
      ],
    }),

    defineField({ name: 'tariffsHeading', title: 'Тарифи: заголовок', type: 'string' }),
    defineField({ name: 'tariffsHeadingEn', title: 'Plans: heading (EN)', type: 'string' }),
    defineField({ name: 'tariffsLead', title: 'Тарифи: підзаголовок', type: 'text', rows: 2 }),
    defineField({ name: 'tariffsLeadEn', title: 'Plans: lead (EN)', type: 'text', rows: 2 }),
    defineField({
      name: 'tariffs',
      title: 'Тарифи',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tariff' }] }],
    }),

    defineField({ name: 'managersHeading', title: 'Менеджери: заголовок', type: 'string' }),
    defineField({ name: 'managersHeadingEn', title: 'Managers: heading (EN)', type: 'string' }),
    defineField({ name: 'managersLead', title: 'Менеджери: підзаголовок', type: 'text', rows: 2 }),
    defineField({ name: 'managersLeadEn', title: 'Managers: lead (EN)', type: 'text', rows: 2 }),
    defineField({
      name: 'managers',
      title: 'Менеджери',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'manager' }] }],
    }),

    defineField({ name: 'detailsHeading', title: 'Що варто знати: заголовок', type: 'string' }),
    defineField({ name: 'detailsHeadingEn', title: 'Details: heading (EN)', type: 'string' }),
    defineField({ name: 'detailsLead', title: 'Що варто знати: підзаголовок', type: 'text', rows: 2 }),
    defineField({ name: 'detailsLeadEn', title: 'Details: lead (EN)', type: 'text', rows: 2 }),
    defineField({
      name: 'diffs',
      title: 'Що варто знати (картки)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Заголовок', type: 'string' },
            { name: 'titleEn', title: 'Title (EN)', type: 'string' },
            { name: 'body', title: 'Текст', type: 'text', rows: 3 },
            { name: 'bodyEn', title: 'Body (EN)', type: 'text', rows: 3 },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),

    defineField({ name: 'servicesHeading', title: 'Послуги: заголовок', type: 'string' }),
    defineField({ name: 'servicesHeadingEn', title: 'Services: heading (EN)', type: 'string' }),
    defineField({ name: 'servicesLead', title: 'Послуги: підзаголовок', type: 'text', rows: 2 }),
    defineField({ name: 'servicesLeadEn', title: 'Services: lead (EN)', type: 'text', rows: 2 }),
    defineField({
      name: 'services',
      title: 'Релевантні послуги (картки)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Заголовок', type: 'string' },
            { name: 'titleEn', title: 'Title (EN)', type: 'string' },
            { name: 'body', title: 'Текст', type: 'text', rows: 3 },
            { name: 'bodyEn', title: 'Body (EN)', type: 'text', rows: 3 },
            { name: 'href', title: 'Посилання', type: 'string' },
            { name: 'hrefEn', title: 'Link (EN)', type: 'string' },
            { name: 'label', title: 'Текст посилання', type: 'string', initialValue: 'Детальніше' },
            { name: 'labelEn', title: 'Link label (EN)', type: 'string', initialValue: 'Explore' },
            { name: 'all', title: 'Це картка «Усі послуги»?', type: 'boolean' },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),

    defineField({ name: 'contactHeading', title: 'Форма: заголовок', type: 'string' }),
    defineField({ name: 'contactHeadingEn', title: 'Form: heading (EN)', type: 'string' }),
    defineField({ name: 'contactLead', title: 'Форма: підзаголовок', type: 'text', rows: 2 }),
    defineField({ name: 'contactLeadEn', title: 'Form: lead (EN)', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})
