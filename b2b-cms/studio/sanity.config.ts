import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'astra-b2b',
  title: 'Astra B2B CMS',
  projectId: 'tya427q1',
  dataset: 'production',
  plugins: [structureTool({
    structure: (S) => S.list()
      .title('Astra B2B CMS')
      .items([
        S.listItem().title('Налаштування сайту').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
        S.listItem().title('Головна сторінка').child(S.document().schemaType('managedPage').documentId('managedPage-home')),
        S.listItem().title('Сторінка послуг').child(S.document().schemaType('managedPage').documentId('managedPage-services')),
        S.listItem().title('Сторінка тарифів').child(S.document().schemaType('managedPage').documentId('managedPage-pricing')),
        S.listItem().title('Сторінка контактів').child(S.document().schemaType('managedPage').documentId('managedPage-contacts')),
        S.divider(),
        S.documentTypeListItem('blogPost').title('Статті блогу'),
        S.documentTypeListItem('service').title('Послуги'),
        S.documentTypeListItem('tariff').title('Тарифи'),
        S.documentTypeListItem('manager').title('Акаунт-менеджери'),
        S.documentTypeListItem('segmentPage').title('Сторінки сегментів'),
      ]),
  })],
  schema: {
    types: schemaTypes,
  },
})
