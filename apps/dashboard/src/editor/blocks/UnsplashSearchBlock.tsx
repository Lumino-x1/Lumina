import React, { useState, useEffect, useRef } from 'react'
import type { LuminaBlock } from '../types'
import { useEditorStore } from '../state/editorStore'

export interface UnsplashPhoto {
  id: string
  url: string
  thumbUrl?: string
  author: string
  alt: string
}

export async function searchLivePhotos(
  query: string,
  page: number
): Promise<{ photos: UnsplashPhoto[]; total: number; totalPages: number }> {
  const q = encodeURIComponent(query.trim())
  if (!q) {
    return { photos: [], total: 0, totalPages: 0 }
  }

  // 1. Try Vite dev server proxy to Unsplash NAPI (Live real Unsplash photos)
  try {
    const res = await fetch(
      `/api/unsplash/search/photos?query=${q}&per_page=9&page=${page}`,
      { headers: { Accept: 'application/json' } }
    )
    if (res.ok) {
      const data = await res.json()
      if (data && Array.isArray(data.results) && data.results.length > 0) {
        const photos: UnsplashPhoto[] = data.results.map((item: any) => {
          const author =
            item.user?.name || item.user?.username || 'Unsplash Photographer'
          const rawUrl =
            item.urls?.regular || item.urls?.full || item.urls?.small
          const thumbUrl =
            item.urls?.small || item.urls?.thumb || item.urls?.regular
          return {
            id: item.id || `un-${Math.random()}`,
            url: rawUrl,
            thumbUrl: thumbUrl,
            author,
            alt: item.alt_description || item.description || query,
          }
        })
        return {
          photos,
          total: data.total || photos.length,
          totalPages: data.total_pages || Math.ceil((data.total || photos.length) / 9),
        }
      }
    }
  } catch (err) {
    // fallback
  }

  // 2. Direct Unsplash NAPI fetch fallback
  try {
    const res = await fetch(
      `https://unsplash.com/napi/search/photos?query=${q}&per_page=9&page=${page}`
    )
    if (res.ok) {
      const data = await res.json()
      if (data && Array.isArray(data.results) && data.results.length > 0) {
        const photos: UnsplashPhoto[] = data.results.map((item: any) => ({
          id: item.id || `un-${Math.random()}`,
          url: item.urls?.regular || item.urls?.full || item.urls?.small,
          thumbUrl: item.urls?.small || item.urls?.thumb || item.urls?.regular,
          author:
            item.user?.name || item.user?.username || 'Unsplash Photographer',
          alt: item.alt_description || item.description || query,
        }))
        return {
          photos,
          total: data.total || photos.length,
          totalPages: data.total_pages || Math.ceil((data.total || photos.length) / 9),
        }
      }
    }
  } catch (err) {
    // fallback
  }

  // 3. Fallback to Wikimedia Commons (Public CORS-enabled real image search)
  try {
    const res = await fetch(
      `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${q}&gsrlimit=9&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800&format=json&origin=*`
    )
    if (res.ok) {
      const data = await res.json()
      if (data?.query?.pages) {
        const pages = Object.values(data.query.pages) as any[]
        const photos: UnsplashPhoto[] = pages
          .map((p) => {
            const ii = p.imageinfo?.[0]
            if (!ii?.thumburl && !ii?.url) return null
            const rawArtist =
              ii.extmetadata?.Artist?.value?.replace(/<[^>]*>?/gm, '') ||
              'Photographer'
            const author =
              rawArtist.length > 25 ? rawArtist.slice(0, 25) + '...' : rawArtist
            return {
              id: `wiki-${p.pageid}`,
              url: ii.thumburl || ii.url,
              thumbUrl: ii.thumburl || ii.url,
              author,
              alt: p.title || query,
            }
          })
          .filter(Boolean) as UnsplashPhoto[]

        if (photos.length > 0) {
          return {
            photos,
            total: Math.max(photos.length * 12, 100),
            totalPages: 5,
          }
        }
      }
    }
  } catch (err) {
    // fallback
  }

  return { photos: [], total: 0, totalPages: 0 }
}

interface UnsplashSearchBlockProps {
  block: LuminaBlock
  isSelected: boolean
}

export const UnsplashSearchBlock: React.FC<UnsplashSearchBlockProps> = ({
  block,
}) => {
  const { document, updateBlock, addBlock, setSelectedBlockId } =
    useEditorStore()

  const [query, setQuery] = useState(block.metadata?.query || '')
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Focus search input on mount
    inputRef.current?.focus()

    // If block already has a query saved, execute search for it
    if (block.metadata?.query && block.metadata.query.trim().length > 0) {
      performSearch(block.metadata.query.trim(), 1)
    }
  }, [])

  const performSearch = async (searchQuery: string, pageNum: number) => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setHasSearched(true)
    setSelectedPhotoId(null)
    updateBlock(block.id, {
      metadata: { ...block.metadata, query: searchQuery.trim() },
    })

    try {
      const result = await searchLivePhotos(searchQuery, pageNum)
      setPhotos(result.photos)
      setTotalCount(result.total)
      setTotalPages(result.totalPages)
      setPage(pageNum)
    } catch (err) {
      setPhotos([])
      setTotalCount(0)
      setTotalPages(0)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      if (query.trim()) {
        performSearch(query.trim(), 1)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      // Revert to empty paragraph
      updateBlock(block.id, {
        type: 'paragraph',
        content: '',
        metadata: {},
      })
    } else if (e.key === 'Backspace' && query === '') {
      e.preventDefault()
      e.stopPropagation()
      // Revert to empty paragraph
      updateBlock(block.id, {
        type: 'paragraph',
        content: '',
        metadata: {},
      })
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && query.trim()) {
      performSearch(query.trim(), newPage)
    }
  }

  const handleSelectPhoto = (photo: UnsplashPhoto) => {
    // 1. Transform this block into an image block with photographer credit
    updateBlock(block.id, {
      type: 'image',
      content: '',
      metadata: {
        url: photo.url,
        caption: `Photo by ${photo.author} on Unsplash`,
      },
    })

    // 2. Ensure an empty paragraph exists directly below and focus it
    const idx = document.blocks.findIndex((b) => b.id === block.id)
    const nextBlock = document.blocks[idx + 1]
    if (
      !nextBlock ||
      nextBlock.type !== 'paragraph' ||
      nextBlock.content.trim() !== ''
    ) {
      const nextPara = addBlock('paragraph', block.id, { content: '' })
      setSelectedBlockId(nextPara.id)
      setTimeout(() => {
        const el = window.document.querySelector<HTMLElement>(
          `[data-block-id="${nextPara.id}"] [contenteditable="true"], [data-block-id="${nextPara.id}"].lumina-paragraph`
        )
        if (el) el.focus()
      }, 40)
    } else {
      setSelectedBlockId(nextBlock.id)
      setTimeout(() => {
        const el = window.document.querySelector<HTMLElement>(
          `[data-block-id="${nextBlock.id}"] [contenteditable="true"], [data-block-id="${nextBlock.id}"].lumina-paragraph`
        )
        if (el) el.focus()
      }, 40)
    }
  }

  return (
    <div className="lumina-unsplash-block" onClick={(e) => e.stopPropagation()}>
      {/* 1. Inline Search Prompt Input with bottom underline line */}
      <div className="unsplash-search-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type keywords to search Unsplash, and press Enter"
          className="unsplash-search-input"
        />
      </div>

      {/* 2. Loading State */}
      {isLoading && (
        <div className="unsplash-loading-indicator">
          <span>Searching live photos for &quot;{query}&quot;...</span>
        </div>
      )}

      {/* 3. Results Header and 3-Column Grid */}
      {!isLoading && hasSearched && photos.length > 0 && (
        <div className="unsplash-results-container">
          <div className="unsplash-meta-bar">
            <span className="unsplash-meta-count">
              {totalCount.toLocaleString()} results
            </span>
            <div className="unsplash-meta-nav">
              {page > 1 && (
                <button
                  type="button"
                  className="unsplash-meta-nav-btn"
                  onClick={() => handlePageChange(page - 1)}
                >
                  Prev
                </button>
              )}
              {page < totalPages && (
                <button
                  type="button"
                  className="unsplash-meta-nav-btn"
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </button>
              )}
            </div>
          </div>

          <div className="unsplash-grid">
            {photos.map((photo, i) => {
              const isSelected =
                selectedPhotoId === photo.id || (!selectedPhotoId && i === 0)

              return (
                <div
                  key={photo.id}
                  className={`unsplash-card ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleSelectPhoto(photo)}
                  onMouseEnter={() => setSelectedPhotoId(photo.id)}
                  title={`Select photo by ${photo.author}`}
                >
                  <img
                    src={photo.thumbUrl || photo.url}
                    alt={photo.alt}
                    className="unsplash-card-img"
                    loading="lazy"
                  />
                  <div className="unsplash-author-overlay">{photo.author}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* 4. Empty Results */}
      {!isLoading && hasSearched && photos.length === 0 && (
        <div className="unsplash-empty-notice">
          <span>No live photos found for &quot;{query}&quot;. Try another search term.</span>
        </div>
      )}
    </div>
  )
}
