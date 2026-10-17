import React, { useEffect, useState, useRef } from 'react'
import { useEditorStore } from '../state/editorStore'
import { EditorIcons } from '../icons'

const BAR_COLORS = [
  { name: 'Gray', value: 'rgb(107, 114, 128)', bg: '#9ca3af' },
  { name: 'Red', value: 'rgb(239, 68, 68)', bg: '#ef4444' },
  { name: 'Green', value: 'rgb(16, 185, 129)', bg: '#10b981' },
]

export const BubbleToolbar: React.FC = () => {
  const { document, selectedBlockId, updateBlock, setSelectedBlockId } = useEditorStore()
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null)
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null)
  const [formatStates, setFormatStates] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    link: false,
    code: false,
  })

  // Link popup state
  const [isLinkPopupOpen, setIsLinkPopupOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [openInNewTab, setOpenInNewTab] = useState(true)

  const isInteractingRef = useRef(false)
  const lastTextRef = useRef<string>('')
  const savedSelectionRangeRef = useRef<Range | null>(null)
  const activeBlockIdRef = useRef<string | null>(null)

  const checkFormatStates = () => {
    try {
      const sel = window.getSelection()
      let isCode = false
      if (sel && sel.anchorNode) {
        const el = sel.anchorNode instanceof HTMLElement ? sel.anchorNode : sel.anchorNode.parentElement
        isCode = !!el?.closest('code')
      }
      setFormatStates({
        bold: window.document.queryCommandState('bold'),
        italic: window.document.queryCommandState('italic'),
        underline: window.document.queryCommandState('underline'),
        strikeThrough: window.document.queryCommandState('strikeThrough'),
        link: window.document.queryCommandState('createLink'),
        code: isCode,
      })
    } catch {
      // ignore
    }
  }

  const isMouseDownRef = useRef(false)

  useEffect(() => {
    const handleMouseDown = () => {
      isMouseDownRef.current = true
    }

    const handleMouseUp = () => {
      isMouseDownRef.current = false
      setTimeout(() => {
        handleSelectionChange()
      }, 30)
    }

    const handleSelectionChange = () => {
      if (isInteractingRef.current) {
        checkFormatStates()
        return
      }

      if (isMouseDownRef.current) {
        // Do not pop up toolbar while mouse is actively dragging
        return
      }

      const selection = window.getSelection()
      if (!selection || selection.isCollapsed || !selection.toString().trim()) {
        setPosition(null)
        lastTextRef.current = ''
        setIsLinkPopupOpen(false)
        return
      }

      const text = selection.toString().trim()

      try {
        const range = selection.getRangeAt(0)
        savedSelectionRangeRef.current = range.cloneRange()
        const rect = range.getBoundingClientRect()

        // Find which block this selection belongs to
        const anchor = selection.anchorNode
        const anchorEl = anchor instanceof HTMLElement ? anchor : anchor?.parentElement
        const blockWrap = anchorEl?.closest('[data-block-id]')
        const foundBlockId = blockWrap?.getAttribute('data-block-id') || selectedBlockId || null

        if (foundBlockId) {
          activeBlockIdRef.current = foundBlockId
          setActiveBlockId(foundBlockId)
        }

        if (position && lastTextRef.current === text) {
          checkFormatStates()
          return
        }

        if (rect.width > 0) {
          lastTextRef.current = text
          const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 800
          const approxHalfWidth = Math.min(190, screenWidth * 0.44)
          const targetLeft = Math.round(rect.left + rect.width / 2)
          const clampedLeft = Math.max(
            approxHalfWidth + 10,
            Math.min(screenWidth - approxHalfWidth - 10, targetLeft)
          )

          // If selection is close to the sticky topbar (56px), position below selection
          let targetTop = Math.round(rect.top - 54)
          if (targetTop < 60) {
            targetTop = Math.round(rect.bottom + 12)
          }

          setPosition({
            top: Math.max(10, targetTop),
            left: clampedLeft,
          })
          checkFormatStates()
        }
      } catch {
        setPosition(null)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K for Link
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        const selection = window.getSelection()
        if (selection && !selection.isCollapsed && selection.toString().trim()) {
          e.preventDefault()
          setIsLinkPopupOpen(true)
        }
      }
    }

    window.document.addEventListener('mousedown', handleMouseDown)
    window.document.addEventListener('mouseup', handleMouseUp)
    window.document.addEventListener('selectionchange', handleSelectionChange)
    window.document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.document.removeEventListener('mousedown', handleMouseDown)
      window.document.removeEventListener('mouseup', handleMouseUp)
      window.document.removeEventListener('selectionchange', handleSelectionChange)
      window.document.removeEventListener('keydown', handleKeyDown)
    }
  }, [position, selectedBlockId])

  if (!position) return null

  const restoreSelection = () => {
    if (savedSelectionRangeRef.current) {
      const sel = window.getSelection()
      if (sel) {
        sel.removeAllRanges()
        sel.addRange(savedSelectionRangeRef.current)
      }
    }
  }

  const syncBlockContent = (targetId?: string | null) => {
    const id = targetId || activeBlockIdRef.current || selectedBlockId
    if (id) {
      const blockEl = window.document.querySelector<HTMLElement>(
        `[data-block-id="${id}"] [contenteditable="true"], [data-block-id="${id}"].lumina-paragraph, [data-block-id="${id}"].lumina-heading-1, [data-block-id="${id}"].lumina-heading-2, [data-block-id="${id}"].lumina-heading-3, [data-block-id="${id}"] .lumina-callout-content, [data-block-id="${id}"] .lumina-list-text`
      )
      if (blockEl) {
        updateBlock(id, { content: blockEl.innerHTML })
      }
    }
  }

  const handleFormat = (command: string, value?: string) => {
    isInteractingRef.current = true
    try {
      restoreSelection()
      window.document.execCommand(command, false, value)
      syncBlockContent()
      checkFormatStates()
    } finally {
      setTimeout(() => {
        isInteractingRef.current = false
      }, 150)
    }
  }

  const handleApplyColor = (color: string) => {
    isInteractingRef.current = true
    try {
      restoreSelection()
      window.document.execCommand('foreColor', false, color)
      syncBlockContent()
      checkFormatStates()
    } finally {
      setTimeout(() => {
        isInteractingRef.current = false
      }, 150)
    }
  }

  const handleInlineCode = () => {
    isInteractingRef.current = true
    try {
      restoreSelection()
      const sel = window.getSelection()
      if (sel && !sel.isCollapsed) {
        const range = sel.getRangeAt(0)
        const parentNode = range.commonAncestorContainer
        const parentEl = parentNode instanceof HTMLElement ? parentNode : parentNode.parentElement
        const codeEl = parentEl?.closest('code')

        if (codeEl) {
          // Unwrap code
          const textNode = window.document.createTextNode(codeEl.textContent || '')
          codeEl.parentNode?.replaceChild(textNode, codeEl)
        } else {
          // Wrap in code
          const text = sel.toString()
          window.document.execCommand('insertHTML', false, `<code>${text}</code>`)
        }
        syncBlockContent()
        checkFormatStates()
      }
    } finally {
      setTimeout(() => {
        isInteractingRef.current = false
      }, 150)
    }
  }

  const handleApplyLink = (e: React.FormEvent) => {
    e.preventDefault()
    let url = linkUrl.trim()
    if (!url) return

    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`
    }

    isInteractingRef.current = true
    try {
      restoreSelection()
      window.document.execCommand('createLink', false, url)
      if (openInNewTab) {
        const sel = window.getSelection()
        if (sel && sel.anchorNode) {
          const el = sel.anchorNode instanceof HTMLElement ? sel.anchorNode : sel.anchorNode.parentElement
          const anchor = el?.closest('a')
          if (anchor) {
            anchor.setAttribute('target', '_blank')
            anchor.setAttribute('rel', 'noopener noreferrer')
          }
        }
      }
      syncBlockContent()
    } finally {
      setIsLinkPopupOpen(false)
      setLinkUrl('')
      setTimeout(() => {
        isInteractingRef.current = false
      }, 150)
    }
  }

  const handleRemoveLink = () => {
    isInteractingRef.current = true
    try {
      restoreSelection()
      window.document.execCommand('unlink', false)
      syncBlockContent()
      checkFormatStates()
    } finally {
      setIsLinkPopupOpen(false)
      setLinkUrl('')
      setTimeout(() => {
        isInteractingRef.current = false
      }, 150)
    }
  }

  const handleSetBlockType = (type: any) => {
    isInteractingRef.current = true
    const targetId = activeBlockIdRef.current || selectedBlockId

    if (targetId) {
      const currentBlock = document.blocks.find((b) => b.id === targetId)
      const newType = currentBlock?.type === type ? 'paragraph' : type
      updateBlock(targetId, { type: newType })
      setSelectedBlockId(targetId)
    }

    setTimeout(() => {
      isInteractingRef.current = false
      restoreSelection()
    }, 150)
  }

  const currentTargetBlock = document.blocks.find(
    (b) => b.id === (activeBlockId || activeBlockIdRef.current || selectedBlockId)
  )

  return (
    <div
      className="lumina-bubble-toolbar"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translateX(-50%)',
      }}
      onMouseDown={(e) => {
        e.preventDefault()
        e.stopPropagation()
        isInteractingRef.current = true
      }}
    >
      {!isLinkPopupOpen ? (
        <>
          {/* Main Formatting Group */}
          <div className="bubble-group">
            <button
              type="button"
              className={`bubble-btn ${formatStates.bold ? 'is-active' : ''}`}
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onClick={() => handleFormat('bold')}
              title="Bold (⌘B)"
            >
              <EditorIcons.Bold size={16} />
            </button>
            <button
              type="button"
              className={`bubble-btn ${formatStates.italic ? 'is-active' : ''}`}
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onClick={() => handleFormat('italic')}
              title="Italic (⌘I)"
            >
              <EditorIcons.Italic size={16} />
            </button>
            <button
              type="button"
              className={`bubble-btn ${formatStates.link ? 'is-active' : ''}`}
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onClick={() => setIsLinkPopupOpen(true)}
              title="Link (⌘K)"
            >
              <EditorIcons.Link size={16} />
            </button>
            <button
              type="button"
              className={`bubble-btn ${formatStates.code ? 'is-active' : ''}`}
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onClick={handleInlineCode}
              title="Inline Code (`text`)"
            >
              <span style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700 }}>{'<>'}</span>
            </button>
          </div>

          <div className="bubble-divider" />

          {/* 3 Colors: Gray, Red, Green */}
          <div className="bubble-group bubble-colors-group">
            {BAR_COLORS.map((c) => (
              <button
                key={c.name}
                type="button"
                className="bubble-color-dot-btn"
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onClick={() => handleApplyColor(c.value)}
                title={`${c.name} color`}
              >
                <span
                  className="bubble-color-dot"
                  style={{ backgroundColor: c.bg }}
                />
              </button>
            ))}
          </div>

          <div className="bubble-divider" />

          {/* Heading, Subheading & Quote Hierarchy */}
          <div className="bubble-group">
            <button
              type="button"
              className={`bubble-btn ${currentTargetBlock?.type === 'heading-1' ? 'is-active' : ''}`}
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onClick={() => handleSetBlockType('heading-1')}
              title="Heading 1 (⌘⌥1)"
            >
              H1
            </button>
            <button
              type="button"
              className={`bubble-btn ${currentTargetBlock?.type === 'heading-2' ? 'is-active' : ''}`}
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onClick={() => handleSetBlockType('heading-2')}
              title="Heading 2 (⌘⌥2)"
            >
              H2
            </button>
            <button
              type="button"
              className={`bubble-btn ${currentTargetBlock?.type === 'quote' ? 'is-active' : ''}`}
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onClick={() => handleSetBlockType('quote')}
              title="Quote (⌘⌥5)"
            >
              “ ”
            </button>
          </div>
        </>
      ) : (
        /* Interactive Link Popup Form */
        <form
          onSubmit={handleApplyLink}
          className="bubble-link-form"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Paste or type URL (https://...)"
            className="bubble-link-input"
            autoFocus
          />
          <label className="bubble-link-checkbox-label">
            <input
              type="checkbox"
              checked={openInNewTab}
              onChange={(e) => setOpenInNewTab(e.target.checked)}
            />
            <span>New tab</span>
          </label>
          <button type="submit" className="bubble-link-action-btn is-primary">
            Apply
          </button>
          <button type="button" className="bubble-link-action-btn is-danger" onClick={handleRemoveLink}>
            Unlink
          </button>
          <button
            type="button"
            className="bubble-link-action-btn"
            onClick={() => setIsLinkPopupOpen(false)}
          >
            ✕
          </button>
        </form>
      )}
    </div>
  )
}

export default BubbleToolbar
