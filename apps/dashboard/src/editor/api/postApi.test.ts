import { describe, it, expect } from 'vitest'
import {
  serializePostForApi,
  assertValidPostPayload,
  sanitizeUrl,
  sanitizeCaption,
  cleanHtmlToText,
  decodeCodeContent,
} from './postApi'
import type { LuminaDocument } from '../types'

describe('postApi - Serialization & Validation Suite', () => {
  it('correctly serializes acceptance test scenario: paragraph, heading, unsplash image, code, S3 image, paragraph, topics', () => {
    const mockDocument: LuminaDocument = {
      id: 'doc-lumina-acceptance',
      title: '✨ Lumina: A New Way to Create and Share Ideas',
      subtitle: 'Lumina is a modern publishing platform for campus builders.',
      version: 1,
      settings: {
        canvasWidth: 680,
        zoom: 100,
        theme: 'dark',
        fontFamily: 'serif',
        lineHeight: 1.6,
        showRulers: false,
        snapToGrid: true,
      },
      metadata: {
        createdAt: '2026-10-04T00:00:00.000Z',
        updatedAt: '2026-10-04T00:00:00.000Z',
        author: {
          id: 'user-ezpZ',
          name: 'sunilkumar User',
        },
        category: 'Technology',
        tags: ['technology', 'lumina', 'open-source', 'campus'],
        visibility: 'college',
        status: 'draft',
        coverImage: 'https://lumino-media.s3.eu-north-1.amazonaws.com/posts/user-ezpZ/cover.jpg',
      },
      blocks: [
        // 1. Paragraph
        {
          id: 'block-1',
          type: 'paragraph',
          content: 'This is the opening paragraph introducing the Lumina architecture and platform.',
          styles: { fontSize: 16 },
        },
        // 2. Heading
        {
          id: 'block-2',
          type: 'heading-2',
          content: 'Building Lumina Architecture',
          styles: { fontWeight: 700 },
        },
        // 3. Unsplash image
        {
          id: 'block-3',
          type: 'image',
          content: '',
          styles: { width: '75%' },
          metadata: {
            url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&auto=format&fit=crop&q=80',
            caption: 'Photo by Getty Images on Unsplash',
          },
        },
        // 4. Code block
        {
          id: 'block-4',
          type: 'code',
          content: "console.log('Hello Lumina');\nconst engine = 'V8';",
          metadata: { language: 'typescript' },
        },
        // 5. S3 uploaded image
        {
          id: 'block-5',
          type: 'image',
          content: '',
          styles: { width: '100%' },
          metadata: {
            mediaId: 'posts/user-ezpZ/diagram.png',
            key: 'posts/user-ezpZ/diagram.png',
            url: 'https://lumino-media.s3.eu-north-1.amazonaws.com/posts/user-ezpZ/diagram.png',
            type: 'IMAGE',
            mimeType: 'image/png',
            size: 1388639,
            width: 1528,
            height: 1029,
            caption: 'System Architecture Flowchart',
          },
        },
        // 6. Another paragraph
        {
          id: 'block-6',
          type: 'paragraph',
          content: 'In conclusion, Lumina provides seamless workflows for student researchers and developers.',
          styles: { fontSize: 16 },
        },
      ],
    }

    const payload = serializePostForApi({
      document: mockDocument,
      title: '✨ Lumina: A New Way to Create and Share Ideas',
      subtitle: 'Lumina is a modern publishing platform for campus builders.',
      coverImage: 'https://lumino-media.s3.eu-north-1.amazonaws.com/posts/user-ezpZ/cover.jpg',
      coverMediaItem: {
        key: 'posts/user-ezpZ/cover.jpg',
        url: 'https://lumino-media.s3.eu-north-1.amazonaws.com/posts/user-ezpZ/cover.jpg',
        type: 'IMAGE',
        mimeType: 'image/jpeg',
        size: 845120,
        width: 1920,
        height: 1080,
        order: 0,
      },
      topics: ['technology', 'lumina', 'open-source', 'campus'],
      visibility: 'college',
      category: 'Technology',
    })

    // Assert validation passes
    expect(() => assertValidPostPayload(payload)).not.toThrow()

    // Assert top-level fields
    expect(payload.title).toBe('✨ Lumina: A New Way to Create and Share Ideas')
    expect(payload.subtitle).toBe('Lumina is a modern publishing platform for campus builders.')
    expect(payload.coverImage).toBe('https://lumino-media.s3.eu-north-1.amazonaws.com/posts/user-ezpZ/cover.jpg')
    expect(payload.visibility).toBe('COLLEGE')
    expect(payload.topics).toEqual(['technology', 'lumina', 'open-source', 'campus'])

    // Assert blocks array
    expect(payload.blocks).toHaveLength(6)

    // Block 1
    expect(payload.blocks[0]).toEqual({
      id: 'block-1',
      type: 'paragraph',
      content: 'This is the opening paragraph introducing the Lumina architecture and platform.',
      styles: { fontSize: 16 },
      metadata: {},
    })

    // Block 2
    expect(payload.blocks[1]).toEqual({
      id: 'block-2',
      type: 'heading',
      content: 'Building Lumina Architecture',
      styles: { level: 2, fontWeight: 700 },
      metadata: {},
    })

    // Block 3 (Unsplash)
    expect(payload.blocks[2]).toEqual({
      id: 'block-3',
      type: 'image',
      content: '',
      styles: { width: '75%' },
      metadata: {
        url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&auto=format&fit=crop&q=80',
        caption: 'Photo by Getty Images on Unsplash',
      },
    })

    // Block 4 (Code)
    expect(payload.blocks[3]).toEqual({
      id: 'block-4',
      type: 'code',
      content: "console.log('Hello Lumina');\nconst engine = 'V8';",
      styles: {},
      metadata: {
        language: 'typescript',
      },
    })

    // Block 5 (S3 Image)
    expect(payload.blocks[4]).toEqual({
      id: 'block-5',
      type: 'image',
      content: '',
      styles: { width: '100%' },
      metadata: {
        mediaId: 'posts/user-ezpZ/diagram.png',
        caption: 'System Architecture Flowchart',
      },
    })

    // Block 6 (Paragraph)
    expect(payload.blocks[5]).toEqual({
      id: 'block-6',
      type: 'paragraph',
      content: 'In conclusion, Lumina provides seamless workflows for student researchers and developers.',
      styles: { fontSize: 16 },
      metadata: {},
    })

    // Assert media array
    expect(payload.media).toHaveLength(2)
    expect(payload.media[0]).toEqual({
      key: 'posts/user-ezpZ/cover.jpg',
      url: 'https://lumino-media.s3.eu-north-1.amazonaws.com/posts/user-ezpZ/cover.jpg',
      type: 'IMAGE',
      mimeType: 'image/jpeg',
      size: 845120,
      width: 1920,
      height: 1080,
      order: 0,
    })
    expect(payload.media[1]).toEqual({
      key: 'posts/user-ezpZ/diagram.png',
      url: 'https://lumino-media.s3.eu-north-1.amazonaws.com/posts/user-ezpZ/diagram.png',
      type: 'IMAGE',
      mimeType: 'image/png',
      size: 1388639,
      width: 1528,
      height: 1029,
      order: 1,
    })

    // Negative constraints
    const jsonString = JSON.stringify(payload)
    expect(jsonString).not.toContain('[https://')
    expect(jsonString).not.toContain('](')
    expect(jsonString).not.toContain('isUploading')
  })

  it('sanitizes markdown fragments and concatenated caption strings safely', () => {
    expect(sanitizeUrl('[https://example.com/img.png](https://example.com/img.png)')).toBe(
      'https://example.com/img.png'
    )
    expect(sanitizeUrl('https://example.com/image.jpg')).toBe('https://example.com/image.jpg')
    expect(sanitizeCaption('Photo by Getty](https://example.com)')).toBe('Photo by Getty')
    expect(sanitizeCaption('Photo by Getty on Unsplash')).toBe('Photo by Getty on Unsplash')
  })

  it('cleans HTML text while preserving code block characters', () => {
    expect(cleanHtmlToText('<b>Hello</b> <p>world</p><br>test&nbsp;content')).toBe(
      'Hello world\n\ntest content'
    )
    expect(decodeCodeContent('console.log(&quot;&lt;div&gt;&quot;);')).toBe('console.log("<div>");')
  })

  it('assertValidPostPayload detects invalid structures and throws descriptive error', () => {
    const invalidPayload: any = {
      title: 'Valid title',
      topics: 'invalid-not-array',
      blocks: [
        {
          id: 'b-1',
          type: 'paragraph',
          content: 'text',
          styles: {},
          metadata: { isUploading: true }, // leaked temporary field
        },
      ],
      media: [],
    }

    expect(() => assertValidPostPayload(invalidPayload)).toThrow(/assertValidPostPayload failed/)
  })

  it('filters out empty placeholder paragraphs when other blocks exist in document', () => {
    const mockDocumentWithEmptyPlaceholders: LuminaDocument = {
      id: 'doc-placeholders',
      title: 'Post with Blank Placeholders',
      version: 1,
      settings: {
        canvasWidth: 680,
        zoom: 100,
        theme: 'dark',
        fontFamily: 'serif',
        lineHeight: 1.6,
        showRulers: false,
        snapToGrid: true,
      },
      metadata: {
        createdAt: '2026-10-04T00:00:00.000Z',
        updatedAt: '2026-10-04T00:00:00.000Z',
        author: { id: 'u1', name: 'Author' },
        category: 'General',
        tags: ['tech'],
        visibility: 'college',
        status: 'draft',
      },
      blocks: [
        { id: 'b-empty-1', type: 'paragraph', content: '' },
        { id: 'b-code-1', type: 'code', content: "console.log('code');", metadata: { language: 'javascript' } },
        { id: 'b-empty-2', type: 'paragraph', content: '   ' },
        { id: 'b-heading-1', type: 'heading-2', content: 'Heading Text' },
        { id: 'b-empty-3', type: 'paragraph', content: '' },
      ],
    }

    const payload = serializePostForApi({
      document: mockDocumentWithEmptyPlaceholders,
      topics: ['tech'],
    })

    expect(payload.blocks).toHaveLength(2)
    expect(payload.blocks[0].type).toBe('code')
    expect(payload.blocks[0].content).toBe("console.log('code');")
    expect(payload.blocks[1].type).toBe('heading')
    expect(payload.blocks[1].content).toBe('Heading Text')
  })
})
