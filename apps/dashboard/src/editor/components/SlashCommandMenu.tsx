import React, { useState, useEffect, useRef } from 'react'
import type { BlockType } from '../types'
import { useEditorStore } from '../state/editorStore'
import { EditorIcons } from '../icons'

interface SlashCommandItem {
  id: string
  title: string
  subtitle: string
  category: 'Text' | 'Media' | 'Campus' | 'Elements'
  type: BlockType
  icon: React.ReactNode
  initialData?: any
}

const COMMAND_ITEMS: SlashCommandItem[] = [
  // Text
  {
    id: 'text',
    title: 'Text / Paragraph',
    subtitle: 'Plain writing with rich inline formatting',
    category: 'Text',
    type: 'paragraph',
    icon: <EditorIcons.Type size={16} />,
  },
  {
    id: 'h1',
    title: 'Heading 1',
    subtitle: 'Large section title',
    category: 'Text',
    type: 'heading-1',
    icon: <span style={{ fontWeight: 700, fontSize: 13 }}>H1</span>,
  },
  {
    id: 'h2',
    title: 'Heading 2',
    subtitle: 'Medium section title',
    category: 'Text',
    type: 'heading-2',
    icon: <span style={{ fontWeight: 600, fontSize: 13 }}>H2</span>,
  },
  {
    id: 'h3',
    title: 'Heading 3',
    subtitle: 'Small subsection header',
    category: 'Text',
    type: 'heading-3',
    icon: <span style={{ fontWeight: 500, fontSize: 13 }}>H3</span>,
  },
  {
    id: 'callout',
    title: 'Callout Note',
    subtitle: 'Highlighted key takeaway or announcement box',
    category: 'Text',
    type: 'callout',
    icon: <EditorIcons.Info size={16} />,
  },
  {
    id: 'quote',
    title: 'Quote',
    subtitle: 'Capture a memorable student or professor quote',
    category: 'Text',
    type: 'quote',
    icon: <EditorIcons.Quote size={16} />,
  },
  {
    id: 'checklist',
    title: 'To-do Checklist',
    subtitle: 'Interactive task item with checkboxes',
    category: 'Text',
    type: 'checklist',
    icon: <EditorIcons.CheckSquare size={16} />,
  },
  {
    id: 'bullet-list',
    title: 'Bulleted List',
    subtitle: 'Simple unordered bullet list',
    category: 'Text',
    type: 'bullet-list',
    icon: <EditorIcons.List size={16} />,
  },
  {
    id: 'number-list',
    title: 'Numbered List',
    subtitle: 'Ordered step-by-step list',
    category: 'Text',
    type: 'number-list',
    icon: <EditorIcons.ListOrdered size={16} />,
  },
  {
    id: 'code',
    title: 'Code Snippet',
    subtitle: 'Syntax highlighted code block',
    category: 'Text',
    type: 'code',
    icon: <EditorIcons.Code size={16} />,
  },

  // Lumina Campus Ecosystem
  {
    id: 'campus-event',
    title: 'Campus Event Card',
    subtitle: 'Official event date, time, location & registration button',
    category: 'Campus',
    type: 'campus-event',
    icon: <EditorIcons.Calendar size={16} />,
  },
  {
    id: 'internship',
    title: 'Internship Card',
    subtitle: 'Job role, stipend/salary, deadline & direct apply CTA',
    category: 'Campus',
    type: 'internship',
    icon: <EditorIcons.Briefcase size={16} />,
  },
  {
    id: 'club-card',
    title: 'Student Club Card',
    subtitle: 'Organization showcase with member count & join CTA',
    category: 'Campus',
    type: 'club-card',
    icon: <EditorIcons.GraduationCap size={16} />,
  },
  {
    id: 'profile-card',
    title: 'Student Profile Card',
    subtitle: 'Author avatar, department, graduation year & connect button',
    category: 'Campus',
    type: 'profile-card',
    icon: <EditorIcons.Users size={16} />,
  },
  {
    id: 'announcement',
    title: 'Official Announcement Banner',
    subtitle: 'High-priority advisory with department badge',
    category: 'Campus',
    type: 'announcement',
    icon: <EditorIcons.Megaphone size={16} />,
  },

  // Media
  {
    id: 'image',
    title: 'Image',
    subtitle: 'Upload photo or insert image URL',
    category: 'Media',
    type: 'image',
    icon: <EditorIcons.Image size={16} />,
  },
  {
    id: 'unsplash',
    title: 'Unsplash Image',
    subtitle: 'Search and insert photos via Unsplash',
    category: 'Media',
    type: 'unsplash',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z" />
      </svg>
    ),
  },
  {
    id: 'video',
    title: 'Video',
    subtitle: 'Embed YouTube, Vimeo, or MP4 stream',
    category: 'Media',
    type: 'video',
    icon: <EditorIcons.Video size={16} />,
  },

  {
    id: 'table',
    title: 'Interactive Table',
    subtitle: 'Spreadsheet-like rows and columns',
    category: 'Media',
    type: 'table',
    icon: <EditorIcons.Table size={16} />,
  },
  {
    id: 'gallery',
    title: 'Image Gallery',
    subtitle: 'Multi-image grid showcase',
    category: 'Media',
    type: 'gallery',
    icon: <EditorIcons.Grid size={16} />,
  },

  // Elements
  {
    id: 'divider',
    title: 'Divider Line',
    subtitle: 'Clean visual horizontal separator',
    category: 'Elements',
    type: 'divider',
    icon: <EditorIcons.Minus size={16} />,
  },
  {
    id: 'button',
    title: 'Call to Action Button',
    subtitle: 'Interactive link button',
    category: 'Elements',
    type: 'button',
    icon: <EditorIcons.Send size={16} />,
  },
  {
    id: 'badge',
    title: 'Pill Badge',
    subtitle: 'Verified tag or category pill',
    category: 'Elements',
    type: 'badge',
    icon: <EditorIcons.Award size={16} />,
  },
  {
    id: 'shape',
    title: 'Canva Element Shape',
    subtitle: 'Container with custom radius, border, and background',
    category: 'Elements',
    type: 'shape',
    icon: <EditorIcons.Shapes size={16} />,
  },
]

interface SlashCommandMenuProps {
  position: { top: number; left: number }
  onClose: () => void
  targetBlockId?: string
}

export const SlashCommandMenu: React.FC<SlashCommandMenuProps> = ({
  position,
  onClose,
  targetBlockId,
}) => {
  const { addBlock, removeBlock, setSelectedBlockId } = useEditorStore()
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)

  const filteredItems = COMMAND_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  const handleSelect = (item: SlashCommandItem) => {
    // If user typed "/" into an empty target block, replace it
    if (targetBlockId) {
      const newBlock = addBlock(item.type, targetBlockId, item.initialData)
      removeBlock(targetBlockId)
      if (['image', 'video', 'embed', 'table', 'gallery', 'divider'].includes(item.type)) {
        const nextPara = addBlock('paragraph', newBlock.id, { content: '' })
        setSelectedBlockId(nextPara.id)
      }
    } else {
      const newBlock = addBlock(item.type, undefined, item.initialData)
      if (['image', 'video', 'embed', 'table', 'gallery', 'divider'].includes(item.type)) {
        const nextPara = addBlock('paragraph', newBlock.id, { content: '' })
        setSelectedBlockId(nextPara.id)
      }
    }
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex])
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div
      ref={menuRef}
      className="lumina-slash-menu"
      style={{
        top: position.top + 28,
        left: position.left,
      }}
      onKeyDown={handleKeyDown}
    >
      <div className="slash-menu-search-wrap">
        <EditorIcons.Search size={14} className="slash-search-icon" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter blocks or type to search..."
          className="slash-menu-input"
          autoFocus
        />
      </div>

      <div className="slash-menu-list">
        {filteredItems.length === 0 ? (
          <div className="slash-menu-empty">No blocks found matching "{search}"</div>
        ) : (
          filteredItems.map((item, idx) => {
            const isSelected = idx === selectedIndex
            return (
              <button
                key={item.id}
                type="button"
                className={`slash-menu-item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="slash-item-icon">{item.icon}</div>
                <div className="slash-item-text">
                  <span className="slash-item-title">{item.title}</span>
                  <span className="slash-item-subtitle">{item.subtitle}</span>
                </div>
                <span className="slash-item-category">{item.category}</span>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
