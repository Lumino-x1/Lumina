import { describe, it, expect } from 'vitest'
import { searchLivePhotos, CURATED_UNSPLASH_CATALOG } from './unsplashCatalog'

describe('unsplashCatalog & searchLivePhotos', () => {
  it('returns empty result for empty or whitespace query', async () => {
    const res = await searchLivePhotos('', 1)
    expect(res.photos).toHaveLength(0)
    expect(res.total).toBe(0)
    expect(res.totalPages).toBe(0)

    const whitespaceRes = await searchLivePhotos('   ', 1)
    expect(whitespaceRes.photos).toHaveLength(0)
  })

  it('matches curated Unsplash photos for common topics', async () => {
    const res = await searchLivePhotos('nature', 1)
    expect(res.photos.length).toBeGreaterThan(0)
    expect(res.photos[0].url).toContain('images.unsplash.com')
    expect(res.photos[0].author).toBeTruthy()
    expect(res.photos[0].alt).toBeTruthy()
  })

  it('correctly matches coding and technology keywords', async () => {
    const res = await searchLivePhotos('code', 1)
    expect(res.photos.length).toBeGreaterThan(0)
    expect(res.photos.some((p) => p.alt.toLowerCase().includes('code') || p.alt.toLowerCase().includes('macbook'))).toBe(true)
  })

  it('correctly matches academic and campus keywords', async () => {
    const res = await searchLivePhotos('campus', 1)
    expect(res.photos.length).toBeGreaterThan(0)
    expect(res.photos[0].url).toContain('images.unsplash.com')
  })

  it('handles pagination properly', async () => {
    const page1 = await searchLivePhotos('nature', 1)
    if (page1.totalPages > 1) {
      const page2 = await searchLivePhotos('nature', 2)
      expect(page2.photos.length).toBeGreaterThan(0)
      expect(page2.photos[0].id).not.toBe(page1.photos[0].id)
    }
  })

  it('verifies that curated catalog entries have required fields', () => {
    expect(CURATED_UNSPLASH_CATALOG.length).toBeGreaterThanOrEqual(30)
    for (const item of CURATED_UNSPLASH_CATALOG) {
      expect(item.id).toBeTruthy()
      expect(item.author).toBeTruthy()
      expect(item.alt).toBeTruthy()
      expect(Array.isArray(item.tags)).toBe(true)
      expect(item.tags.length).toBeGreaterThan(0)
    }
  })
})
