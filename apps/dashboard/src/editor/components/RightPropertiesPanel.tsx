import React from 'react'
import { useEditorStore } from '../state/editorStore'
import { EditorIcons } from '../icons'

export const RightPropertiesPanel: React.FC = () => {
  const {
    selectedBlock,
    updateBlock,
    document,
    setDocumentSettings,
    setSelectedBlockId,
  } = useEditorStore()

  // 1. Document-Level Inspector when no individual block is selected
  if (!selectedBlock) {
    return (
      <aside className="lumina-properties-panel">
        <div className="properties-panel-header">
          <h3 className="properties-title">Document Settings</h3>
          <span className="properties-badge">Canvas</span>
        </div>

        <div className="properties-section">
          <label className="properties-label">Canvas Width</label>
          <div className="properties-btn-toggle-group">
            <button
              type="button"
              className={`toggle-option-btn ${document.settings.canvasWidth === 720 ? 'is-active' : ''}`}
              onClick={() => setDocumentSettings({ canvasWidth: 720 })}
            >
              <span className="toggle-label-main">Standard</span>
              <span className="toggle-label-sub">720px</span>
            </button>
            <button
              type="button"
              className={`toggle-option-btn ${document.settings.canvasWidth === 840 ? 'is-active' : ''}`}
              onClick={() => setDocumentSettings({ canvasWidth: 840 })}
            >
              <span className="toggle-label-main">Wide</span>
              <span className="toggle-label-sub">840px</span>
            </button>
            <button
              type="button"
              className={`toggle-option-btn ${document.settings.canvasWidth === 980 ? 'is-active' : ''}`}
              onClick={() => setDocumentSettings({ canvasWidth: 980 })}
            >
              <span className="toggle-label-main">Full</span>
              <span className="toggle-label-sub">980px</span>
            </button>
          </div>
        </div>

        <div className="properties-section">
          <label className="properties-label">Base Typography</label>
          <select
            value={document.settings.fontFamily}
            onChange={(e) => setDocumentSettings({ fontFamily: e.target.value })}
            className="properties-select"
          >
            <option value="Google Sans">Google Sans (Default)</option>
            <option value="Geist">Geist Sans</option>
            <option value="Instrument Serif">Instrument Serif (Academic)</option>
            <option value="Inter">Inter (Interface)</option>
          </select>
        </div>

        <div className="properties-section">
          <label className="properties-label">Canvas Zoom</label>
          <div className="properties-btn-toggle-group">
            {[75, 100, 125].map((z) => (
              <button
                key={z}
                type="button"
                className={`toggle-option-btn is-zoom ${document.settings.zoom === z ? 'is-active' : ''}`}
                onClick={() => setDocumentSettings({ zoom: z })}
              >
                {z}%
              </button>
            ))}
          </div>
        </div>

        <div className="properties-section">
          <div className="property-hint-card">
            <EditorIcons.Sparkles size={16} />
            <p>
              Select any block, text, image, or card on the canvas to inspect its contextual design controls here.
            </p>
          </div>
        </div>
      </aside>
    )
  }

  // 2. Contextual Inspector for Selected Block
  const styles = selectedBlock.styles || {}

  const handleStyleChange = (key: string, value: any) => {
    updateBlock(selectedBlock.id, {
      styles: {
        ...styles,
        [key]: value,
      },
    })
  }

  return (
    <aside className="lumina-properties-panel">
      <div className="properties-panel-header">
        <h3 className="properties-title">
          {selectedBlock.type.replace('-', ' ').toUpperCase()}
        </h3>
        <button
          type="button"
          className="properties-deselect-btn"
          onClick={() => setSelectedBlockId(null)}
          title="Deselect block"
        >
          ✕
        </button>
      </div>

      {/* Typography Section (if text-bearing) */}
      <div className="properties-section">
        <label className="properties-label">Typography</label>
        <div className="properties-row">
          <select
            value={styles.fontFamily || 'inherit'}
            onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
            className="properties-select"
          >
            <option value="inherit">Inherit Document Font</option>
            <option value="Google Sans">Google Sans</option>
            <option value="Instrument Serif">Instrument Serif</option>
            <option value="Geist">Geist</option>
            <option value="Inter">Inter</option>
          </select>
        </div>

        <div className="properties-two-col">
          <div>
            <span className="prop-sublabel">Font Size</span>
            <input
              type="number"
              min={10}
              max={72}
              value={styles.fontSize || 16}
              onChange={(e) => handleStyleChange('fontSize', Number(e.target.value))}
              className="properties-number-input"
            />
          </div>
          <div>
            <span className="prop-sublabel">Weight</span>
            <select
              value={styles.fontWeight || 400}
              onChange={(e) => handleStyleChange('fontWeight', Number(e.target.value))}
              className="properties-select"
            >
              <option value={400}>Regular (400)</option>
              <option value={500}>Medium (500)</option>
              <option value={600}>Semibold (600)</option>
              <option value={700}>Bold (700)</option>
            </select>
          </div>
        </div>

        {/* Text Alignment */}
        <div className="properties-row" style={{ marginTop: 8 }}>
          <div className="properties-btn-toggle-group">
            <button
              type="button"
              className={`toggle-option-btn ${styles.textAlign === 'left' ? 'is-active' : ''}`}
              onClick={() => handleStyleChange('textAlign', 'left')}
              title="Align Left"
            >
              <EditorIcons.AlignLeft size={14} />
            </button>
            <button
              type="button"
              className={`toggle-option-btn ${styles.textAlign === 'center' ? 'is-active' : ''}`}
              onClick={() => handleStyleChange('textAlign', 'center')}
              title="Align Center"
            >
              <EditorIcons.AlignCenter size={14} />
            </button>
            <button
              type="button"
              className={`toggle-option-btn ${styles.textAlign === 'right' ? 'is-active' : ''}`}
              onClick={() => handleStyleChange('textAlign', 'right')}
              title="Align Right"
            >
              <EditorIcons.AlignRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Colors Section */}
      <div className="properties-section">
        <label className="properties-label">Colors & Background</label>
        <div className="properties-two-col">
          <div>
            <span className="prop-sublabel">Text Color</span>
            <input
              type="color"
              value={styles.color || '#ffffff'}
              onChange={(e) => handleStyleChange('color', e.target.value)}
              className="properties-color-picker"
            />
          </div>
          <div>
            <span className="prop-sublabel">Background</span>
            <input
              type="color"
              value={styles.backgroundColor || '#191919'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="properties-color-picker"
            />
          </div>
        </div>
      </div>

      {/* Dimensions & Border Section */}
      <div className="properties-section">
        <label className="properties-label">Dimensions & Borders</label>
        <div className="properties-two-col">
          <div>
            <span className="prop-sublabel">Border Radius</span>
            <input
              type="number"
              min={0}
              max={50}
              value={styles.borderRadius ?? 8}
              onChange={(e) => handleStyleChange('borderRadius', Number(e.target.value))}
              className="properties-number-input"
            />
          </div>
          <div>
            <span className="prop-sublabel">Border Width</span>
            <input
              type="number"
              min={0}
              max={10}
              value={styles.borderWidth ?? 1}
              onChange={(e) => handleStyleChange('borderWidth', Number(e.target.value))}
              className="properties-number-input"
            />
          </div>
        </div>

        <div className="properties-row" style={{ marginTop: 8 }}>
          <span className="prop-sublabel">Border Color</span>
          <input
            type="color"
            value={styles.borderColor || 'rgba(255,255,255,0.1)'}
            onChange={(e) => handleStyleChange('borderColor', e.target.value)}
            className="properties-color-picker is-wide"
          />
        </div>
      </div>

      {/* Opacity slider */}
      <div className="properties-section">
        <div className="prop-header-with-val">
          <label className="properties-label">Opacity</label>
          <span className="prop-val-display">{Math.round((styles.opacity ?? 1) * 100)}%</span>
        </div>
        <input
          type="range"
          min={10}
          max={100}
          value={(styles.opacity ?? 1) * 100}
          onChange={(e) => handleStyleChange('opacity', Number(e.target.value) / 100)}
          className="properties-range-slider"
        />
      </div>
    </aside>
  )
}
