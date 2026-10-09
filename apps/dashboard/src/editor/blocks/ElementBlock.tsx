import React from 'react'
import type { LuminaBlock } from '../types'
import { useEditorStore } from '../state/editorStore'

interface ElementBlockProps {
  block: LuminaBlock
  isSelected: boolean
}

export const ElementBlock: React.FC<ElementBlockProps> = ({ block, isSelected }) => {
  const { updateBlock } = useEditorStore()

  if (block.type === 'divider') {
    return (
      <div className={`lumina-divider-block ${isSelected ? 'is-selected' : ''}`}>
        <hr className="lumina-hr" />
      </div>
    )
  }

  if (block.type === 'badge') {
    const text = block.content || '★ Verified Campus Event'
    const variant = block.metadata?.variant || 'monochrome'

    return (
      <div className={`lumina-badge-wrap ${isSelected ? 'is-selected' : ''}`}>
        <span
          className={`lumina-badge is-${variant}`}
          style={{
            borderRadius: block.styles?.borderRadius ?? 9999,
            backgroundColor: block.styles?.backgroundColor,
            color: block.styles?.color,
          }}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateBlock(block.id, { content: e.currentTarget.innerText })}
        >
          {text}
        </span>
      </div>
    )
  }

  if (block.type === 'button') {
    const text = block.content || 'Register for Event'
    const url = block.metadata?.url || 'https://lumina.edu'

    return (
      <div
        className={`lumina-button-wrap ${isSelected ? 'is-selected' : ''}`}
        style={{ textAlign: block.styles?.textAlign || 'center' }}
      >
        <button
          type="button"
          className="lumina-canvas-cta-button"
          style={{
            backgroundColor: block.styles?.backgroundColor || '#ffffff',
            color: block.styles?.color || '#121212',
            borderRadius: block.styles?.borderRadius ?? 8,
            padding: `${block.styles?.padding ?? 10}px 24px`,
          }}
          onClick={() => {
            if (url) window.open(url, '_blank')
          }}
        >
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => updateBlock(block.id, { content: e.currentTarget.innerText })}
          >
            {text}
          </span>
          <span className="btn-arrow">→</span>
        </button>
      </div>
    )
  }

  // Canva shape block
  const shapeType = block.metadata?.shapeType || 'rectangle'
  const shapeText = block.content || 'Custom Canva Element'

  return (
    <div className={`lumina-shape-wrap ${isSelected ? 'is-selected' : ''}`}>
      <div
        className={`lumina-shape is-${shapeType}`}
        style={{
          width: block.styles?.width || '100%',
          height: block.styles?.height || 90,
          backgroundColor: block.styles?.backgroundColor || 'rgba(255, 255, 255, 0.04)',
          borderColor: block.styles?.borderColor || 'rgba(255, 255, 255, 0.1)',
          borderWidth: block.styles?.borderWidth ?? 1,
          borderRadius:
            shapeType === 'circle'
              ? '50%'
              : shapeType === 'pill'
              ? 9999
              : block.styles?.borderRadius ?? 12,
          opacity: block.styles?.opacity ?? 1,
        }}
      >
        <span
          className="shape-inner-text"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateBlock(block.id, { content: e.currentTarget.innerText })}
        >
          {shapeText}
        </span>
      </div>
    </div>
  )
}
