import { type SchemaTypeDefinition } from 'sanity'
import newsPost from './schemas/newsPost'
import partner from './schemas/partner'
import siteSettings from './schemas/siteSettings'
import page from './schemas/page'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [newsPost, partner, siteSettings, page],
}
