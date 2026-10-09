import React from 'react'

interface KeyboardShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null

  const isMac = typeof navigator !== 'undefined' && /mac/i.test(navigator.userAgent)
  const cmd = isMac ? '⌘' : 'Ctrl'
  const alt = isMac ? '⌥' : 'Alt'

  const shortcuts = [
    {
      category: 'Text Formatting',
      items: [
        { keys: [cmd, 'B'], desc: 'Bold text' },
        { keys: [cmd, 'I'], desc: 'Italic / cursive text' },
        { keys: [cmd, 'K'], desc: 'Add or edit hyperlink' },
        { keys: ['`text`'], desc: 'Inline code' },
      ],
    },
    {
      category: 'Block Styles',
      items: [
        { keys: [cmd, alt, '1'], desc: 'Heading (H1)' },
        { keys: [cmd, alt, '2'], desc: 'Subheading (H2)' },
        { keys: [cmd, alt, '5'], desc: 'Blockquote' },
        { keys: [cmd, alt, '6'], desc: 'Code block' },
        { keys: [cmd, 'Enter'], desc: 'Horizontal divider' },
      ],
    },
    {
      category: 'Markdown Triggers',
      items: [
        { keys: ['# + Space'], desc: 'Heading (H1)' },
        { keys: ['## + Space'], desc: 'Subheading (H2)' },
        { keys: ['* or - + Space'], desc: 'Bullet list' },
        { keys: ['1. + Space'], desc: 'Numbered list' },
        { keys: ['> + Space'], desc: 'Quote' },
        { keys: ['``` + Enter'], desc: 'Code block' },
        { keys: ['--- + Enter'], desc: 'Divider' },
      ],
    },
    {
      category: 'Lists & Navigation',
      items: [
        { keys: ['Tab'], desc: 'Indent (nest list item)' },
        { keys: ['Shift', 'Tab'], desc: 'Outdent list item' },
        { keys: ['Enter'], desc: 'Next list item (or exit on empty)' },
        { keys: ['Backspace'], desc: 'Delete block when empty' },
        { keys: [cmd, '?'], desc: 'Open keyboard shortcuts' },
      ],
    },
  ]

  return (
    <div className="lumina-modal-overlay" onClick={onClose}>
      <div
        className="lumina-shortcuts-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Keyboard Shortcuts"
      >
        <div className="shortcuts-modal-header">
          <div className="shortcuts-modal-title-wrap">
            <span className="shortcuts-icon">⌨</span>
            <h3 className="shortcuts-modal-title">Keyboard Shortcuts</h3>
          </div>
          <button type="button" className="shortcuts-close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="shortcuts-modal-body">
          {shortcuts.map((group) => (
            <div key={group.category} className="shortcuts-group">
              <h4 className="shortcuts-group-title">{group.category}</h4>
              <div className="shortcuts-list">
                {group.items.map((item, idx) => (
                  <div key={idx} className="shortcuts-row">
                    <span className="shortcuts-desc">{item.desc}</span>
                    <div className="shortcuts-keys">
                      {item.keys.map((k, ki) => (
                        <kbd key={ki} className="shortcut-key">
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="shortcuts-modal-footer">
          <span>Tip: You can also use the (+) button to insert any block seamlessly.</span>
        </div>
      </div>
    </div>
  )
}
