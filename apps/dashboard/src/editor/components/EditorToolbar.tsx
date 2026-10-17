import React from 'react'
import { useEditorStore } from '../state/editorStore'
import { EditorIcons } from '../icons'

interface EditorToolbarProps {
  onBackToDashboard: () => void
  onOpenPublish: () => void
  onOpenHistory?: () => void
  isPreviewMode?: boolean
  onTogglePreview?: () => void
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onBackToDashboard,
  onOpenPublish,
}) => {
  const { autosaveStatus } = useEditorStore()

  return (
    <header className="lumina-editor-topbar">
      {/* Left: Brand & Status */}
      <div className="topbar-left-cluster">
        <button
          type="button"
          className="topbar-back-btn"
          onClick={onBackToDashboard}
          title="Back to Lumina Dashboard"
          aria-label="Back to dashboard"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="topbar-divider" />

        {/* Medium-style Draft & Saved indicator matching screenshot */}
        <div className="topbar-status-cluster">
          <span className="topbar-status-draft">Draft</span>
          <span className="topbar-status-saved">
            {autosaveStatus === 'saving' ? 'Saving...' : 'Saved'}
          </span>
        </div>
      </div>

      {/* Right: Share and Publish */}
      <div className="topbar-right-cluster">
        <button
          type="button"
          className="topbar-text-action-btn"
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href)
            alert('Document link copied to clipboard!')
          }}
          title="Share document link"
        >
          <EditorIcons.Share2 size={15} />
          <span className="topbar-share-label">Share</span>
        </button>

        {/* Primary Publish CTA */}
        <button
          type="button"
          className="topbar-publish-btn"
          onClick={onOpenPublish}
        >
          <EditorIcons.Send size={14} />
          <span>Publish</span>
        </button>
      </div>
    </header>
  )
}
