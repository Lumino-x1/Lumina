import type { LuminaDocument, LuminaBlock, BlockStyles } from '../types'
import type { UploadedMediaItem } from './mediaApi'

export interface ApiBlock {
  id: string
  type: string
  content: string
  styles: Record<string, any>
  metadata: Record<string, any>
}

export interface ApiMediaItem {
  key: string
  url: string
  type: 'IMAGE' | 'VIDEO'
  mimeType: string
  size: number
  width: number | null
  height: number | null
  order: number
  duration?: number | null
}

export interface ApiPostPayload {
  title?: string
  subtitle?: string
  coverImage?: string
  category?: string
  topics: string[]
  visibility: 'PUBLIC' | 'COLLEGE' | 'FRIENDS' | 'PRIVATE'
  anonymous: boolean
  location?: string
  content?: string
  blocks: ApiBlock[]
  media: ApiMediaItem[]
}

export interface SerializePostOptions {
  document: LuminaDocument
  title?: string
  subtitle?: string
  coverImage?: string
  coverMediaItem?: UploadedMediaItem | null
  topics?: string[]
  category?: string
  visibility?: string
  anonymous?: boolean
  location?: string
}

/**
 * Strips markdown link syntax [url](url) or [caption](url) and extracts clean URL.
 * Guarantees no markdown brackets or fragments in URLs.
 */
export function sanitizeUrl(rawUrl?: unknown): string {
  if (typeof rawUrl !== 'string') return ''
  let url = rawUrl.trim()

  if (!url) return ''

  // If formatted as markdown link [label](url), extract url
  const mdMatch = url.match(/\[.*?\]\((https?:\/\/[^\s\)]+)\)/i)
  if (mdMatch) {
    url = mdMatch[1]
  }

  // Remove leading/trailing brackets, parentheses, or quotes
  url = url.replace(/^[\[\("']+|[\]\)"']+$/g, '').trim()

  return url
}

/**
 * Removes accidental markdown fragments and stray brackets from caption strings.
 */
export function sanitizeCaption(rawCaption?: unknown): string {
  if (typeof rawCaption !== 'string') return ''
  let caption = rawCaption.trim()

  if (!caption) return ''

  // Remove trailing markdown link fragments like ](https://...)
  caption = caption.replace(/\]\(https?:\/\/[^\s\)]+\)/g, '')
  // Remove unbalanced square brackets
  caption = caption.replace(/\[|\]/g, '').trim()

  return caption
}

/**
 * Converts rich text HTML from contenteditable into clean, structured text.
 * Preserves line breaks and decodes HTML entities cleanly.
 */
export function cleanHtmlToText(raw?: string): string {
  if (!raw) return ''

  let text = raw
    // Convert paragraph endings and line breaks to newlines
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<\/div>/gi, '\n')
    .replace(/<div[^>]*>/gi, '')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li[^>]*>/gi, '')
    // Decode common HTML entities
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    // Remove all remaining HTML tags
    .replace(/<[^>]+>/g, '')

  // Remove accidental markdown link duplicates like [https://...](https://...)
  text = text.replace(/\[(https?:\/\/[^\]]+)\]\(\1\)/g, '$1')

  return text.trim()
}

/**
 * Decodes HTML entities from code blocks without altering indentation or code characters.
 */
export function decodeCodeContent(raw?: string): string {
  if (!raw) return ''

  return raw
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<div[^>]*>/gi, '')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<\/p>/gi, '\n')
    .replace(/<code[^>]*>/gi, '')
    .replace(/<\/code>/gi, '')
    .replace(/<span[^>]*>/gi, '')
    .replace(/<\/span>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
}

/**
 * Filters and cleans style objects, discarding temporary or UI-only properties.
 */
function cleanStyles(styles?: BlockStyles): Record<string, any> {
  if (!styles) return {}

  const allowedKeys: (keyof BlockStyles)[] = [
    'fontFamily',
    'fontSize',
    'fontWeight',
    'color',
    'backgroundColor',
    'textAlign',
    'lineHeight',
    'letterSpacing',
    'borderRadius',
    'borderColor',
    'borderWidth',
    'padding',
    'width',
    'height',
    'opacity',
    'boxShadow',
  ]

  const result: Record<string, any> = {}
  for (const key of allowedKeys) {
    if (styles[key] !== undefined && styles[key] !== null) {
      result[key] = styles[key]
    }
  }

  return result
}

/**
 * Normalizes an editor block into the clean API Block contract.
 * Extracts S3 media metadata into the media list and keeps the block metadata lean.
 */
function serializeBlock(
  block: LuminaBlock,
  orderIndex: number,
  addMediaItem: (item: ApiMediaItem) => void
): ApiBlock | null {
  const baseStyles = cleanStyles(block.styles)

  // Normalize block types
  switch (block.type) {
    case 'heading-1':
    case 'heading-2':
    case 'heading-3':
    case 'heading-4': {
      const levelMap: Record<string, number> = {
        'heading-1': 1,
        'heading-2': 2,
        'heading-3': 3,
        'heading-4': 4,
      }
      return {
        id: block.id,
        type: 'heading',
        content: cleanHtmlToText(block.content),
        styles: {
          ...baseStyles,
          level: levelMap[block.type] || 1,
        },
        metadata: {},
      }
    }

    case 'paragraph': {
      return {
        id: block.id,
        type: 'paragraph',
        content: cleanHtmlToText(block.content),
        styles: baseStyles,
        metadata: {},
      }
    }

    case 'code': {
      return {
        id: block.id,
        type: 'code',
        content: decodeCodeContent(block.content),
        styles: baseStyles,
        metadata: {
          language: block.metadata?.language || 'javascript',
        },
      }
    }

    case 'image': {
      const caption = sanitizeCaption(block.metadata?.caption)
      const imageWidth = block.styles?.width ? String(block.styles.width) : '100%'

      // Check if image is an uploaded S3 asset
      if (block.metadata?.key && block.metadata?.url) {
        const cleanKey = block.metadata.key.trim()
        const cleanUrl = sanitizeUrl(block.metadata.url)

        addMediaItem({
          key: cleanKey,
          url: cleanUrl,
          type: 'IMAGE',
          mimeType: block.metadata.mimeType || 'image/jpeg',
          size: Number(block.metadata.size) || 0,
          width: block.metadata.width ?? null,
          height: block.metadata.height ?? null,
          order: orderIndex,
        })

        return {
          id: block.id,
          type: 'image',
          content: '',
          styles: {
            ...baseStyles,
            width: imageWidth,
          },
          metadata: {
            mediaId: block.metadata.mediaId || cleanKey,
            caption,
          },
        }
      }

      // External / Unsplash image URL
      const cleanUrl = sanitizeUrl(block.metadata?.url || block.metadata?.publicUrl || block.content)
      return {
        id: block.id,
        type: 'image',
        content: '',
        styles: {
          ...baseStyles,
          width: imageWidth,
        },
        metadata: {
          ...(cleanUrl ? { url: cleanUrl } : {}),
          caption,
        },
      }
    }

    case 'unsplash': {
      // Unsplash search block converted to image
      const cleanUrl = sanitizeUrl(block.metadata?.url || block.content)
      const caption = sanitizeCaption(block.metadata?.caption)

      return {
        id: block.id,
        type: 'image',
        content: '',
        styles: {
          ...baseStyles,
          width: '100%',
        },
        metadata: {
          ...(cleanUrl ? { url: cleanUrl } : {}),
          caption,
        },
      }
    }

    case 'video': {
      const cleanUrl = sanitizeUrl(block.metadata?.url || block.content)
      const caption = sanitizeCaption(block.metadata?.caption)

      if (block.metadata?.key && block.metadata?.url) {
        const cleanKey = block.metadata.key.trim()
        addMediaItem({
          key: cleanKey,
          url: cleanUrl,
          type: 'VIDEO',
          mimeType: block.metadata.mimeType || 'video/mp4',
          size: Number(block.metadata.size) || 0,
          width: block.metadata.width ?? null,
          height: block.metadata.height ?? null,
          order: orderIndex,
        })
      }

      return {
        id: block.id,
        type: 'video',
        content: cleanUrl,
        styles: baseStyles,
        metadata: {
          url: cleanUrl,
          caption,
        },
      }
    }

    case 'quote': {
      return {
        id: block.id,
        type: 'quote',
        content: cleanHtmlToText(block.content),
        styles: baseStyles,
        metadata: {},
      }
    }

    case 'callout': {
      return {
        id: block.id,
        type: 'callout',
        content: cleanHtmlToText(block.content),
        styles: baseStyles,
        metadata: {},
      }
    }

    case 'bullet-list': {
      return {
        id: block.id,
        type: 'bullet-list',
        content: cleanHtmlToText(block.content),
        styles: baseStyles,
        metadata: {
          ...(block.metadata?.indent ? { indent: Number(block.metadata.indent) } : {}),
        },
      }
    }

    case 'number-list': {
      return {
        id: block.id,
        type: 'number-list',
        content: cleanHtmlToText(block.content),
        styles: baseStyles,
        metadata: {
          ...(block.metadata?.indent ? { indent: Number(block.metadata.indent) } : {}),
        },
      }
    }

    case 'checklist': {
      return {
        id: block.id,
        type: 'checklist',
        content: cleanHtmlToText(block.content),
        styles: baseStyles,
        metadata: {
          checked: Boolean(block.metadata?.checked),
        },
      }
    }

    case 'divider': {
      return {
        id: block.id,
        type: 'divider',
        content: '',
        styles: {},
        metadata: {},
      }
    }

    case 'table':
    case 'gallery':
    case 'embed':
    case 'campus-event':
    case 'internship':
    case 'profile-card':
    case 'club-card':
    case 'achievement':
    case 'announcement': {
      const safeMetadata = { ...(block.metadata || {}) }
      delete safeMetadata.isUploading
      delete safeMetadata.isDragging

      return {
        id: block.id,
        type: block.type,
        content: typeof block.content === 'string' ? cleanHtmlToText(block.content) : '',
        styles: baseStyles,
        metadata: safeMetadata,
      }
    }

    default: {
      return {
        id: block.id,
        type: block.type,
        content: typeof block.content === 'string' ? cleanHtmlToText(block.content) : '',
        styles: baseStyles,
        metadata: {},
      }
    }
  }
}

/**
 * Synchronizes any unsaved live DOM innerText / innerHTML directly from the rendered document sheet
 * into the blocks list. Ensures 100% of user-typed content (such as code block text or paragraph input)
 * is captured even if a blur or key event has not completed.
 */
export function syncLiveDomToBlocks(blocks: LuminaBlock[]): LuminaBlock[] {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return blocks
  }

  return blocks.map((block) => {
    try {
      const blockEl = window.document.querySelector(`[data-block-id="${block.id}"]`)
      if (!blockEl) return block

      if (block.type === 'code') {
        const codeEl = blockEl.querySelector('code, pre')
        if (codeEl) {
          const liveText = (codeEl as HTMLElement).innerText || ''
          if (liveText && liveText !== block.content) {
            return { ...block, content: liveText }
          }
        }
      } else if (
        [
          'paragraph',
          'heading-1',
          'heading-2',
          'heading-3',
          'heading-4',
          'quote',
          'callout',
          'bullet-list',
          'number-list',
          'checklist',
        ].includes(block.type)
      ) {
        const editableEl = blockEl.querySelector<HTMLElement>(
          '[contenteditable="true"], .lumina-paragraph, [contenteditable]'
        )
        if (editableEl) {
          const liveHtml = editableEl.innerHTML || ''
          const liveText = editableEl.innerText || ''
          if (liveText.trim() && liveHtml !== block.content) {
            return { ...block, content: liveHtml }
          }
        }
      }
    } catch {
      // fallback to existing block state
    }
    return block
  })
}

/**
 * Primary Post Serialization Function
 * Converts the live editor state into ONE clean, structured JavaScript object matching the backend contract.
 */
export function serializePostForApi(options: SerializePostOptions): ApiPostPayload {
  const { document, coverMediaItem } = options

  // 1. Clean Title & Subtitle
  const rawTitle = options.title !== undefined ? options.title : document.title
  const rawSubtitle = options.subtitle !== undefined ? options.subtitle : document.subtitle

  const cleanTitle = cleanHtmlToText(rawTitle)
  const cleanSubtitle = cleanHtmlToText(rawSubtitle)

  // 2. Clean Cover Image
  let cleanCoverUrl: string | undefined
  if (options.coverImage) {
    const sanitized = sanitizeUrl(options.coverImage)
    if (sanitized && (sanitized.startsWith('http://') || sanitized.startsWith('https://'))) {
      cleanCoverUrl = sanitized
    }
  } else if (document.metadata.coverImage) {
    const sanitized = sanitizeUrl(document.metadata.coverImage)
    if (sanitized && (sanitized.startsWith('http://') || sanitized.startsWith('https://'))) {
      cleanCoverUrl = sanitized
    }
  }

  // 3. Media Map (keyed by S3 key to prevent any duplicate media entries)
  const mediaMap = new Map<string, ApiMediaItem>()

  // If cover image was an S3-uploaded asset, register in mediaMap
  if (coverMediaItem?.key && coverMediaItem?.url) {
    const cleanKey = coverMediaItem.key.trim()
    const cleanUrl = sanitizeUrl(coverMediaItem.url)
    mediaMap.set(cleanKey, {
      key: cleanKey,
      url: cleanUrl,
      type: 'IMAGE',
      mimeType: coverMediaItem.mimeType || 'image/jpeg',
      size: Number(coverMediaItem.size) || 0,
      width: coverMediaItem.width ?? null,
      height: coverMediaItem.height ?? null,
      order: 0,
    })
  }

  const addMediaItem = (item: ApiMediaItem) => {
    if (!item.key || !item.url) return
    if (!mediaMap.has(item.key)) {
      mediaMap.set(item.key, item)
    }
  }

  // 4. Synchronize live DOM values & serialize blocks (preserving exact document ordering)
  const syncedBlocks = syncLiveDomToBlocks(document.blocks || [])
  const apiBlocks: ApiBlock[] = []

  syncedBlocks.forEach((block, index) => {
    const serialized = serializeBlock(block, index + 1, addMediaItem)
    if (serialized) {
      apiBlocks.push(serialized)
    }
  })

  // Filter out completely blank placeholder paragraphs if other content/media blocks exist
  const hasOtherMeaningfulBlocks = apiBlocks.some(
    (b) => b.type !== 'paragraph' || b.content.trim() !== ''
  )
  const filteredBlocks = hasOtherMeaningfulBlocks
    ? apiBlocks.filter((b) => b.type !== 'paragraph' || b.content.trim() !== '')
    : apiBlocks

  // 5. Build Content Summary String
  const textSummary = filteredBlocks
    .filter((b) =>
      ['paragraph', 'heading', 'quote', 'callout', 'bullet-list', 'number-list', 'checklist', 'code'].includes(
        b.type
      )
    )
    .map((b) => b.content)
    .filter(Boolean)
    .join('\n\n')

  // 6. Clean Topics (max 20, deduplicated strings)
  const rawTopics = options.topics || document.metadata.tags || []
  const cleanTopics = Array.from(
    new Set(
      rawTopics
        .map((t) => (typeof t === 'string' ? t.trim() : ''))
        .filter((t) => t.length > 0)
    )
  ).slice(0, 20)

  // 7. Visibility Mapping
  const visibilityKey = (options.visibility || document.metadata.visibility || 'public').toLowerCase()
  const visibilityMap: Record<string, 'PUBLIC' | 'COLLEGE' | 'FRIENDS' | 'PRIVATE'> = {
    public: 'PUBLIC',
    college: 'COLLEGE',
    department: 'COLLEGE',
    friends: 'FRIENDS',
    private: 'PRIVATE',
  }
  const visibility = visibilityMap[visibilityKey] || 'PUBLIC'

  // 8. Assemble Deduplicated Media Array with normalized sequential order
  const finalMedia: ApiMediaItem[] = Array.from(mediaMap.values()).map((item, idx) => ({
    ...item,
    order: idx,
  }))

  const payload: ApiPostPayload = {
    title: cleanTitle || undefined,
    subtitle: cleanSubtitle || undefined,
    coverImage: cleanCoverUrl || undefined,
    category: options.category || document.metadata.category || undefined,
    topics: cleanTopics,
    visibility,
    anonymous: options.anonymous ?? false,
    location: options.location || undefined,
    content: textSummary || undefined,
    blocks: filteredBlocks,
    media: finalMedia,
  }

  return payload
}

/**
 * Validates the serialized post payload against the API contract.
 * Checks for corrupted markdown URLs, duplicate keys, browser object leaks, etc.
 */
export function assertValidPostPayload(payload: ApiPostPayload): void {
  const errors: string[] = []

  // Check Title
  if (payload.title !== undefined && typeof payload.title !== 'string') {
    errors.push(`title must be a string or undefined, received ${typeof payload.title}`)
  }

  // Check Subtitle
  if (payload.subtitle !== undefined && typeof payload.subtitle !== 'string') {
    errors.push(`subtitle must be a string or undefined, received ${typeof payload.subtitle}`)
  }

  // Check Cover Image
  if (payload.coverImage !== undefined) {
    if (typeof payload.coverImage !== 'string') {
      errors.push(`coverImage must be a string, received ${typeof payload.coverImage}`)
    } else {
      if (payload.coverImage.startsWith('[') || payload.coverImage.includes('](')) {
        errors.push(`coverImage contains invalid markdown URL formatting: "${payload.coverImage}"`)
      }
      if (payload.coverImage.startsWith('blob:') || payload.coverImage.startsWith('data:')) {
        errors.push(`coverImage contains un-uploaded blob/data URI: "${payload.coverImage.slice(0, 30)}..."`)
      }
    }
  }

  // Check Topics
  if (!Array.isArray(payload.topics)) {
    errors.push('topics must be an array')
  } else {
    for (const [i, topic] of payload.topics.entries()) {
      if (typeof topic !== 'string' || !topic.trim()) {
        errors.push(`topics[${i}] must be a non-empty string`)
      }
    }
  }

  // Check Blocks
  if (!Array.isArray(payload.blocks)) {
    errors.push('blocks must be an array')
  } else {
    const blockIdSet = new Set<string>()

    for (const [i, block] of payload.blocks.entries()) {
      if (!block || typeof block !== 'object') {
        errors.push(`blocks[${i}] is not an object`)
        continue
      }

      if (!block.id || typeof block.id !== 'string') {
        errors.push(`blocks[${i}].id must be a non-empty string`)
      } else {
        if (blockIdSet.has(block.id)) {
          errors.push(`Duplicate block id detected: "${block.id}" at index ${i}`)
        }
        blockIdSet.add(block.id)
      }

      if (!block.type || typeof block.type !== 'string') {
        errors.push(`blocks[${i}].type must be a non-empty string`)
      }

      if (typeof block.content !== 'string') {
        errors.push(`blocks[${i}].content must be a string`)
      }

      if (typeof block.styles !== 'object' || block.styles === null || Array.isArray(block.styles)) {
        errors.push(`blocks[${i}].styles must be an object`)
      }

      if (typeof block.metadata !== 'object' || block.metadata === null || Array.isArray(block.metadata)) {
        errors.push(`blocks[${i}].metadata must be an object`)
      }

      // Check for temporary UI leaks
      if ('isUploading' in block.metadata || 'isUploading' in (block as any)) {
        errors.push(`blocks[${i}] contains temporary "isUploading" field`)
      }

      // Check for markdown fragments in metadata URLs
      if (typeof block.metadata?.url === 'string') {
        if (block.metadata.url.startsWith('[') || block.metadata.url.includes('](')) {
          errors.push(`blocks[${i}].metadata.url contains markdown syntax: "${block.metadata.url}"`)
        }
      }

      // Check for caption markdown fragments
      if (typeof block.metadata?.caption === 'string') {
        if (block.metadata.caption.includes('](')) {
          errors.push(`blocks[${i}].metadata.caption contains concatenated markdown: "${block.metadata.caption}"`)
        }
      }
    }
  }

  // Check Media
  if (!Array.isArray(payload.media)) {
    errors.push('media must be an array')
  } else {
    const mediaKeySet = new Set<string>()

    for (const [i, mediaItem] of payload.media.entries()) {
      if (!mediaItem || typeof mediaItem !== 'object') {
        errors.push(`media[${i}] is not an object`)
        continue
      }

      if (!mediaItem.key || typeof mediaItem.key !== 'string') {
        errors.push(`media[${i}].key must be a non-empty string`)
      } else {
        if (mediaKeySet.has(mediaItem.key)) {
          errors.push(`Duplicate media key detected: "${mediaItem.key}" at index ${i}`)
        }
        mediaKeySet.add(mediaItem.key)
      }

      if (!mediaItem.url || typeof mediaItem.url !== 'string') {
        errors.push(`media[${i}].url must be a valid URL string`)
      } else if (mediaItem.url.startsWith('[') || mediaItem.url.includes('](')) {
        errors.push(`media[${i}].url contains markdown URL formatting: "${mediaItem.url}"`)
      }

      if (!['IMAGE', 'VIDEO'].includes(mediaItem.type)) {
        errors.push(`media[${i}].type must be 'IMAGE' or 'VIDEO', received "${mediaItem.type}"`)
      }
    }
  }

  // Check for any File or Blob instances leaked into JSON structure
  const checkForBlobOrFile = (obj: any, path: string) => {
    if (!obj || typeof obj !== 'object') return
    if (typeof File !== 'undefined' && obj instanceof File) {
      errors.push(`File object detected at payload path: ${path}`)
    }
    if (typeof Blob !== 'undefined' && obj instanceof Blob) {
      errors.push(`Blob object detected at payload path: ${path}`)
    }
    for (const key of Object.keys(obj)) {
      checkForBlobOrFile(obj[key], `${path}.${key}`)
    }
  }

  checkForBlobOrFile(payload, 'payload')

  if (errors.length > 0) {
    const errorMsg = `assertValidPostPayload failed with ${errors.length} validation errors:\n- ${errors.join('\n- ')}`
    console.error('[Post Serialization Error]', errorMsg, payload)
    throw new Error(errorMsg)
  }
}

/**
 * Makes the HTTP POST request to /api/posts with the clean serialized JSON payload.
 */
export async function createPostApi(payload: ApiPostPayload): Promise<any> {
  // Validate payload in development / runtime before network dispatch
  assertValidPostPayload(payload)

  const envUrl = (import.meta.env.VITE_API_URL as string) || ''
  const baseUrl = envUrl ? envUrl.replace(/\/$/, '') : 'http://localhost:3002'

  const origin =
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Origin: origin,
  }

  try {
    const token =
      localStorage.getItem('lumina_session_token') ||
      localStorage.getItem('better-auth.session_token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  } catch {
    // ignore storage access errors
  }

  if (import.meta.env.DEV) {
    console.info('[POST /api/posts Request Payload]', JSON.stringify(payload, null, 2))
  }

  const response = await fetch(`${baseUrl}/api/posts`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify(payload),
  })

  const responseBody = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      responseBody?.message ||
        responseBody?.detail ||
        `Publishing failed with status ${response.status}.`
    )
  }

  return responseBody
}
