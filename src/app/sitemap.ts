import { MetadataRoute } from 'next'
import { games } from '@/data/games'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://playful.smarlify.co'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ]

  // Dynamic game pages
  const gamePages = games.map((game) => ({
    url: `${baseUrl}/${game.id}`,
    lastModified: new Date(game.publishedDate || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...gamePages]
}
