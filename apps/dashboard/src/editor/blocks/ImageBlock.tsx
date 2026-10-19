import React, { useState, useRef, useEffect } from 'react'
import type { LuminaBlock } from '../types'
import { useEditorStore } from '../state/editorStore'
import { EditorIcons } from '../icons'
import { useMediaUpload } from '../hooks/useMediaUpload'

interface ImageBlockProps {
  block: LuminaBlock
  isSelected: boolean
}

export const ImageBlock: React.FC<ImageBlockProps> = ({ block, isSelected }) => {
  const { document, updateBlock, addBlock, setSelectedBlockId } = useEditorStore()
  const [editingUrl, setEditingUrl] = useState(false)
  const [inputUrl, setInputUrl] = useState('')
  const [hasError, setHasError] = useState(false)
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [localPreview, setLocalPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { isUploading, progress, error: uploadError, uploadImage, clearError, abortUpload } =
    useMediaUpload()

  const url = block.metadata?.url || block.metadata?.publicUrl || block.content || ''
  const displayUrl = localPreview || url
  const caption = block.metadata?.caption || ''
  const width = block.styles?.width || '100%'
  const borderRadius = block.styles?.borderRadius ?? 8
  const alignment = block.styles?.textAlign || 'center'
  const isBlockUploading = isUploading || Boolean(block.metadata?.isUploading)

  // Clean up blob URL on unmount
  useEffect(() => {
    return () => {
      if (localPreview && localPreview.startsWith('blob:')) {
        URL.revokeObjectURL(localPreview)
      }
    }
  }, [localPreview])

  const ensureNextParagraph = () => {
    const idx = document.blocks.findIndex((b) => b.id === block.id)
    const nextBlock = document.blocks[idx + 1]
    if (!nextBlock) {
      const nextPara = addBlock('paragraph', block.id, { content: '' })
      setSelectedBlockId(nextPara.id)
      setTimeout(() => {
        const el = window.document.querySelector<HTMLElement>(
          `[data-block-id="${nextPara.id}"] [contenteditable="true"], [data-block-id="${nextPara.id}"].lumina-paragraph`
        )
        if (el) el.focus()
      }, 40)
    }
  }

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputUrl.trim()) {
      setLocalPreview(null)
      updateBlock(block.id, {
        content: inputUrl.trim(),
        metadata: {
          ...block.metadata,
          url: inputUrl.trim(),
          publicUrl: inputUrl.trim(),
          isUploading: false,
        },
      })
      setHasError(false)
      setEditingUrl(false)
      ensureNextParagraph()
    }
  }

  const processFileSelection = async (file: File) => {
    if (!file) return

    clearError()
    setHasError(false)

    // 1. Show image instantly via local preview URL (no empty box flash)
    const objectUrl = URL.createObjectURL(file)
    setLocalPreview(objectUrl)
    updateBlock(block.id, {
      metadata: {
        ...block.metadata,
        url: objectUrl,
        isUploading: true,
      },
    })

    const blockIndex = document.blocks.findIndex((b) => b.id === block.id)
    const order = blockIndex >= 0 ? blockIndex : 0

    // 2. Upload file directly to S3 via presigned upload URL
    const result = await uploadImage(file, { order })

    if (result) {
      updateBlock(block.id, {
        content: '',
        metadata: {
          ...block.metadata,
          key: result.key,
          url: result.url,
          publicUrl: result.url,
          type: result.type,
          mimeType: result.mimeType,
          size: result.size,
          width: result.width,
          height: result.height,
          order: result.order,
          isUploading: false,
        },
      })
      setEditingUrl(false)
      ensureNextParagraph()
    } else {
      updateBlock(block.id, {
        metadata: {
          ...block.metadata,
          isUploading: false,
        },
      })
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      void processFileSelection(file)
    }
    e.target.value = ''
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isBlockUploading && !isDraggingOver) {
      setIsDraggingOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingOver(false)

    if (isBlockUploading) return

    const file = e.dataTransfer.files?.[0]
    if (file) {
      void processFileSelection(file)
    }
  }

  const showPlaceholder = (!displayUrl || hasError) && !isBlockUploading && !uploadError

  return (
    <div
      className={`lumina-image-block ${isSelected ? 'is-selected' : ''}`}
      style={{ textAlign: alignment as any }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
        disabled={isBlockUploading}
      />

      <div
        className={`lumina-image-container ${isDraggingOver ? 'is-drag-active' : ''}`}
        style={{
          width,
          display: 'inline-block',
          position: 'relative',
          borderRadius,
          overflow: 'hidden',
          minHeight: showPlaceholder ? '160px' : 'auto',
        }}
      >
        {/* Case A: Display Instant Preview / Real Image with Upload Overlay if in progress */}
        {displayUrl ? (
          <div className="lumina-image-wrapper-relative" style={{ position: 'relative' }}>
            <img
              src={displayUrl}
              alt={caption || 'Lumina story image'}
              className="lumina-image-element"
              onError={() => setHasError(true)}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius,
                display: 'block',
                filter: isBlockUploading ? 'brightness(0.85)' : 'none',
                transition: 'filter 0.2s ease',
              }}
            />

            {/* In-Flight Upload Overlay over the image */}
            {isBlockUploading && (
              <div className="lumina-image-upload-overlay">
                <div className="lumina-upload-spinner" />
                <div className="lumina-upload-meta">
                  <span className="lumina-upload-title">Uploading...</span>
                  <span className="lumina-upload-pct">{progress}%</span>
                </div>
                <div className="lumina-upload-progress-bar">
                  <div
                    className="lumina-upload-progress-fill"
                    style={{ width: `${Math.max(6, progress)}%` }}
                  />
                </div>
                <button
                  type="button"
                  className="lumina-upload-cancel-btn"
                  onClick={abortUpload}
                  title="Cancel Upload"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Error Overlay over Image */}
            {uploadError && !isBlockUploading && (
              <div className="lumina-image-error-overlay">
                <div className="lumina-error-content">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span className="lumina-error-msg" style={{ color: '#ffffff' }}>{uploadError}</span>
                </div>
                <div className="lumina-error-actions">
                  <button
                    type="button"
                    className="lumina-error-retry-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Retry
                  </button>
                  <button
                    type="button"
                    className="lumina-error-dismiss-btn"
                    onClick={() => {
                      clearError()
                      setLocalPreview(null)
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {/* Controls when selected and not uploading */}
            {isSelected && !isBlockUploading && !uploadError && (
              <div className="lumina-image-overlay-controls">
                <button
                  type="button"
                  className="image-overlay-btn"
                  onClick={() => fileInputRef.current?.click()}
                  title="Replace with new image"
                >
                  <EditorIcons.Upload size={14} />
                  <span>Replace</span>
                </button>
                <button
                  type="button"
                  className="image-overlay-btn"
                  onClick={() => setEditingUrl(true)}
                  title="Edit Image URL"
                >
                  <EditorIcons.Link size={14} />
                  <span>URL</span>
                </button>
                <button
                  type="button"
                  className="image-overlay-btn"
                  onClick={() => {
                    const nextWidth = width === '100%' ? '75%' : width === '75%' ? '50%' : '100%'
                    updateBlock(block.id, { styles: { ...block.styles, width: nextWidth } })
                  }}
                  title="Toggle Width"
                >
                  <span>{width}</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Case B: Only show empty dropzone when no image is selected and not uploading */
          showPlaceholder && (
            <div className={`lumina-image-dropzone ${isDraggingOver ? 'is-dragging' : ''}`}>
              <div className="image-dropzone-inner">
                <div className="image-dropzone-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="4" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <p className="image-dropzone-title">Upload an image or paste link</p>
                <p className="image-dropzone-subtitle">JPEG, PNG, WebP up to 5 MB</p>
                <div className="image-dropzone-actions">
                  <button
                    type="button"
                    className="image-dropzone-btn is-primary"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isBlockUploading}
                  >
                    <EditorIcons.Upload size={14} />
                    <span>Choose File</span>
                  </button>
                  <button
                    type="button"
                    className="image-dropzone-btn"
                    onClick={() => setEditingUrl(true)}
                    disabled={isBlockUploading}
                  >
                    <EditorIcons.Link size={14} />
                    <span>Embed Link</span>
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Inline URL Form */}
      {editingUrl && (
        <form onSubmit={handleApplyUrl} className="lumina-image-url-form">
          <input
            type="url"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            placeholder="Paste image URL (https://...)"
            className="lumina-image-url-input"
            autoFocus
          />
          <button type="submit" className="image-url-submit-btn">
            Apply
          </button>
          <button
            type="button"
            className="image-url-cancel-btn"
            onClick={() => setEditingUrl(false)}
          >
            Cancel
          </button>
        </form>
      )}

      {/* Caption field */}
      {displayUrl && !isBlockUploading && (
        <input
          type="text"
          value={caption}
          onChange={(e) =>
            updateBlock(block.id, {
              metadata: { ...block.metadata, caption: e.target.value },
            })
          }
          onKeyDown={(e) => {
            e.stopPropagation()
            if (e.key === 'Enter') {
              e.preventDefault()
              const idx = document.blocks.findIndex((b) => b.id === block.id)
              const nextBlock = document.blocks[idx + 1]
              if (nextBlock && nextBlock.type === 'paragraph') {
                setSelectedBlockId(nextBlock.id)
                setTimeout(() => {
                  const el = window.document.querySelector<HTMLElement>(
                    `[data-block-id="${nextBlock.id}"] [contenteditable="true"], [data-block-id="${nextBlock.id}"].lumina-paragraph`
                  )
                  if (el) el.focus()
                }, 30)
              } else {
                const nextPara = addBlock('paragraph', block.id, { content: '' })
                setSelectedBlockId(nextPara.id)
                setTimeout(() => {
                  const el = window.document.querySelector<HTMLElement>(
                    `[data-block-id="${nextPara.id}"] [contenteditable="true"], [data-block-id="${nextPara.id}"].lumina-paragraph`
                  )
                  if (el) el.focus()
                }, 30)
              }
            } else if (e.key === 'ArrowDown') {
              e.preventDefault()
              const idx = document.blocks.findIndex((b) => b.id === block.id)
              const nextBlock = document.blocks[idx + 1]
              if (nextBlock) {
                setSelectedBlockId(nextBlock.id)
                setTimeout(() => {
                  const el = window.document.querySelector<HTMLElement>(
                    `[data-block-id="${nextBlock.id}"] [contenteditable="true"], [data-block-id="${nextBlock.id}"].lumina-paragraph`
                  )
                  if (el) el.focus()
                }, 30)
              } else {
                const nextPara = addBlock('paragraph', block.id, { content: '' })
                setSelectedBlockId(nextPara.id)
                setTimeout(() => {
                  const el = window.document.querySelector<HTMLElement>(
                    `[data-block-id="${nextPara.id}"] [contenteditable="true"], [data-block-id="${nextPara.id}"].lumina-paragraph`
                  )
                  if (el) el.focus()
                }, 30)
              }
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              const idx = document.blocks.findIndex((b) => b.id === block.id)
              if (idx > 0) {
                const prevBlock = document.blocks[idx - 1]
                setSelectedBlockId(prevBlock.id)
                setTimeout(() => {
                  const el = window.document.querySelector<HTMLElement>(
                    `[data-block-id="${prevBlock.id}"] [contenteditable="true"], [data-block-id="${prevBlock.id}"].lumina-paragraph`
                  )
                  if (el) el.focus()
                }, 30)
              } else {
                const subEl = window.document.querySelector<HTMLTextAreaElement>('.notion-subtitle-input')
                subEl?.focus()
              }
            }
          }}
          placeholder="Type a caption (optional)"
          className="lumina-image-caption"
        />
      )}
    </div>
  )
}
