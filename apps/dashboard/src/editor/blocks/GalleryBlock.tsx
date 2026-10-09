import React from 'react'
import type { LuminaBlock } from '../types'
import { useEditorStore } from '../state/editorStore'
import { EditorIcons } from '../icons'

interface GalleryBlockProps {
  block: LuminaBlock
  isSelected: boolean
}

export const GalleryBlock: React.FC<GalleryBlockProps> = ({ block, isSelected }) => {
  const { updateBlock } = useEditorStore()

  const defaultImages = [
    {
      id: 'img-1',
      url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
      caption: 'Main Library Reading Hall',
    },
    {
      id: 'img-2',
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
      caption: 'Student Collaboration Hub',
    },
    {
      id: 'img-3',
      url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80',
      caption: 'Lecture Amphitheater',
    },
  ]

  const items = block.metadata?.items || defaultImages

  const handleAddImage = () => {
    const newItems = [
      ...items,
      {
        id: `img-${Date.now()}`,
        url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80',
        caption: 'Campus Quadrangle',
      },
    ]
    updateBlock(block.id, {
      metadata: { ...block.metadata, items: newItems },
    })
  }

  const handleRemoveImage = (index: number) => {
    if (items.length <= 1) return
    const newItems = items.filter((_: any, idx: number) => idx !== index)
    updateBlock(block.id, {
      metadata: { ...block.metadata, items: newItems },
    })
  }

  return (
    <div className={`lumina-gallery-block ${isSelected ? 'is-selected' : ''}`}>
      <div className="lumina-gallery-grid">
        {items.map((item: any, idx: number) => (
          <div key={item.id || idx} className="gallery-item-wrap">
            <img src={item.url} alt={item.caption} className="gallery-item-img" />
            <span className="gallery-item-caption">{item.caption}</span>
            {isSelected && (
              <button
                type="button"
                className="gallery-item-remove-btn"
                onClick={() => handleRemoveImage(idx)}
                title="Remove image"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {isSelected && (
        <div className="gallery-bottom-actions">
          <button type="button" className="lumina-btn-table-action" onClick={handleAddImage}>
            <EditorIcons.Plus size={13} />
            <span>Add Photo to Gallery</span>
          </button>
        </div>
      )}
    </div>
  )
}
