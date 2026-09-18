import { defineField, defineType } from 'sanity'

export const blogPostType = defineType({
  name: 'blogPost',
  title: 'Стаття блогу',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Заголовок', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Адреса статті', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'publishedAt', title: 'Дата публікації', type: 'datetime', initialValue: () => new Date().toISOString(), validation: (rule) => rule.required() }),
    defineField({ name: 'category', title: 'Рубрика', type: 'string', options: { list: ['Інтернет', 'Безпека', 'Хмара та ЦОД', 'Поради'] }, validation: (rule) => rule.required() }),
    defineField({ name: 'tags', title: 'Теми', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'excerpt', title: 'Короткий опис', type: 'text', rows: 3, validation: (rule) => rule.required().max(240) }),
    defineField({ name: 'cover', title: 'Обкладинка', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Опис зображення', type: 'string', validation: (rule) => rule.required() })], validation: (rule) => rule.required() }),
    defineField({ name: 'body', title: 'Текст статті', type: 'array', of: [{ type: 'block', styles: [{ title: 'Звичайний текст', value: 'normal' }, { title: 'Підзаголовок', value: 'h2' }, { title: 'Малий заголовок', value: 'h3' }], lists: [{ title: 'Маркований', value: 'bullet' }, { title: 'Нумерований', value: 'number' }], marks: { decorators: [{ title: 'Жирний', value: 'strong' }, { title: 'Курсив', value: 'em' }], annotations: [{ name: 'link', title: 'Посилання', type: 'object', fields: [{ name: 'href', title: 'URL', type: 'url' }] }] } }], validation: (rule) => rule.required().min(1) }),
    defineField({ name: 'titleEn', title: 'English title', type: 'string', group: 'english' }),
    defineField({ name: 'slugEn', title: 'English URL slug', type: 'slug', options: { source: 'titleEn' }, group: 'english' }),
    defineField({ name: 'categoryEn', title: 'English category', type: 'string', group: 'english' }),
    defineField({ name: 'excerptEn', title: 'English summary', type: 'text', rows: 3, group: 'english' }),
    defineField({ name: 'bodyEn', title: 'English article', type: 'array', of: [{ type: 'block' }], group: 'english' }),
    defineField({ name: 'coverAltEn', title: 'English cover description', type: 'string', group: 'english' }),
  ],
  groups: [{ name: 'english', title: 'English translation' }],
  orderings: [{ title: 'Нові спочатку', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'category', media: 'cover' } },
})
