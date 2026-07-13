import { defineField, defineType } from 'sanity'

export const managerType = defineType({
  name: 'manager',
  title: 'Акаунт-менеджер',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Імʼя',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Роль',
      type: 'string',
      initialValue: 'Персональний акаунт-менеджер',
    }),
    defineField({
      name: 'note',
      title: 'Підпис',
      type: 'string',
      initialValue: 'Веде ваші договори, рахунки й технічні питання.',
    }),
    defineField({
      name: 'image',
      title: 'Фото (прозорий PNG, портрет)',
      type: 'image',
      description: 'Виріз людини на прозорому фоні, портрет ~3:4, мін. 520×700.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'alt',
      title: 'Alt (для SEO/доступності)',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'image' },
  },
})
