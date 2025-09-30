import { MetadataRoute } from 'next'
import { PLAYFUL_SEO } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'],
    },
    sitemap: `${PLAYFUL_SEO.url}/sitemap.xml`,
  }
}