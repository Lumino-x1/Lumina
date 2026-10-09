import React, { useRef, useEffect, useState } from 'react'
import { useEditorStore } from '../state/editorStore'
import { BlockRenderer } from '../blocks/BlockRenderer'
import { BubbleToolbar } from './BubbleToolbar'
import { KeyboardShortcutsModal } from './KeyboardShortcutsModal'

interface EditorCanvasProps {
  isPreviewMode: boolean
}

export const EditorCanvas: React.FC<EditorCanvasProps> = ({ isPreviewMode }) => {
  const {
    document,
    selectedBlockId,
    addBlock,
    removeBlocks,
    setDocumentTitle,
    setDocumentSubtitle,
    setSelectedBlockId,
  } = useEditorStore()

  const canvasRef = useRef<HTMLDivElement>(null)
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null)
  const subtitleTextareaRef = useRef<HTMLTextAreaElement>(null)
  const [isTitleFocused, setIsTitleFocused] = useState(false)
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false)

  // Auto-resize title
  useEffect(() => {
    if (titleTextareaRef.current) {
      titleTextareaRef.current.style.height = 'auto'
      titleTextareaRef.current.style.height = `${titleTextareaRef.current.scrollHeight}px`
    }
  }, [document.title])

  // Auto-resize subtitle
  useEffect(() => {
    if (subtitleTextareaRef.current) {
      subtitleTextareaRef.current.style.height = 'auto'
      subtitleTextareaRef.current.style.height = `${subtitleTextareaRef.current.scrollHeight}px`
    }
  }, [document.subtitle])

  // Global listener for Cmd/Ctrl + ? and Cmd/Ctrl + A (Select all canvas elements) & Delete/Backspace
  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey

      if (isCmdOrCtrl && (e.key === '?' || (e.shiftKey && e.key === '/'))) {
        e.preventDefault()
        setIsShortcutsOpen((prev) => !prev)
        return
      }

      // Multi-block Backspace / Delete
      if (e.key === 'Backspace' || e.key === 'Delete') {
        const sel = window.getSelection()
        if (sel && !sel.isCollapsed && sel.rangeCount > 0) {
          const sheet = canvasRef.current?.querySelector('.lumina-document-sheet')
          if (sheet) {
            const blockWrappers = Array.from(
              sheet.querySelectorAll<HTMLElement>('.lumina-block-wrapper')
            )
            const selectedBlockIds: string[] = []

            blockWrappers.forEach((wrap) => {
              const blockId = wrap.getAttribute('data-block-id')
              if (blockId && sel.containsNode(wrap, true)) {
                selectedBlockIds.push(blockId)
              }
            })

            if (selectedBlockIds.length > 0) {
              e.preventDefault()
              sel.removeAllRanges()

              if (selectedBlockIds.length >= document.blocks.length) {
                removeBlocks(document.blocks.map((b) => b.id))
              } else {
                removeBlocks(selectedBlockIds)
              }

              // Restore contenteditable on remaining blocks
              const editables = window.document.querySelectorAll<HTMLElement>(
                '.lumina-document-sheet [contenteditable]'
              )
              editables.forEach((el) => {
                el.setAttribute('contenteditable', 'true')
              })

              setTimeout(() => {
                const firstBlock =
                  document.blocks.find((b) => !selectedBlockIds.includes(b.id)) ||
                  document.blocks[0]
                if (firstBlock) {
                  setSelectedBlockId(firstBlock.id)
                  const el = window.document.querySelector<HTMLElement>(
                    `[data-block-id="${firstBlock.id}"] [contenteditable="true"], [data-block-id="${firstBlock.id}"].lumina-paragraph, [data-block-id="${firstBlock.id}"] [contenteditable]`
                  )
                  if (el) el.focus()
                }
              }, 40)
              return
            }
          }
        }
      }

      if (isCmdOrCtrl && (e.key === 'a' || e.key === 'A')) {
        const activeEl = window.document.activeElement
        const sel = window.getSelection()

        // Check if inside input or textarea
        if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
          const inputEl = activeEl as HTMLInputElement | HTMLTextAreaElement
          // If already fully selected or empty, expand to entire canvas sheet
          if (inputEl.selectionStart === 0 && inputEl.selectionEnd === inputEl.value.length) {
            e.preventDefault()
            inputEl.blur()
            const sheet =
              canvasRef.current?.querySelector('.document-blocks-stream') ||
              canvasRef.current?.querySelector('.lumina-document-sheet')
            if (sheet && sel) {
              const range = window.document.createRange()
              range.selectNodeContents(sheet)
              sel.removeAllRanges()
              sel.addRange(range)
            }
          }
          return
        }

        // If inside a contenteditable block:
        if (
          activeEl &&
          (activeEl.getAttribute('contenteditable') === 'true' ||
            (activeEl as HTMLElement).isContentEditable)
        ) {
          if (sel && sel.rangeCount > 0) {
            const blockText = (activeEl as HTMLElement).innerText?.trim() || ''
            const selectedText = sel.toString().trim()
            if (!blockText || selectedText === blockText) {
              e.preventDefault()
              ;(activeEl as HTMLElement).blur()
              const sheet =
                canvasRef.current?.querySelector('.document-blocks-stream') ||
                canvasRef.current?.querySelector('.lumina-document-sheet')
              if (sheet && sel) {
                const range = window.document.createRange()
                range.selectNodeContents(sheet)
                sel.removeAllRanges()
                sel.addRange(range)
              }
              return
            }
          }
          return
        }

        // If focus is anywhere else on the canvas/body:
        if (canvasRef.current?.contains(activeEl) || activeEl === window.document.body) {
          e.preventDefault()
          if (activeEl instanceof HTMLElement) activeEl.blur()
          const sheet =
            canvasRef.current?.querySelector('.document-blocks-stream') ||
            canvasRef.current?.querySelector('.lumina-document-sheet')
          if (sheet && sel) {
            const range = window.document.createRange()
            range.selectNodeContents(sheet)
            sel.removeAllRanges()
            sel.addRange(range)
          }
        }
      }
    }

    const handleCopy = (e: ClipboardEvent) => {
      const sel = window.getSelection()
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) return

      const range = sel.getRangeAt(0)
      const sheet = canvasRef.current?.querySelector('.lumina-document-sheet')
      if (!sheet) return

      const isSheetSpanning =
        range.commonAncestorContainer === sheet ||
        (sheet.contains(range.commonAncestorContainer) &&
          range.commonAncestorContainer !== range.startContainer &&
          range.startContainer.parentElement !== range.endContainer.parentElement)

      if (isSheetSpanning) {
        const textParts: string[] = []
        if (document.title && document.title.trim()) {
          textParts.push(document.title.trim())
        }
        if (document.subtitle && document.subtitle.trim()) {
          textParts.push(document.subtitle.trim())
        }

        let currentNumIdx = 1
        document.blocks.forEach((b) => {
          if (b.type === 'bullet-list') {
            currentNumIdx = 1
            textParts.push(`• ${b.content?.trim() || ''}`)
          } else if (b.type === 'number-list') {
            textParts.push(`${currentNumIdx}. ${b.content?.trim() || ''}`)
            currentNumIdx++
          } else if (b.type === 'quote') {
            currentNumIdx = 1
            textParts.push(`> ${b.content?.trim() || ''}`)
          } else if (b.type === 'code') {
            currentNumIdx = 1
            textParts.push(`\`\`\`\n${b.content || ''}\n\`\`\``)
          } else if (
            b.type === 'heading-1' ||
            b.type === 'heading-2' ||
            b.type === 'heading-3' ||
            b.type === 'heading-4'
          ) {
            currentNumIdx = 1
            textParts.push(b.content?.trim() || '')
          } else if (b.type === 'paragraph') {
            currentNumIdx = 1
            if (b.content && b.content.trim()) {
              textParts.push(b.content.trim())
            }
          } else if (b.type === 'callout') {
            currentNumIdx = 1
            textParts.push(`💡 ${b.content?.trim() || ''}`)
          }
        })

        if (textParts.length > 0 && e.clipboardData) {
          e.preventDefault()
          e.clipboardData.setData('text/plain', textParts.join('\n\n'))
        }
      }
    }

    // Cross-block mouse drag selection across multiple blocks
    const findDeepestTextNode = (
      node: Node,
      atEnd: boolean = false
    ): { node: Node; offset: number } => {
      if (node.nodeType === Node.TEXT_NODE) {
        return { node, offset: atEnd ? (node.textContent?.length || 0) : 0 }
      }
      if (node.childNodes && node.childNodes.length > 0) {
        const targetChild = atEnd
          ? node.childNodes[node.childNodes.length - 1]
          : node.childNodes[0]
        return findDeepestTextNode(targetChild, atEnd)
      }
      return { node, offset: 0 }
    }

    const getCaretPoint = (
      x: number,
      y: number,
      atEnd: boolean = false
    ): { node: Node; offset: number } | null => {
      let result: { node: Node; offset: number } | null = null

      if (typeof (window.document as any).caretRangeFromPoint === 'function') {
        const r = (window.document as any).caretRangeFromPoint(x, y)
        if (r) result = { node: r.startContainer, offset: r.startOffset }
      } else if (typeof (window.document as any).caretPositionFromPoint === 'function') {
        const pos = (window.document as any).caretPositionFromPoint(x, y)
        if (pos) result = { node: pos.offsetNode, offset: pos.offset }
      }

      if (!result) {
        const el = window.document.elementFromPoint(x, y)
        if (el) {
          result = findDeepestTextNode(el, atEnd)
        }
      } else if (result.node.nodeType !== Node.TEXT_NODE) {
        result = findDeepestTextNode(result.node, atEnd)
      }

      return result
    }

    const setAllContentEditable = (editable: boolean) => {
      const editables = window.document.querySelectorAll<HTMLElement>(
        '.lumina-document-sheet [contenteditable]'
      )
      editables.forEach((el) => {
        el.setAttribute('contenteditable', editable ? 'true' : 'false')
      })
    }

    let dragStartPoint: { node: Node; offset: number; blockId?: string | null } | null = null
    let isCrossBlockSelecting = false

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return
      const target = e.target as HTMLElement
      if (
        target.closest('.medium-action-bar-container') ||
        target.closest('.medium-block-plus-gutter') ||
        target.closest('.lumina-bubble-toolbar') ||
        target.closest('.lumina-slash-menu') ||
        target.closest('.lumina-modal-overlay') ||
        target.closest('button')
      ) {
        dragStartPoint = null
        return
      }

      setAllContentEditable(true)

      const blockWrap = target.closest(
        '.lumina-block-wrapper, .notion-title-row, .notion-subtitle-row'
      )
      if (blockWrap) {
        const pt = getCaretPoint(e.clientX, e.clientY)
        if (pt) {
          dragStartPoint = {
            node: pt.node,
            offset: pt.offset,
            blockId:
              blockWrap.getAttribute('data-block-id') ||
              (blockWrap.classList.contains('notion-title-row')
                ? 'title'
                : blockWrap.classList.contains('notion-subtitle-row')
                ? 'subtitle'
                : null),
          }
          isCrossBlockSelecting = false
        }
      } else {
        dragStartPoint = null
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (e.buttons !== 1 || !dragStartPoint) {
        if (e.buttons !== 1) {
          dragStartPoint = null
          isCrossBlockSelecting = false
        }
        return
      }

      const target = e.target as HTMLElement
      const currentBlockWrap = target.closest(
        '.lumina-block-wrapper, .notion-title-row, .notion-subtitle-row'
      )
      const currentBlockId =
        currentBlockWrap?.getAttribute('data-block-id') ||
        (currentBlockWrap?.classList.contains('notion-title-row')
          ? 'title'
          : currentBlockWrap?.classList.contains('notion-subtitle-row')
          ? 'subtitle'
          : null)

      if (currentBlockId !== dragStartPoint.blockId || isCrossBlockSelecting) {
        let currentPt = getCaretPoint(e.clientX, e.clientY)

        // Boundary check: if mouse dragged above first block or sheet top
        const sheet = canvasRef.current?.querySelector('.lumina-document-sheet')
        if (sheet) {
          const blockWrappers = Array.from(
            sheet.querySelectorAll<HTMLElement>('.lumina-block-wrapper')
          )
          const firstBlockWrap = blockWrappers[0]
          const lastBlockWrap = blockWrappers[blockWrappers.length - 1]

          if (firstBlockWrap && e.clientY < firstBlockWrap.getBoundingClientRect().top) {
            const topEl = sheet.querySelector<HTMLElement>(
              '.notion-title-input, .lumina-block-wrapper [contenteditable], .lumina-block-wrapper .lumina-paragraph'
            )
            if (topEl) {
              currentPt = findDeepestTextNode(topEl, false)
            }
          } else if (lastBlockWrap && e.clientY > lastBlockWrap.getBoundingClientRect().bottom) {
            const bottomEl = lastBlockWrap.querySelector<HTMLElement>(
              '[contenteditable], .lumina-paragraph'
            )
            if (bottomEl) {
              currentPt = findDeepestTextNode(bottomEl, true)
            }
          }
        }

        if (!currentPt) return

        if (!isCrossBlockSelecting) {
          isCrossBlockSelecting = true
          setAllContentEditable(false)
          if (
            window.document.activeElement instanceof HTMLElement &&
            window.document.activeElement.isContentEditable
          ) {
            window.document.activeElement.blur()
          }
        }

        const sel = window.getSelection()
        if (sel) {
          try {
            const range = window.document.createRange()
            const comp = dragStartPoint.node.compareDocumentPosition(currentPt.node)

            if (
              dragStartPoint.node === currentPt.node
                ? dragStartPoint.offset <= currentPt.offset
                : comp & Node.DOCUMENT_POSITION_FOLLOWING || comp === 0
            ) {
              range.setStart(dragStartPoint.node, dragStartPoint.offset)
              range.setEnd(currentPt.node, currentPt.offset)
            } else {
              range.setStart(currentPt.node, currentPt.offset)
              range.setEnd(dragStartPoint.node, dragStartPoint.offset)
            }

            sel.removeAllRanges()
            sel.addRange(range)
          } catch {
            // fallback
          }
        }
      }
    }

    const handleMouseUp = () => {
      dragStartPoint = null
      const sel = window.getSelection()
      if (!sel || sel.isCollapsed || !isCrossBlockSelecting) {
        setAllContentEditable(true)
      }
      isCrossBlockSelecting = false
    }

    window.addEventListener('keydown', handleGlobalShortcuts)
    window.addEventListener('copy', handleCopy)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('keydown', handleGlobalShortcuts)
      window.removeEventListener('copy', handleCopy)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [document])

  const zoom = document.settings.zoom || 100
  const zoomScale = zoom / 100
  const canvasWidth = 740

  const focusFirstBodyBlock = () => {
    if (
      document.blocks.length > 0 &&
      document.blocks[0].type === 'paragraph' &&
      !document.blocks[0].content.trim()
    ) {
      const firstId = document.blocks[0].id
      setSelectedBlockId(firstId)
      setTimeout(() => {
        const el = window.document.querySelector<HTMLElement>(
          `[data-block-id="${firstId}"] [contenteditable="true"], [data-block-id="${firstId}"].lumina-paragraph`
        )
        if (el) el.focus()
      }, 30)
    } else {
      const newBlock = addBlock('paragraph', '__START__', { content: '' })
      setSelectedBlockId(newBlock.id)
      setTimeout(() => {
        const el = window.document.querySelector<HTMLElement>(
          `[data-block-id="${newBlock.id}"] [contenteditable="true"], [data-block-id="${newBlock.id}"].lumina-paragraph`
        )
        if (el) el.focus()
      }, 30)
    }
  }

  const handleSheetClick = (e: React.MouseEvent) => {
    // If user was dragging cursor to select text, do not clear selection
    const sel = window.getSelection()
    if (sel && !sel.isCollapsed && sel.toString().trim().length > 0) {
      return
    }

    const target = e.target as HTMLElement

    // If clicking on inputs, textareas, buttons, toolbars, popups, active contenteditable, or inside any block, ignore
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.tagName === 'BUTTON' ||
      target.closest('button') ||
      target.closest('.medium-block-plus-gutter') ||
      target.closest('.lumina-bubble-toolbar') ||
      target.closest('.lumina-slash-menu') ||
      target.closest('.lumina-modal-overlay') ||
      target.closest('.lumina-image-container') ||
      target.closest('.lumina-video-wrapper') ||
      target.closest('.lumina-unsplash-block') ||
      target.isContentEditable ||
      target.closest('.lumina-block-wrapper') ||
      target.closest('.notion-page-header')
    ) {
      return
    }

    const clickY = e.clientY
    const blockWrappers = Array.from(
      window.document.querySelectorAll<HTMLElement>('.lumina-block-wrapper')
    )

    if (blockWrappers.length === 0) return

    const lastWrapper = blockWrappers[blockWrappers.length - 1]
    const lastBlock = document.blocks[document.blocks.length - 1]

    // If clicked below the last block on the sheet:
    // Focus the last empty block (the 3rd line). NEVER create a new block beyond that!
    if (lastWrapper) {
      const lastRect = lastWrapper.getBoundingClientRect()
      if (clickY > lastRect.bottom) {
        // If the last block is not an empty paragraph (e.g. it's a code block, image, video, etc.),
        // create a new empty paragraph directly below it so user can click + and insert new blocks!
        if (
          !lastBlock ||
          lastBlock.type !== 'paragraph' ||
          (lastBlock.content && lastBlock.content.trim() !== '')
        ) {
          const newPara = addBlock('paragraph', lastBlock?.id, { content: '' })
          setSelectedBlockId(newPara.id)
          setTimeout(() => {
            const el = window.document.querySelector<HTMLElement>(
              `[data-block-id="${newPara.id}"] [contenteditable="true"], [data-block-id="${newPara.id}"].lumina-paragraph`
            )
            if (el) el.focus()
          }, 30)
          return
        }

        if (lastBlock) {
          setSelectedBlockId(lastBlock.id)
          setTimeout(() => {
            const el = window.document.querySelector<HTMLElement>(
              `[data-block-id="${lastBlock.id}"] [contenteditable="true"], [data-block-id="${lastBlock.id}"].lumina-paragraph`
            )
            if (el) el.focus()
          }, 30)
        }
        return
      }
    }

    // If clicked between blocks or on the margin, focus the closest existing block
    let closestBlockId: string | null = null
    let minDistance = Infinity

    for (const el of blockWrappers) {
      const rect = el.getBoundingClientRect()
      const dist = Math.abs(rect.top + rect.height / 2 - clickY)
      if (dist < minDistance) {
        minDistance = dist
        closestBlockId = el.getAttribute('data-block-id')
      }
    }

    if (closestBlockId) {
      setSelectedBlockId(closestBlockId)
      setTimeout(() => {
        const el = window.document.querySelector<HTMLElement>(
          `[data-block-id="${closestBlockId}"] [contenteditable="true"], [data-block-id="${closestBlockId}"].lumina-paragraph`
        )
        if (el) el.focus()
      }, 30)
    }
  }

  return (
    <main className="lumina-canvas-viewport" ref={canvasRef}>
      {/* Scaled Canvas Container */}
      <div
        className="lumina-canvas-scale-wrapper"
        style={{
          transform: `scale(${zoomScale})`,
          transformOrigin: 'top center',
        }}
      >
        <div
          className={`lumina-document-sheet ${isPreviewMode ? 'is-preview-mode' : ''}`}
          style={{ maxWidth: `${canvasWidth}px`, width: '100%' }}
          onClick={handleSheetClick}
        >
          {/* Optional Document Cover Banner */}
          {document.metadata.coverImage && (
            <div className="document-cover-banner">
              <img
                src={document.metadata.coverImage}
                alt="Document banner"
                className="document-cover-img"
              />
            </div>
          )}

          {/* Medium Story Header: Title & Subtitle */}
          <div className="notion-page-header">
            {/* Title Row */}
            <div className="notion-title-row">
              {/* Left Side: Title label in subtle gray (hidden once user enters or moves to next line) */}
              <div
                className={`notion-title-gutter ${
                  !(isTitleFocused && selectedBlockId === null) ? 'is-hidden' : ''
                }`}
              >
                <span className="notion-title-label">Title</span>
              </div>

              {/* Vertical separator line spanning title height */}
              <div
                className={`notion-title-separator ${
                  !(isTitleFocused && selectedBlockId === null) ? 'is-hidden' : ''
                }`}
              />

              {/* Title Input */}
              <textarea
                ref={titleTextareaRef}
                className="notion-title-input"
                value={document.title}
                placeholder="Title"
                rows={1}
                autoFocus
                onFocus={() => {
                  setIsTitleFocused(true)
                  setSelectedBlockId(null)
                }}
                onBlur={() => {
                  setIsTitleFocused(false)
                }}
                onChange={(e) => {
                  setDocumentTitle(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    // Move to Subtitle
                    if (subtitleTextareaRef.current) {
                      subtitleTextareaRef.current.focus()
                    } else {
                      focusFirstBodyBlock()
                    }
                  } else if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    subtitleTextareaRef.current?.focus()
                  }
                }}
              />
            </div>

            {/* Subtitle Row */}
            <div className="notion-subtitle-row">
              <textarea
                ref={subtitleTextareaRef}
                className="notion-subtitle-input"
                value={document.subtitle || ''}
                placeholder="What I learned while building Lumina..."
                rows={1}
                onChange={(e) => {
                  setDocumentSubtitle(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    focusFirstBodyBlock()
                  } else if (e.key === 'Backspace' && (!document.subtitle || document.subtitle.trim() === '')) {
                    e.preventDefault()
                    if (titleTextareaRef.current) {
                      titleTextareaRef.current.focus()
                      titleTextareaRef.current.setSelectionRange(
                        titleTextareaRef.current.value.length,
                        titleTextareaRef.current.value.length
                      )
                    }
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    titleTextareaRef.current?.focus()
                  } else if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    focusFirstBodyBlock()
                  }
                }}
              />
            </div>
          </div>

          {/* Document Content Blocks (Medium body stream) */}
          {document.blocks.length > 0 && (
            <div className="document-blocks-stream">
              {document.blocks.map((block, idx) => (
                <BlockRenderer key={block.id} block={block} index={idx} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Formatting Toolbar on Text Selection */}
      {!isPreviewMode && <BubbleToolbar />}

      {/* Keyboard Shortcuts Modal (Cmd/Ctrl + ?) */}
      <KeyboardShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
    </main>
  )
}
