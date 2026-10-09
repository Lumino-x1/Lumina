import React, { useState, useRef, useEffect } from 'react'
import type { LuminaBlock } from '../types'
import { useEditorStore } from '../state/editorStore'
import { TextBlock } from './TextBlock'
import { ImageBlock } from './ImageBlock'
import { VideoBlock } from './VideoBlock'
import { EmbedBlock } from './EmbedBlock'
import { TableBlock } from './TableBlock'
import { GalleryBlock } from './GalleryBlock'
import { ElementBlock } from './ElementBlock'
import { LuminaCampusBlocks } from './LuminaCampusBlocks'
import { UnsplashSearchBlock } from './UnsplashSearchBlock'

import { uploadMediaFlow } from '../api/mediaApi'

interface BlockRendererProps {
  block: LuminaBlock
  index?: number
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
}) => {
  const {
    document,
    selectedBlockId,
    setSelectedBlockId,
    removeBlock,
    addBlock,
    updateBlock,
  } = useEditorStore()

  const [isBarOpen, setIsBarOpen] = useState(false)
  const blockFileInputRef = useRef<HTMLInputElement>(null)

  const isSelected = selectedBlockId === block.id
  const isBlockEmpty =
    block.type === 'paragraph' && (!block.content || block.content.trim() === '')

  // Only show the plus button on the currently active/selected empty block
  const showPlusButton = isBlockEmpty && isSelected

  useEffect(() => {
    if ((!isSelected || !isBlockEmpty) && isBarOpen) {
      setIsBarOpen(false)
    }
  }, [isSelected, isBlockEmpty, isBarOpen])

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const blockIndex = document.blocks.findIndex((b) => b.id === block.id)
      const order = blockIndex >= 0 ? blockIndex : 0

      // Instant local preview URL so the user sees their image immediately
      const localPreview = URL.createObjectURL(file)

      // 1. Add image block with preview URL and uploading flag
      const newImg = addBlock('image', block.id, {
        metadata: {
          url: localPreview,
          publicUrl: localPreview,
          caption: '',
          isUploading: true,
        },
      })
      removeBlock(block.id)

      // Automatically create and focus an empty paragraph below the image
      const nextPara = addBlock('paragraph', newImg.id, { content: '' })
      setSelectedBlockId(nextPara.id)
      setTimeout(() => {
        const el = window.document.querySelector<HTMLElement>(
          `[data-block-id="${nextPara.id}"] [contenteditable="true"], [data-block-id="${nextPara.id}"].lumina-paragraph`
        )
        if (el) el.focus()
      }, 40)

      // 2. Upload file directly to S3 via /media/upload-url
      try {
        const result = await uploadMediaFlow(file, { order })
        updateBlock(newImg.id, {
          content: '',
          metadata: {
            url: result.url,
            publicUrl: result.url,
            key: result.key,
            type: result.type,
            mimeType: result.mimeType,
            size: result.size,
            width: result.width,
            height: result.height,
            order: result.order,
            isUploading: false,
          },
        })
      } catch (err) {
        console.error('Image upload failed:', err)
        updateBlock(newImg.id, {
          metadata: {
            url: '',
            isUploading: false,
          },
        })
      }
    }
    setIsBarOpen(false)
    e.target.value = ''
  }

  if (block.isHidden) return null

  const renderContent = () => {
    switch (block.type) {
      case 'heading-1':
      case 'heading-2':
      case 'heading-3':
      case 'heading-4':
      case 'paragraph':
      case 'quote':
      case 'callout':
      case 'code':
      case 'checklist':
      case 'bullet-list':
      case 'number-list':
        return (
          <TextBlock
            block={block}
            isSelected={isSelected}
          />
        )

      case 'image':
        return <ImageBlock block={block} isSelected={isSelected} />

      case 'unsplash':
        return <UnsplashSearchBlock block={block} isSelected={isSelected} />

      case 'video':
        return <VideoBlock block={block} isSelected={isSelected} />

      case 'embed':
        return <EmbedBlock block={block} isSelected={isSelected} />

      case 'table':
        return <TableBlock block={block} isSelected={isSelected} />

      case 'gallery':
        return <GalleryBlock block={block} isSelected={isSelected} />

      case 'divider':
      case 'shape':
      case 'badge':
      case 'button':
        return <ElementBlock block={block} isSelected={isSelected} />

      case 'campus-event':
      case 'internship':
      case 'club-card':
      case 'profile-card':
      case 'announcement':
      case 'achievement':
        return <LuminaCampusBlocks block={block} isSelected={isSelected} />

      default:
        return (
          <div className="lumina-block-unknown">
            <span>Unsupported block type: {block.type}</span>
          </div>
        )
    }
  }

  return (
    <div
      data-block-id={block.id}
      className={`lumina-block-wrapper ${isSelected ? 'is-selected' : ''} ${
        isBarOpen ? 'is-bar-open' : ''
      } ${block.isLocked ? 'is-locked' : ''}`}
      tabIndex={0}
      onClick={(e) => {
        // If user was selecting text across elements, do not clear selection or force focus
        const sel = window.getSelection()
        if (sel && !sel.isCollapsed && sel.toString().trim().length > 0) {
          return
        }

        const target = e.target as HTMLElement
        if (
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('input') ||
          target.closest('textarea')
        ) {
          setSelectedBlockId(block.id)
          return
        }
        e.stopPropagation()
        setSelectedBlockId(block.id)
        if (isBarOpen) {
          setIsBarOpen(false)
        }
        const editable = (e.currentTarget as HTMLElement).querySelector<HTMLElement>(
          '[contenteditable="true"], .lumina-paragraph'
        )
        if (editable && window.document.activeElement !== editable) {
          editable.focus()
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          const target = e.target as HTMLElement
          const isEditingField =
            target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.isContentEditable

          if (isEditingField) {
            return
          }

          e.preventDefault()
          e.stopPropagation()
          removeBlock(block.id)
        } else if (e.key === 'Enter') {
          const target = e.target as HTMLElement
          const isEditingField =
            target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.isContentEditable

          if (!isEditingField && !['paragraph', 'heading-1', 'heading-2', 'heading-3', 'heading-4'].includes(block.type)) {
            e.preventDefault()
            e.stopPropagation()
            const nextPara = addBlock('paragraph', block.id, { content: '' })
            setSelectedBlockId(nextPara.id)
            setTimeout(() => {
              const el = window.document.querySelector<HTMLElement>(
                `[data-block-id="${nextPara.id}"] [contenteditable="true"], [data-block-id="${nextPara.id}"].lumina-paragraph`
              )
              if (el) el.focus()
            }, 30)
          }
        }
      }}
    >
      {/* Hidden file input for native image upload on block */}
      <input
        type="file"
        ref={blockFileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageFile}
      />

      {/* Left Gutter: Medium (+) Button or Comprehensive Action Bar */}
      {/* Left Gutter: Medium (+) Button with Smooth Rotation to Cross (×) */}
      {showPlusButton && (
        <div className="medium-block-plus-gutter" onClick={(e) => e.stopPropagation()}>
          <div className={`medium-action-bar-container ${isBarOpen ? 'is-open' : ''}`}>
            {/* Unified Toggle Button: Smoothly rotates 45deg between '+' and '×' */}
            <button
              type="button"
              className={`medium-circle-btn is-toggle ${isBarOpen ? 'is-open' : ''}`}
              title={isBarOpen ? 'Close options' : 'Add an item'}
              aria-label={isBarOpen ? 'Close options' : 'Add an item'}
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onClick={(e) => {
                e.stopPropagation()
                const willOpen = !isBarOpen
                setSelectedBlockId(block.id)
                setIsBarOpen(willOpen)

                if (willOpen) {
                  if (window.document.activeElement instanceof HTMLElement) {
                    window.document.activeElement.blur()
                  }
                  window.getSelection()?.removeAllRanges()
                } else {
                  const editable = window.document.querySelector<HTMLElement>(
                    `[data-block-id="${block.id}"] [contenteditable="true"], [data-block-id="${block.id}"].lumina-paragraph`
                  )
                  if (editable) editable.focus()
                }

                requestAnimationFrame(() => {
                  window.document.dispatchEvent(new Event('selectionchange'))
                })
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="toggle-cross-icon"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>

            {/* The 4 action buttons */}
            {isBarOpen && (
              <div className="medium-action-buttons" role="toolbar" aria-label="Insert options">
                {/* 1. Add Image (Native Device Upload) */}
                <button
                  type="button"
                  className="medium-circle-btn is-action action-btn-1"
                  title="Upload image from computer"
                  aria-label="Upload image"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => blockFileInputRef.current?.click()}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="4" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </button>

                {/* 2. Unsplash Image */}
                <button
                  type="button"
                  className="medium-circle-btn is-action action-btn-2"
                  title="Search and insert photo via Unsplash"
                  aria-label="Unsplash photo"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => {
                    updateBlock(block.id, {
                      type: 'unsplash',
                      content: '',
                      metadata: { query: '' },
                    })
                    setIsBarOpen(false)
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#2563eb">
                    <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z" />
                  </svg>
                </button>

                {/* 3. Add Video */}
                <button
                  type="button"
                  className="medium-circle-btn is-action action-btn-3"
                  title="Insert video link"
                  aria-label="Add video"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => {
                    updateBlock(block.id, {
                      type: 'video',
                      content: '',
                      metadata: {
                        url: '',
                        caption: '',
                      },
                    })
                    setIsBarOpen(false)
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>

                {/* 4. Add Code Block */}
                <button
                  type="button"
                  className="medium-circle-btn is-action action-btn-4"
                  title="Insert code snippet"
                  aria-label="Insert code"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => {
                    updateBlock(block.id, {
                      type: 'code',
                      content: '',
                      metadata: { language: 'javascript' },
                    })
                    setIsBarOpen(false)
                    // Automatically ensure an empty paragraph exists directly below the code block
                    const idx = document.blocks.findIndex((b) => b.id === block.id)
                    const nextBlock = document.blocks[idx + 1]
                    if (
                      !nextBlock ||
                      nextBlock.type !== 'paragraph' ||
                      nextBlock.content.trim() !== ''
                    ) {
                      addBlock('paragraph', block.id, { content: '' })
                    }
                    setTimeout(() => {
                      const el = window.document.querySelector<HTMLElement>(
                        `[data-block-id="${block.id}"] code, [data-block-id="${block.id}"] pre`
                      )
                      if (el) el.focus()
                    }, 40)
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h10" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Block Content */}
      <div className="lumina-block-inner">{renderContent()}</div>
    </div>
  )
}
