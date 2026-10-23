import React, { useRef, useEffect } from 'react'
import type { LuminaBlock, BlockType } from '../types'
import { useEditorStore } from '../state/editorStore'

export const ALL_CODE_LANGUAGES = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'python', label: 'Python' },
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'json', label: 'JSON' },
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
  { id: 'c', label: 'C' },
  { id: 'csharp', label: 'C#' },
  { id: 'go', label: 'Go' },
  { id: 'rust', label: 'Rust' },
  { id: 'php', label: 'PHP' },
  { id: 'ruby', label: 'Ruby' },
  { id: 'swift', label: 'Swift' },
  { id: 'kotlin', label: 'Kotlin' },
  { id: 'sql', label: 'SQL' },
  { id: 'bash', label: 'Bash / Shell' },
  { id: 'yaml', label: 'YAML' },
  { id: 'markdown', label: 'Markdown' },
  { id: 'xml', label: 'XML' },
  { id: 'r', label: 'R' },
  { id: 'dart', label: 'Dart' },
  { id: 'scala', label: 'Scala' },
  { id: 'lua', label: 'Lua' },
  { id: 'graphql', label: 'GraphQL' },
  { id: 'dockerfile', label: 'Dockerfile' },
  { id: 'plaintext', label: 'Plain Text' },
]

interface TextBlockProps {
  block: LuminaBlock
  isSelected: boolean
}

export const TextBlock: React.FC<TextBlockProps> = ({ block, isSelected }) => {
  const { document, updateBlock, removeBlock, addBlock, setSelectedBlockId } = useEditorStore()
  const contentRef = useRef<HTMLDivElement>(null)
  const lastSyncedContent = useRef<string | undefined>(block.content)

  // Initialize and synchronize DOM content safely without wiping live user input
  useEffect(() => {
    if (contentRef.current) {
      const isCode = block.type === 'code'
      const domVal = isCode ? contentRef.current.innerText : contentRef.current.innerHTML

      // On initial mount or when store content updates from external source (e.g. template, undo/redo)
      if (lastSyncedContent.current !== block.content) {
        if (!domVal || (window.document.activeElement !== contentRef.current && block.content)) {
          if (isCode) {
            contentRef.current.innerText = block.content || ''
          } else {
            contentRef.current.innerHTML = block.content || ''
          }
        }
        lastSyncedContent.current = block.content
      } else if (!domVal && block.content) {
        if (isCode) {
          contentRef.current.innerText = block.content
        } else {
          contentRef.current.innerHTML = block.content
        }
      }
    }
  }, [block.id, block.content, block.type])

  useEffect(() => {
    if (isSelected && contentRef.current) {
      if (window.document.activeElement !== contentRef.current) {
        contentRef.current.focus()
      }
    }
  }, [isSelected])

  const handleFocus = () => {
    setSelectedBlockId(block.id)
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const rawText = e.clipboardData.getData('text/plain')
    if (!rawText) return

    const trimmed = rawText.trim()

    // 1. If pasted text is a valid URL and user has text selected, wrap into a hyperlink
    try {
      const u = new URL(trimmed)
      if (u.protocol === 'http:' || u.protocol === 'https:') {
        const selection = window.getSelection()
        if (selection && !selection.isCollapsed && selection.toString().trim()) {
          e.preventDefault()
          window.document.execCommand('createLink', false, trimmed)
          if (contentRef.current) {
            updateBlock(block.id, { content: contentRef.current.innerHTML })
          }
          return
        }
      }
    } catch {
      // not a url
    }

    // 2. Intelligent multi-line or bullet/number list pasting
    const rawLines = rawText.split(/\r?\n/)
    const hasMultipleLines = rawLines.length > 1
    const startsWithBullet = /^[\s]*[•\-\*\u2022\u2023\u25E6\u2043\u2219]\s+/.test(rawText)
    const startsWithNumber = /^[\s]*\d+[\.\)]\s+/.test(rawText)

    if (hasMultipleLines || startsWithBullet || startsWithNumber) {
      const lines = rawLines.map((l) => l.trim()).filter((l) => l.length > 0)
      if (lines.length > 0) {
        e.preventDefault()
        let currentAfterId = block.id

        lines.forEach((line, index) => {
          let lineType: BlockType = block.type
          let cleanLine = line

          if (/^[\s]*[•\-\*\u2022\u2023\u25E6\u2043\u2219]\s+/.test(line)) {
            lineType = 'bullet-list'
            cleanLine = line.replace(/^[\s]*[•\-\*\u2022\u2023\u25E6\u2043\u2219]\s+/, '')
          } else if (/^[\s]*\d+[\.\)]\s+/.test(line)) {
            lineType = 'number-list'
            cleanLine = line.replace(/^[\s]*\d+[\.\)]\s+/, '')
          } else if (block.type === 'bullet-list' || block.type === 'number-list') {
            lineType = block.type
          } else {
            lineType = 'paragraph'
          }

          if (index === 0) {
            const isCurrentBlockEmpty =
              !block.content || !contentRef.current?.innerText.trim()
            if (isCurrentBlockEmpty) {
              if (contentRef.current) {
                contentRef.current.innerHTML = cleanLine
              }
              updateBlock(block.id, { type: lineType, content: cleanLine })
            } else {
              const created = addBlock(lineType, currentAfterId, { content: cleanLine })
              currentAfterId = created.id
            }
          } else {
            const created = addBlock(lineType, currentAfterId, { content: cleanLine })
            currentAfterId = created.id
          }
        })
        return
      }
    }
  }

  const handleCodePaste = (e: React.ClipboardEvent) => {
    e.stopPropagation()
    const text = e.clipboardData?.getData('text/plain')
    if (text) {
      e.preventDefault()
      window.document.execCommand('insertText', false, text)
      handleInput()
    }
  }

  const handleInput = () => {
    if (!contentRef.current) return
    const text = contentRef.current.innerText
    const html = contentRef.current.innerHTML

    // Markdown typing triggers on space
    if (block.type === 'paragraph') {
      if (text.startsWith('# ')) {
        const clean = text.slice(2)
        contentRef.current.innerHTML = clean
        updateBlock(block.id, { type: 'heading-1', content: clean })
        return
      }
      if (text.startsWith('## ')) {
        const clean = text.slice(3)
        contentRef.current.innerHTML = clean
        updateBlock(block.id, { type: 'heading-2', content: clean })
        return
      }
      if (text.startsWith('### ')) {
        const clean = text.slice(4)
        contentRef.current.innerHTML = clean
        updateBlock(block.id, { type: 'heading-3', content: clean })
        return
      }
      if (text.startsWith('* ') || text.startsWith('- ')) {
        const clean = text.slice(2)
        contentRef.current.innerHTML = clean
        updateBlock(block.id, { type: 'bullet-list', content: clean })
        return
      }
      if (/^1\.\s/.test(text)) {
        const clean = text.replace(/^1\.\s/, '')
        contentRef.current.innerHTML = clean
        updateBlock(block.id, { type: 'number-list', content: clean })
        return
      }
      if (text.startsWith('> ')) {
        const clean = text.slice(2)
        contentRef.current.innerHTML = clean
        updateBlock(block.id, { type: 'quote', content: clean })
        return
      }
    }

    // Handle code block
    if (block.type === 'code') {
      updateBlock(block.id, { content: text })
      return
    }

    updateBlock(block.id, { content: html })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const isCmdOrCtrl = e.metaKey || e.ctrlKey

    // Shortcut: Cmd/Ctrl + A -> Select all elements in canvas on 2nd press (or if already fully selected in block)
    if (isCmdOrCtrl && (e.key === 'a' || e.key === 'A')) {
      const sel = window.getSelection()
      if (contentRef.current && sel && sel.rangeCount > 0) {
        const fullBlockText = contentRef.current.innerText.trim()
        const selectedText = sel.toString().trim()
        if (!fullBlockText || selectedText === fullBlockText) {
          e.preventDefault()
          contentRef.current.blur()
          const sheet = window.document.querySelector('.lumina-document-sheet')
          if (sheet && sel) {
            const range = window.document.createRange()
            range.selectNodeContents(sheet)
            sel.removeAllRanges()
            sel.addRange(range)
          }
          return
        }
      }
    }

    // Shortcut: Cmd/Ctrl + Enter -> Insert Divider
    if (isCmdOrCtrl && e.key === 'Enter') {
      e.preventDefault()
      addBlock('divider', block.id)
      return
    }

    // Shortcut: Cmd/Ctrl + Alt + 1 -> Heading 1
    if (isCmdOrCtrl && e.altKey && e.key === '1') {
      e.preventDefault()
      updateBlock(block.id, { type: 'heading-1' })
      return
    }

    // Shortcut: Cmd/Ctrl + Alt + 2 -> Heading 2 (Subheading)
    if (isCmdOrCtrl && e.altKey && e.key === '2') {
      e.preventDefault()
      updateBlock(block.id, { type: 'heading-2' })
      return
    }

    // Shortcut: Cmd/Ctrl + Alt + 5 -> Quote
    if (isCmdOrCtrl && e.altKey && e.key === '5') {
      e.preventDefault()
      updateBlock(block.id, { type: 'quote' })
      return
    }

    // Shortcut: Cmd/Ctrl + Alt + 6 -> Code block
    if (isCmdOrCtrl && e.altKey && e.key === '6') {
      e.preventDefault()
      updateBlock(block.id, { type: 'code' })
      return
    }

    // Tab key for List Indentation or Code Indentation
    if (e.key === 'Tab') {
      if (block.type === 'code') {
        e.preventDefault()
        window.document.execCommand('insertText', false, '  ')
        return
      }

      if (block.type === 'bullet-list' || block.type === 'number-list') {
        e.preventDefault()
        const currentIndent = block.metadata?.indent || 0
        if (e.shiftKey) {
          // Outdent
          updateBlock(block.id, {
            metadata: { ...block.metadata, indent: Math.max(0, currentIndent - 1) },
          })
        } else {
          // Indent (up to 4 levels)
          updateBlock(block.id, {
            metadata: { ...block.metadata, indent: Math.min(4, currentIndent + 1) },
          })
        }
        return
      }
    }

    // Backspace on empty block
    if (e.key === 'Backspace' && contentRef.current && contentRef.current.innerText.trim() === '') {
      e.preventDefault()

      // If in a list, quote, or code, convert back to paragraph first before deleting
      if (block.type !== 'paragraph') {
        updateBlock(block.id, { type: 'paragraph', metadata: {} })
        return
      }

      const idx = document.blocks.findIndex((b) => b.id === block.id)
      const prevBlock = document.blocks[idx - 1]

      if (idx === 0) {
        setTimeout(() => {
          const subtitleEl = window.document.querySelector<HTMLTextAreaElement>('.notion-subtitle-input')
          const titleEl = window.document.querySelector<HTMLTextAreaElement>('.notion-title-input')
          if (subtitleEl) {
            subtitleEl.focus()
          } else if (titleEl) {
            titleEl.focus()
            titleEl.setSelectionRange(titleEl.value.length, titleEl.value.length)
          }
        }, 30)
        return
      }

      removeBlock(block.id)
      if (prevBlock) {
        setSelectedBlockId(prevBlock.id)
        setTimeout(() => {
          const el = window.document.querySelector<HTMLElement>(
            `[data-block-id="${prevBlock.id}"] [contenteditable="true"], [data-block-id="${prevBlock.id}"].lumina-paragraph, [data-block-id="${prevBlock.id}"] input`
          )
          if (el) el.focus()
        }, 30)
      }
      return
    }

    // Arrow navigation
    if (e.key === 'ArrowDown') {
      const idx = document.blocks.findIndex((b) => b.id === block.id)
      const nextBlock = document.blocks[idx + 1]
      if (nextBlock) {
        e.preventDefault()
        setSelectedBlockId(nextBlock.id)
        setTimeout(() => {
          const el = window.document.querySelector<HTMLElement>(
            `[data-block-id="${nextBlock.id}"] [contenteditable="true"], [data-block-id="${nextBlock.id}"].lumina-paragraph`
          )
          if (el) el.focus()
        }, 30)
        return
      } else if (block.type === 'code') {
        // If at the bottom of code block with no block below, create new empty paragraph
        e.preventDefault()
        const newPara = addBlock('paragraph', block.id, { content: '' })
        setSelectedBlockId(newPara.id)
        setTimeout(() => {
          const el = window.document.querySelector<HTMLElement>(
            `[data-block-id="${newPara.id}"] [contenteditable="true"], [data-block-id="${newPara.id}"].lumina-paragraph`
          )
          if (el) el.focus()
        }, 30)
        return
      }
      return
    }

    if (e.key === 'ArrowUp') {
      const idx = document.blocks.findIndex((b) => b.id === block.id)
      if (idx > 0) {
        const prevBlock = document.blocks[idx - 1]
        e.preventDefault()
        setSelectedBlockId(prevBlock.id)
        setTimeout(() => {
          const el = window.document.querySelector<HTMLElement>(
            `[data-block-id="${prevBlock.id}"] [contenteditable="true"], [data-block-id="${prevBlock.id}"].lumina-paragraph`
          )
          if (el) el.focus()
        }, 30)
        return
      } else {
        const subEl = window.document.querySelector<HTMLTextAreaElement>('.notion-subtitle-input')
        if (subEl) {
          e.preventDefault()
          subEl.focus()
        }
        return
      }
    }

    // Enter key handling
    if (e.key === 'Enter') {
      // Inside code block:
      if (block.type === 'code') {
        if (e.metaKey || e.ctrlKey || (e.shiftKey && e.altKey)) {
          // Exit code block: create new paragraph below
          e.preventDefault()
          const newPara = addBlock('paragraph', block.id, { content: '' })
          setSelectedBlockId(newPara.id)
          setTimeout(() => {
            const el = window.document.querySelector<HTMLElement>(
              `[data-block-id="${newPara.id}"] [contenteditable="true"], [data-block-id="${newPara.id}"].lumina-paragraph`
            )
            if (el) el.focus()
          }, 30)
          return
        }

        e.preventDefault()
        window.document.execCommand('insertLineBreak')
        return
      }

      if (e.shiftKey) {
        // Shift+Enter creates line break inside block
        return
      }

      const currentText = contentRef.current ? contentRef.current.innerText.trim() : ''

      // Markdown: '---' + Enter -> Insert divider
      if (currentText === '---') {
        e.preventDefault()
        updateBlock(block.id, { type: 'divider', content: '' })
        addBlock('paragraph', block.id, { content: '' })
        return
      }

      // Markdown: '```' + Enter -> Convert to code block
      if (currentText === '```') {
        e.preventDefault()
        updateBlock(block.id, { type: 'code', content: '', metadata: { language: 'javascript' } })
        return
      }

      // If inside a list (bullet or number)
      if (block.type === 'bullet-list' || block.type === 'number-list') {
        e.preventDefault()
        // If current item is empty, exit list to paragraph
        if (currentText === '') {
          updateBlock(block.id, { type: 'paragraph', metadata: {} })
        } else {
          // Add next item of same list type and indent level
          addBlock(block.type, block.id, {
            content: '',
            metadata: { indent: block.metadata?.indent || 0 },
          })
        }
        return
      }

      // If inside quote, create new paragraph following the quote
      if (block.type === 'quote') {
        e.preventDefault()
        addBlock('paragraph', block.id, { content: '' })
        return
      }

      // If current paragraph is empty:
      if (block.type === 'paragraph' && currentText === '') {
        e.preventDefault()
        const idx = document.blocks.findIndex((b) => b.id === block.id)

        // Count how many empty paragraph blocks exist before this block
        let emptyBefore = 0
        for (let i = idx - 1; i >= 0; i--) {
          const b = document.blocks[i]
          if (b.type === 'paragraph' && (!b.content || !b.content.trim())) {
            emptyBefore++
          } else {
            break
          }
        }

        // Current block is line (emptyBefore + 1) in the sequence of empty lines
        // If already at or above 3 empty lines from the current place, STOP: cannot create or go beyond that!
        if (emptyBefore + 1 >= 3) {
          return
        }

        const nextBlock = document.blocks[idx + 1]
        // If next block is an empty paragraph, advance cursor to it
        if (
          nextBlock &&
          nextBlock.type === 'paragraph' &&
          (!nextBlock.content || !nextBlock.content.trim())
        ) {
          setSelectedBlockId(nextBlock.id)
          setTimeout(() => {
            const el = window.document.querySelector<HTMLElement>(
              `[data-block-id="${nextBlock.id}"] [contenteditable="true"], [data-block-id="${nextBlock.id}"].lumina-paragraph`
            )
            if (el) el.focus()
          }, 30)
          return
        }

        // Otherwise, create the next empty line (up to max 3)
        const newPara = addBlock('paragraph', block.id, { content: '' })
        setSelectedBlockId(newPara.id)
        setTimeout(() => {
          const el = window.document.querySelector<HTMLElement>(
            `[data-block-id="${newPara.id}"] [contenteditable="true"], [data-block-id="${newPara.id}"].lumina-paragraph`
          )
          if (el) el.focus()
        }, 30)
        return
      }

      // Default: create standard paragraph
      e.preventDefault()
      const newPara = addBlock('paragraph', block.id, { content: '' })
      setSelectedBlockId(newPara.id)
      setTimeout(() => {
        const el = window.document.querySelector<HTMLElement>(
          `[data-block-id="${newPara.id}"] [contenteditable="true"], [data-block-id="${newPara.id}"].lumina-paragraph`
        )
        if (el) el.focus()
      }, 30)
      return
    }
  }

  const indentLevel = block.metadata?.indent || 0
  const indentPadding = indentLevel > 0 ? indentLevel * 24 : 0

  const styles: React.CSSProperties = {
    fontFamily: block.styles?.fontFamily || 'inherit',
    fontSize: block.styles?.fontSize,
    fontWeight: block.styles?.fontWeight,
    color: block.styles?.color || 'inherit',
    textAlign: block.styles?.textAlign || 'left',
    lineHeight: block.styles?.lineHeight,
    letterSpacing: block.styles?.letterSpacing,
    marginLeft: indentPadding > 0 ? `${indentPadding}px` : undefined,
  }

  switch (block.type) {
    case 'heading-1':
      return (
        <h1
          ref={contentRef as any}
          contentEditable
          suppressContentEditableWarning
          onFocus={handleFocus}
          onInput={handleInput}
          onBlur={handleInput}
          onKeyUp={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          className="lumina-heading-1"
          style={styles}
          data-placeholder="Heading..."
        />
      )

    case 'heading-2':
      return (
        <h2
          ref={contentRef as any}
          contentEditable
          suppressContentEditableWarning
          onFocus={handleFocus}
          onInput={handleInput}
          onBlur={handleInput}
          onKeyUp={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          className="lumina-heading-2"
          style={styles}
          data-placeholder="Subheading..."
        />
      )

    case 'heading-3':
      return (
        <h3
          ref={contentRef as any}
          contentEditable
          suppressContentEditableWarning
          onFocus={handleFocus}
          onInput={handleInput}
          onBlur={handleInput}
          onKeyUp={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          className="lumina-heading-3"
          style={styles}
          data-placeholder="Subsection..."
        />
      )

    case 'quote':
      return (
        <blockquote className="lumina-blockquote" style={styles}>
          <div
            ref={contentRef}
            contentEditable
            suppressContentEditableWarning
            onFocus={handleFocus}
            onInput={handleInput}
            onBlur={handleInput}
            onKeyUp={handleInput}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            data-placeholder="Pull quote..."
          />
        </blockquote>
      )

    case 'callout':
      return (
        <div
          className="lumina-callout-box"
          style={{
            backgroundColor: block.styles?.backgroundColor || 'rgba(0, 0, 0, 0.03)',
            borderColor: block.styles?.borderColor || 'rgba(0, 0, 0, 0.1)',
            borderRadius: block.styles?.borderRadius || 8,
            ...styles,
          }}
        >
          <span className="lumina-callout-icon">💡</span>
          <div
            ref={contentRef}
            contentEditable
            suppressContentEditableWarning
            onFocus={handleFocus}
            onInput={handleInput}
            onBlur={handleInput}
            onKeyUp={handleInput}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            className="lumina-callout-content"
            data-placeholder="Callout note or key takeaway..."
          />
        </div>
      )

    case 'code':
      const currentLang = block.metadata?.language || 'typescript'
      const activeLangObj =
        ALL_CODE_LANGUAGES.find(
          (l) => l.id.toLowerCase() === currentLang.toLowerCase()
        ) || ALL_CODE_LANGUAGES[1]
      const langDisplayLabel = `Auto (${activeLangObj.label})`

      return (
        <div
          className="lumina-code-block-wrap"
          onClick={(e) => {
            e.stopPropagation()
            setSelectedBlockId(block.id)
          }}
        >
          <div
            className="medium-code-lang-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="medium-code-lang-label">
              {langDisplayLabel}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="medium-code-lang-chevron"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
            <select
              className="medium-code-lang-hidden-select"
              value={currentLang}
              onChange={(e) => {
                updateBlock(block.id, {
                  metadata: { ...block.metadata, language: e.target.value },
                })
              }}
              title="Select programming language"
            >
              {ALL_CODE_LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          <pre className="lumina-code-pre">
            <code
              ref={contentRef as any}
              contentEditable
              spellCheck={false}
              suppressContentEditableWarning
              onFocus={handleFocus}
              onInput={handleInput}
              onBlur={handleInput}
              onKeyUp={handleInput}
              onKeyDown={handleKeyDown}
              onPaste={handleCodePaste}
              data-placeholder="Code..."
            />
          </pre>
        </div>
      )

    case 'checklist':
      const isChecked = !!block.metadata?.checked
      return (
        <div className="lumina-checklist-row" style={styles}>
          <button
            type="button"
            className={`lumina-checkbox ${isChecked ? 'is-checked' : ''}`}
            onClick={() =>
              updateBlock(block.id, {
                metadata: { ...block.metadata, checked: !isChecked },
              })
            }
          >
            {isChecked && '✓'}
          </button>
          <div
            ref={contentRef}
            contentEditable
            suppressContentEditableWarning
            onFocus={handleFocus}
            onInput={handleInput}
            onBlur={handleInput}
            onKeyUp={handleInput}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            className={`lumina-checklist-text ${isChecked ? 'is-strikethrough' : ''}`}
            data-placeholder="To-do item..."
          />
        </div>
      )

    case 'bullet-list':
      return (
        <div className="lumina-list-item-row is-bullet" style={styles}>
          <span className="lumina-list-bullet">•</span>
          <div
            ref={contentRef}
            contentEditable
            suppressContentEditableWarning
            onFocus={handleFocus}
            onInput={handleInput}
            onBlur={handleInput}
            onKeyUp={handleInput}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            className="lumina-list-text"
            data-placeholder="List item..."
          />
        </div>
      )

    case 'number-list': {
      const blockIdx = document.blocks.findIndex((b) => b.id === block.id)
      let listNum = 1
      if (blockIdx !== -1) {
        for (let i = blockIdx - 1; i >= 0; i--) {
          if (document.blocks[i].type === 'number-list') {
            listNum++
          } else {
            break
          }
        }
      }
      return (
        <div className="lumina-list-item-row is-number" style={styles}>
          <span className="lumina-list-number">{listNum}.</span>
          <div
            ref={contentRef}
            contentEditable
            suppressContentEditableWarning
            onFocus={handleFocus}
            onInput={handleInput}
            onBlur={handleInput}
            onKeyUp={handleInput}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            className="lumina-list-text"
            data-placeholder="Numbered item..."
          />
        </div>
      )
    }

    case 'paragraph':
    default:
      return (
        <p
          ref={contentRef as any}
          contentEditable
          suppressContentEditableWarning
          onFocus={handleFocus}
          onInput={handleInput}
          onBlur={handleInput}
          onKeyUp={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          className="lumina-paragraph"
          style={styles}
        />
      )
  }
}
