import React, { useState, useRef, useEffect } from 'react'
import type { LuminaBlock } from '../types'
import { useEditorStore } from '../state/editorStore'

interface VideoBlockProps {
  block: LuminaBlock
  isSelected: boolean
}

export type VideoSourceType =
  | 'youtube'
  | 'vimeo'
  | 'dailymotion'
  | 'loom'
  | 'twitch'
  | 'streamable'
  | 'wistia'
  | 'gdrive'
  | 'ted'
  | 'html5'
  | 'generic'

export interface ParsedVideo {
  type: VideoSourceType
  embedUrl: string
  originalUrl: string
}

export function parseVideoUrl(rawUrl: string): ParsedVideo {
  const url = (rawUrl || '').trim()
  if (!url) {
    return { type: 'generic', embedUrl: '', originalUrl: '' }
  }

  // Ensure protocol
  const fullUrl = url.match(/^https?:\/\//i) ? url : `https://${url}`

  // 1. YouTube: handles watch?v=, youtu.be/, embed/, shorts/, live/, v/
  const ytMatch = fullUrl.match(
    /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([\w-]{11})/i
  )
  if (ytMatch) {
    const videoId = ytMatch[1]
    const tMatch = fullUrl.match(/[?&]t=([0-9a-zA-Z]+)/)
    let startParam = ''
    if (tMatch) {
      const tVal = tMatch[1]
      if (/^\d+$/.test(tVal)) {
        startParam = `&start=${tVal}`
      } else {
        const m = tVal.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/)
        if (m) {
          const h = parseInt(m[1] || '0', 10)
          const min = parseInt(m[2] || '0', 10)
          const sec = parseInt(m[3] || '0', 10)
          const totalSec = h * 3600 + min * 60 + sec
          if (totalSec > 0) startParam = `&start=${totalSec}`
        }
      }
    }
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&autoplay=0${startParam}`,
      originalUrl: fullUrl,
    }
  }

  // 2. Vimeo: vimeo.com/123456789 or player.vimeo.com/video/123456789
  const vimeoMatch =
    fullUrl.match(
      /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+))/i
    ) || fullUrl.match(/player\.vimeo\.com\/video\/(\d+)/i)
  if (vimeoMatch) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?dnt=1`,
      originalUrl: fullUrl,
    }
  }

  // 3. DailyMotion
  const dmMatch = fullUrl.match(
    /(?:dailymotion\.com\/(?:video|hub)\/|dai\.ly\/)([a-zA-Z0-9]+)/i
  )
  if (dmMatch) {
    return {
      type: 'dailymotion',
      embedUrl: `https://www.dailymotion.com/embed/video/${dmMatch[1]}`,
      originalUrl: fullUrl,
    }
  }

  // 4. Loom
  const loomMatch = fullUrl.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/i)
  if (loomMatch) {
    return {
      type: 'loom',
      embedUrl: `https://www.loom.com/embed/${loomMatch[1]}`,
      originalUrl: fullUrl,
    }
  }

  // 5. Twitch
  const twitchVidMatch = fullUrl.match(/twitch\.tv\/videos\/(\d+)/i)
  if (twitchVidMatch) {
    const parentHost =
      typeof window !== 'undefined' ? window.location.hostname : 'localhost'
    return {
      type: 'twitch',
      embedUrl: `https://player.twitch.tv/?video=${twitchVidMatch[1]}&parent=${parentHost}&autoplay=false`,
      originalUrl: fullUrl,
    }
  }
  const twitchChannelMatch = fullUrl.match(/twitch\.tv\/([a-zA-Z0-9_]+)/i)
  if (
    twitchChannelMatch &&
    !['directory', 'p', 'downloads'].includes(
      twitchChannelMatch[1].toLowerCase()
    )
  ) {
    const parentHost =
      typeof window !== 'undefined' ? window.location.hostname : 'localhost'
    return {
      type: 'twitch',
      embedUrl: `https://player.twitch.tv/?channel=${twitchChannelMatch[1]}&parent=${parentHost}&autoplay=false`,
      originalUrl: fullUrl,
    }
  }

  // 6. Streamable
  const streamableMatch = fullUrl.match(/streamable\.com\/(?:e\/)?([a-zA-Z0-9]+)/i)
  if (streamableMatch) {
    return {
      type: 'streamable',
      embedUrl: `https://streamable.com/e/${streamableMatch[1]}`,
      originalUrl: fullUrl,
    }
  }

  // 7. Wistia
  const wistiaMatch = fullUrl.match(
    /(?:wistia\.com\/(?:medias|embed)|fast\.wistia\.net\/embed\/iframe)\/([a-zA-Z0-9]+)/i
  )
  if (wistiaMatch) {
    return {
      type: 'wistia',
      embedUrl: `https://fast.wistia.net/embed/iframe/${wistiaMatch[1]}`,
      originalUrl: fullUrl,
    }
  }

  // 8. TED Talks
  const tedMatch = fullUrl.match(/ted\.com\/talks\/([a-zA-Z0-9_\-]+)/i)
  if (tedMatch) {
    return {
      type: 'ted',
      embedUrl: `https://embed.ted.com/talks/${tedMatch[1]}`,
      originalUrl: fullUrl,
    }
  }

  // 9. Google Drive
  const gdriveMatch = fullUrl.match(
    /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i
  )
  if (gdriveMatch) {
    return {
      type: 'gdrive',
      embedUrl: `https://drive.google.com/file/d/${gdriveMatch[1]}/preview`,
      originalUrl: fullUrl,
    }
  }

  // 10. Direct HTML5 Video File (.mp4, .webm, .ogg, .mov, .m4v, blob:, data:)
  const isDirectFile =
    /\.(mp4|webm|ogg|mov|m4v|ogv)(\?.*)?$/i.test(fullUrl) ||
    fullUrl.startsWith('blob:') ||
    fullUrl.startsWith('data:video/')
  if (isDirectFile) {
    return {
      type: 'html5',
      embedUrl: fullUrl,
      originalUrl: fullUrl,
    }
  }

  // 11. Generic Embed / Fallback
  return {
    type: 'generic',
    embedUrl: fullUrl,
    originalUrl: fullUrl,
  }
}

export const VideoBlock: React.FC<VideoBlockProps> = ({ block, isSelected }) => {
  const { document, updateBlock, removeBlock, addBlock, setSelectedBlockId } =
    useEditorStore()

  const videoUrl = block.metadata?.url || block.content || ''
  const caption = block.metadata?.caption || ''

  const [inputUrl, setInputUrl] = useState('')
  const [isEditingUrl, setIsEditingUrl] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // If there is no video URL yet, focus the prompt input automatically
    if (!videoUrl) {
      inputRef.current?.focus()
    }
  }, [videoUrl])

  const handleApplyUrl = (rawToApply: string) => {
    const trimmed = rawToApply.trim()
    if (!trimmed) return

    const fullUrl = trimmed.match(/^https?:\/\//i) ? trimmed : `https://${trimmed}`

    // 1. Update block with the video URL
    updateBlock(block.id, {
      content: fullUrl,
      metadata: {
        ...block.metadata,
        url: fullUrl,
      },
    })
    setIsEditingUrl(false)
    setInputUrl('')

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

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.stopPropagation()
    const pasted = e.clipboardData?.getData('text/plain')
    if (pasted) {
      e.preventDefault()
      const input = e.currentTarget
      const start = input.selectionStart ?? 0
      const end = input.selectionEnd ?? 0
      const currentVal = input.value
      const newVal =
        currentVal.substring(0, start) + pasted + currentVal.substring(end)
      setInputUrl(newVal)
      setTimeout(() => {
        input.setSelectionRange(start + pasted.length, start + pasted.length)
      }, 0)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const dropped = e.dataTransfer.getData('text/plain')
    if (dropped) {
      setInputUrl(dropped.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()
    if (e.key === 'Enter') {
      e.preventDefault()
      if (inputUrl.trim()) {
        handleApplyUrl(inputUrl)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      if (videoUrl) {
        setIsEditingUrl(false)
      } else {
        // Revert to empty paragraph
        updateBlock(block.id, {
          type: 'paragraph',
          content: '',
          metadata: {},
        })
      }
    } else if (e.key === 'Backspace' && inputUrl === '') {
      e.preventDefault()
      if (videoUrl) {
        setIsEditingUrl(false)
      } else {
        // Revert to empty paragraph
        updateBlock(block.id, {
          type: 'paragraph',
          content: '',
          metadata: {},
        })
      }
    }
  }

  useEffect(() => {
    if (!isSelected || !videoUrl) return

    const handleWindowKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        e.stopPropagation()
        const idx = document.blocks.findIndex((b) => b.id === block.id)
        const targetBlock = document.blocks[idx - 1] || document.blocks[idx + 1]
        removeBlock(block.id)
        if (targetBlock) {
          setSelectedBlockId(targetBlock.id)
          setTimeout(() => {
            const el = window.document.querySelector<HTMLElement>(
              `[data-block-id="${targetBlock.id}"] [contenteditable="true"], [data-block-id="${targetBlock.id}"].lumina-paragraph`
            )
            if (el) el.focus()
          }, 30)
        }
      }
    }

    window.addEventListener('keydown', handleWindowKeyDown)
    return () => window.removeEventListener('keydown', handleWindowKeyDown)
  }, [isSelected, videoUrl, block.id, document.blocks, removeBlock, setSelectedBlockId])

  // 1. Prompt state: when video has not been set yet, or when user clicks Change URL
  if (!videoUrl || isEditingUrl) {
    return (
      <div
        className="medium-video-prompt-wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onDrop={handleDrop}
          placeholder="Paste a YouTube, Vimeo, or other video link, and press Enter"
          className="medium-video-prompt-input"
          autoFocus
        />
      </div>
    )
  }

  // 2. Video Rendered State
  const parsed = parseVideoUrl(videoUrl)

  const handleBlockKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return
      }
      e.preventDefault()
      e.stopPropagation()
      const idx = document.blocks.findIndex((b) => b.id === block.id)
      const targetBlock = document.blocks[idx - 1] || document.blocks[idx + 1]
      removeBlock(block.id)
      if (targetBlock) {
        setSelectedBlockId(targetBlock.id)
        setTimeout(() => {
          const el = window.document.querySelector<HTMLElement>(
            `[data-block-id="${targetBlock.id}"] [contenteditable="true"], [data-block-id="${targetBlock.id}"].lumina-paragraph`
          )
          if (el) el.focus()
        }, 30)
      }
    }
  }

  return (
    <div
      className={`lumina-video-block ${isSelected ? 'is-selected' : ''}`}
      tabIndex={0}
      onKeyDown={handleBlockKeyDown}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedBlockId(block.id)
      }}
    >
      <div className="lumina-video-wrapper">
        {parsed.type === 'html5' ? (
          <video
            src={parsed.embedUrl}
            controls
            playsInline
            preload="metadata"
            className="lumina-video-player"
          />
        ) : (
          <iframe
            src={parsed.embedUrl}
            title="Embedded video"
            className="lumina-video-iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>

      {/* Caption Field */}
      <input
        type="text"
        value={caption}
        onChange={(e) =>
          updateBlock(block.id, {
            metadata: { ...block.metadata, caption: e.target.value },
          })
        }
        onKeyDown={(e) => e.stopPropagation()}
        placeholder="Type caption for video (optional)"
        className="lumina-image-caption"
      />
    </div>
  )
}
