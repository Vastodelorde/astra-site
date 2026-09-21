import { defineArrayMember, defineField, defineType } from 'sanity'

export const localizedStringType = defineType({
  name: 'localizedString',
  title: 'Текст UK / EN',
  type: 'object',
  fields: [
    defineField({ name: 'uk', title: 'Українською', type: 'string' }),
    defineField({ name: 'en', title: 'English', type: 'string' }),
  ],
})

export const localizedTextType = defineType({
  name: 'localizedText',
  title: 'Довгий текст UK / EN',
  type: 'object',
  fields: [
    defineField({ name: 'uk', title: 'Українською', type: 'text', rows: 3 }),
    defineField({ name: 'en', title: 'English', type: 'text', rows: 3 }),
  ],
})

export const contentLinkType = defineType({
  name: 'contentLink',
  title: 'Посилання',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Підпис', type: 'localizedString' }),
    defineField({ name: 'href', title: 'URL або шлях', type: 'string' }),
    defineField({
      name: 'kind',
      title: 'Тип',
      type: 'string',
      options: { list: ['link', 'phone', 'email', 'telegram', 'viber'] },
      initialValue: 'link',
    }),
  ],
  preview: { select: { title: 'label.uk', subtitle: 'href' } },
})

export const contentItemType = defineType({
  name: 'contentItem',
  title: 'Елемент контенту',
  type: 'object',
  fields: [
    defineField({ name: 'key', title: 'Системний ключ', type: 'string', description: 'Не змінюйте без розробника.' }),
    defineField({ name: 'title', title: 'Заголовок', type: 'localizedString' }),
    defineField({ name: 'subtitle', title: 'Підзаголовок', type: 'localizedString' }),
    defineField({ name: 'body', title: 'Опис', type: 'localizedText' }),
    defineField({ name: 'result', title: 'Результат / друга колонка', type: 'localizedText' }),
    defineField({
      name: 'features',
      title: 'Список переваг',
      type: 'array',
      of: [defineArrayMember({ type: 'localizedString' })],
    }),
    defineField({ name: 'label', title: 'Текст посилання', type: 'localizedString' }),
    defineField({ name: 'href', title: 'Посилання', type: 'string' }),
    defineField({ name: 'icon', title: 'Ключ іконки', type: 'string' }),
    defineField({ name: 'imagePath', title: 'Шлях зображення у /public', type: 'string' }),
    defineField({ name: 'imageAlt', title: 'Alt зображення', type: 'localizedString' }),
    defineField({ name: 'tag', title: 'Коротка позначка', type: 'localizedString' }),
    defineField({ name: 'links', title: 'Контакти й посилання', type: 'array', of: [defineArrayMember({ type: 'contentLink' })] }),
  ],
  preview: { select: { title: 'title.uk', subtitle: 'key' } },
})

export const contentSectionType = defineType({
  name: 'contentSection',
  title: 'Секція сторінки',
  type: 'object',
  fields: [
    defineField({ name: 'id', title: 'Системний ID', type: 'string', validation: (rule) => rule.required(), description: 'Використовується версткою. Не змінюйте без розробника.' }),
    defineField({ name: 'heading', title: 'Заголовок', type: 'localizedString' }),
    defineField({ name: 'lead', title: 'Вступ', type: 'localizedText' }),
    defineField({ name: 'note', title: 'Примітка', type: 'localizedText' }),
    defineField({ name: 'label', title: 'Текст дії', type: 'localizedString' }),
    defineField({ name: 'href', title: 'Посилання дії', type: 'string' }),
    defineField({ name: 'imagePath', title: 'Шлях зображення у /public', type: 'string' }),
    defineField({ name: 'imageAlt', title: 'Alt зображення', type: 'localizedString' }),
    defineField({ name: 'items', title: 'Елементи секції', type: 'array', of: [defineArrayMember({ type: 'contentItem' })] }),
  ],
  preview: { select: { title: 'heading.uk', subtitle: 'id' } },
})

export const managedPageType = defineType({
  name: 'managedPage',
  title: 'Керована сторінка',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Назва в Studio', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'key',
      title: 'Системний ключ',
      type: 'string',
      options: { list: [
        { title: 'Головна', value: 'home' },
        { title: 'Послуги', value: 'services' },
        { title: 'Тарифи', value: 'pricing' },
        { title: 'Контакти', value: 'contacts' },
      ] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'localizedString' }),
        defineField({ name: 'description', title: 'Description', type: 'localizedText' }),
        defineField({ name: 'ogTitle', title: 'Open Graph title', type: 'localizedString' }),
        defineField({ name: 'ogDescription', title: 'Open Graph description', type: 'localizedText' }),
        defineField({ name: 'canonicalUk', title: 'Canonical UK', type: 'url' }),
        defineField({ name: 'canonicalEn', title: 'Canonical EN', type: 'url' }),
      ],
    }),
    defineField({
      name: 'hero',
      title: 'Перший екран',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'H1', type: 'localizedString' }),
        defineField({ name: 'intro', title: 'Опис', type: 'localizedText' }),
        defineField({ name: 'label', title: 'Назва у breadcrumbs', type: 'localizedString' }),
        defineField({ name: 'imagePath', title: 'Шлях зображення у /public', type: 'string' }),
        defineField({ name: 'imageAlt', title: 'Alt зображення', type: 'localizedString' }),
        defineField({ name: 'ctaLabel', title: 'Текст кнопки', type: 'localizedString' }),
      ],
    }),
    defineField({ name: 'sections', title: 'Секції', type: 'array', of: [defineArrayMember({ type: 'contentSection' })] }),
    defineField({ name: 'tariffs', title: 'Тарифи на сторінці', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'tariff' }] })] }),
    defineField({ name: 'services', title: 'Послуги на сторінці', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'service' }] })] }),
    defineField({
      name: 'cta',
      title: 'Фінальний заклик',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Заголовок', type: 'localizedString' }),
        defineField({ name: 'text', title: 'Текст', type: 'localizedText' }),
        defineField({ name: 'label', title: 'Кнопка', type: 'localizedString' }),
      ],
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'key' } },
})

export const serviceType = defineType({
  name: 'service',
  title: 'Послуга',
  type: 'document',
  fields: [
    defineField({ name: 'key', title: 'Системний ключ', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'title', title: 'Назва', type: 'localizedString', validation: (rule) => rule.required() }),
    defineField({ name: 'body', title: 'Опис', type: 'localizedText' }),
    defineField({ name: 'label', title: 'Текст посилання', type: 'localizedString' }),
    defineField({ name: 'hrefUk', title: 'Посилання UK', type: 'string' }),
    defineField({ name: 'hrefEn', title: 'Посилання EN', type: 'string' }),
    defineField({ name: 'icon', title: 'Ключ іконки', type: 'string' }),
    defineField({ name: 'group', title: 'Напрям', type: 'string', options: { list: ['isp', 'install', 'cloud'] }, validation: (rule) => rule.required() }),
    defineField({ name: 'order', title: 'Порядок', type: 'number', validation: (rule) => rule.required().integer().min(0) }),
  ],
  orderings: [{ title: 'За порядком', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title.uk', subtitle: 'group' } },
})

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Налаштування сайту',
  type: 'document',
  fields: [
    defineField({ name: 'supportPhoneDisplay', title: 'Гаряча лінія: відображення', type: 'string' }),
    defineField({ name: 'supportPhoneHref', title: 'Гаряча лінія: tel:', type: 'string' }),
    defineField({ name: 'supportPhones', title: 'Додаткові телефони підтримки', type: 'array', of: [defineArrayMember({ type: 'contentLink' })] }),
    defineField({ name: 'telegramUrl', title: 'Telegram URL', type: 'url' }),
    defineField({ name: 'viberUrl', title: 'Viber URL', type: 'string' }),
    defineField({ name: 'accountingAddress', title: 'Адреса бухгалтерії', type: 'localizedString' }),
    defineField({ name: 'accountingPhones', title: 'Телефони бухгалтерії', type: 'array', of: [defineArrayMember({ type: 'contentLink' })] }),
    defineField({ name: 'accountingTelegramUrl', title: 'Telegram бухгалтерії', type: 'url' }),
    defineField({ name: 'accountingViberUrl', title: 'Viber бухгалтерії', type: 'string' }),
    defineField({ name: 'email', title: 'E-mail', type: 'email' }),
  ],
  preview: { prepare: () => ({ title: 'Налаштування сайту' }) },
})
