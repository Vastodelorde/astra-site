import { managerType } from './manager'
import { tariffType } from './tariff'
import { segmentPageType } from './segmentPage'
import { blogPostType } from './blogPost'
import {
  contentItemType,
  contentLinkType,
  contentSectionType,
  localizedStringType,
  localizedTextType,
  managedPageType,
  serviceType,
  siteSettingsType,
} from './siteContent'

export const schemaTypes = [
  localizedStringType,
  localizedTextType,
  contentLinkType,
  contentItemType,
  contentSectionType,
  blogPostType,
  managedPageType,
  serviceType,
  siteSettingsType,
  segmentPageType,
  managerType,
  tariffType,
]
