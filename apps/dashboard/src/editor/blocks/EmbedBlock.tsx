import React, { useState, useRef, useEffect } from 'react'
import type { LuminaBlock } from '../types'
import { useEditorStore } from '../state/editorStore'
import { getEmbedProvider, renderFallbackPreviewCard } from '../embeds/embedProviders'

interface EmbedBlockProps {
  block: LuminaBlock
  isSelected: boolean
}

export const EmbedBlock: React.FC<EmbedBlockProps> = ({ block, isSelected }) => {
  const { document, updateBlock, removeBlock, addBlock, setSelectedBlockId } =
    useEditorStore()

  const rawUrl = block.metadata?.url || block.content || ''
  const title = block.metadata?.title || ''
  const description = block.metadata?.description || rawUrl
  const caption = block.metadata?.caption || ''

  const [urlInput, setUrlInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!rawUrl) {
      inputRef.current?.focus()
    }
  }, [rawUrl])

  // Global window keydown listener for keyboard Delete / Backspace when selected
  useEffect(() => {
    if (!isSelected || !rawUrl) return

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
  }, [isSelected, rawUrl, block.id, document.blocks, removeBlock, setSelectedBlockId])

  const handleApplyUrl = (inputToApply: string) => {
    const trimmed = inputToApply.trim()
    if (!trimmed) return

    const normalizedUrl = trimmed.match(/^https?:\/\//i)
      ? trimmed
      : `https://${trimmed}`

    let hostname = 'Web Link'
    try {
      hostname = new URL(normalizedUrl).hostname
    } catch {
      // ignore
    }

    const matched = getEmbedProvider(normalizedUrl)
    const parsed = matched ? matched.parse(normalizedUrl) : null

    // 1. Update block with the embed URL and metadata
    updateBlock(block.id, {
      content: normalizedUrl,
      metadata: {
        ...block.metadata,
        url: normalizedUrl,
        title: parsed?.title || `Resource from ${hostname}`,
        description: parsed?.description || normalizedUrl,
        provider: matched ? matched.name : 'Web',
      },
    })
    setUrlInput('')

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
      setUrlInput(newVal)
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
      setUrlInput(dropped.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()
    if (e.key === 'Enter') {
      e.preventDefault()
      if (urlInput.trim()) {
        handleApplyUrl(urlInput)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      // Revert to empty paragraph
      updateBlock(block.id, {
        type: 'paragraph',
        content: '',
        metadata: {},
      })
    } else if (e.key === 'Backspace' && urlInput === '') {
      e.preventDefault()
      // Revert to empty paragraph
      updateBlock(block.id, {
        type: 'paragraph',
        content: '',
        metadata: {},
      })
    }
  }

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

  // 1. Prompt state: when URL has not been submitted yet
  if (!rawUrl) {
    return (
      <div
        className="medium-embed-prompt-wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onDrop={handleDrop}
          placeholder="Paste a link to embed content from another site (e.g. X) and press Enter"
          className="medium-embed-prompt-input"
          autoFocus
        />
      </div>
    )
  }

  // 2. Rendered State
  const provider = getEmbedProvider(rawUrl)
  const parsedData = provider ? provider.parse(rawUrl) : null

  return (
    <div
      className={`lumina-embed-container ${isSelected ? 'is-selected' : ''}`}
      tabIndex={0}
      onKeyDown={handleBlockKeyDown}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedBlockId(block.id)
      }}
    >
      {/* Main Embed Content */}
      <div className="lumina-embed-content-wrap">
        {provider && parsedData ? (
          provider.render(parsedData, rawUrl)
        ) : (
          renderFallbackPreviewCard(rawUrl, title, description)
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
        placeholder="Type caption for embed (optional)"
        className="lumina-image-caption"
      />
    </div>
  )
}
