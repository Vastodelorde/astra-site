import { defineField, defineType } from 'sanity'

export const tariffType = defineType({
  name: 'tariff',
  title: 'Тариф',
  type: 'document',
  fields: [
    defineField({
      name: 'plan',
      title: 'Назва плану',
      type: 'string',
      description: 'Напр. «Бізнес 250»',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'planEn', title: 'Plan name (EN)', type: 'string' }),
    defineField({ name: 'speed', title: 'Швидкість (число)', type: 'string', description: 'Напр. «250»' }),
    defineField({ name: 'unit', title: 'Одиниця', type: 'string', initialValue: 'Мбіт/с' }),
    defineField({ name: 'unitEn', title: 'Unit (EN)', type: 'string', initialValue: 'Mbps' }),
    defineField({
      name: 'guar',
      title: 'Гарантована швидкість',
      type: 'string',
      description: 'Необовʼязково. Напр. «мін. гарант. 2.5 GIGABIT». Показується під швидкістю.',
    }),
    defineField({
      name: 'features',
      title: 'Що входить у тариф',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'featuresEn', title: 'Included features (EN)', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'price', title: 'Ціна', type: 'string', description: 'Напр. «1 000»' }),
    defineField({ name: 'per', title: 'Період', type: 'string', initialValue: 'грн/міс' }),
    defineField({ name: 'perEn', title: 'Period (EN)', type: 'string', initialValue: 'UAH/mo' }),
    defineField({ name: 'order', title: 'Порядок', type: 'number', validation: (rule) => rule.integer().min(0) }),
    defineField({
      name: 'tag',
      title: 'Тег для форми',
      type: 'string',
      description: 'Значення, що підставляється у форму заявки (data-tariff).',
    }),
  ],
  preview: {
    select: { title: 'plan', subtitle: 'price' },
  },
})
