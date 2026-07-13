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
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'canonical', title: 'Canonical URL', type: 'url' },
        { name: 'ogTitle', title: 'OG Title', type: 'string' },
        { name: 'ogDescription', title: 'OG Description', type: 'text', rows: 2 },
      ],
    }),

    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        { name: 'imagePath', title: 'Фонове зображення (шлях у /img)', type: 'string', description: 'Напр. img/dir-network.jpg' },
        { name: 'imageAlt', title: 'Alt зображення', type: 'string' },
        { name: 'breadcrumbHref', title: 'Хлібна крихта: посилання', type: 'string', initialValue: 'index.html' },
        { name: 'breadcrumbParent', title: 'Хлібна крихта: батько', type: 'string', initialValue: 'Рішення' },
        { name: 'breadcrumbLabel', title: 'Хлібна крихта: поточна', type: 'string' },
        { name: 'h1', title: 'Заголовок H1', type: 'string' },
        { name: 'sub', title: 'Підзаголовок', type: 'text', rows: 3 },
        { name: 'ctaSecondaryHref', title: 'CTA (друга): посилання', type: 'string', initialValue: '#taryfy' },
        { name: 'ctaSecondaryLabel', title: 'CTA (друга): текст', type: 'string', initialValue: 'Переглянути тарифи' },
      ],
    }),

    defineField({ name: 'tariffsHeading', title: 'Тарифи: заголовок', type: 'string' }),
    defineField({ name: 'tariffsLead', title: 'Тарифи: підзаголовок', type: 'text', rows: 2 }),
    defineField({
      name: 'tariffs',
      title: 'Тарифи',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tariff' }] }],
    }),

    defineField({ name: 'managersHeading', title: 'Менеджери: заголовок', type: 'string' }),
    defineField({ name: 'managersLead', title: 'Менеджери: підзаголовок', type: 'text', rows: 2 }),
    defineField({
      name: 'managers',
      title: 'Менеджери',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'manager' }] }],
    }),

    defineField({ name: 'detailsHeading', title: 'Що варто знати: заголовок', type: 'string' }),
    defineField({ name: 'detailsLead', title: 'Що варто знати: підзаголовок', type: 'text', rows: 2 }),
    defineField({
      name: 'diffs',
      title: 'Що варто знати (картки)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Заголовок', type: 'string' },
            { name: 'body', title: 'Текст', type: 'text', rows: 3 },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),

    defineField({ name: 'servicesHeading', title: 'Послуги: заголовок', type: 'string' }),
    defineField({ name: 'servicesLead', title: 'Послуги: підзаголовок', type: 'text', rows: 2 }),
    defineField({
      name: 'services',
      title: 'Релевантні послуги (картки)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Заголовок', type: 'string' },
            { name: 'body', title: 'Текст', type: 'text', rows: 3 },
            { name: 'href', title: 'Посилання', type: 'string' },
            { name: 'label', title: 'Текст посилання', type: 'string', initialValue: 'Детальніше' },
            { name: 'all', title: 'Це картка «Усі послуги»?', type: 'boolean' },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),

    defineField({ name: 'contactHeading', title: 'Форма: заголовок', type: 'string' }),
    defineField({ name: 'contactLead', title: 'Форма: підзаголовок', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})
