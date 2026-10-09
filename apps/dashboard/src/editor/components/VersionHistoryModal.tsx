import React from 'react'
import { useEditorStore } from '../state/editorStore'
import type { DocumentVersion } from '../types'
import { EditorIcons } from '../icons'

interface VersionHistoryModalProps {
  isOpen: boolean
  onClose: () => void
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({ isOpen, onClose }) => {
  const { getSavedVersions, restoreVersion, saveVersionSnapshot, document } = useEditorStore()

  if (!isOpen) return null

  const versions = getSavedVersions()

  const handleCreateSnapshot = () => {
    saveVersionSnapshot('Manual checkpoint snapshot')
    alert('Checkpoint version saved!')
  }

  return (
    <div className="lumina-modal-overlay" onClick={onClose}>
      <div className="lumina-modal-card is-history" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <EditorIcons.History size={18} />
            <h3 className="modal-title">Document Revision History</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="history-toolbar-row">
            <p className="history-hint">
              Review and restore previous autosaves or manual snapshots of this document.
            </p>
            <button
              type="button"
              className="history-checkpoint-btn"
              onClick={handleCreateSnapshot}
            >
              <EditorIcons.Plus size={13} />
              <span>Create Checkpoint</span>
            </button>
          </div>

          <div className="history-timeline-list">
            {/* Current Active Version */}
            <div className="history-version-row is-current">
              <div className="version-status-indicator" />
              <div className="version-meta">
                <span className="version-badge">Current Version</span>
                <span className="version-time">Just now</span>
                <p className="version-summary">
                  {document.blocks.length} blocks · Edited by {document.metadata.author.name}
                </p>
              </div>
            </div>

            {/* Saved Past Versions */}
            {versions.map((ver: DocumentVersion) => (
              <div key={ver.version} className="history-version-row">
                <div className="version-status-indicator is-past" />
                <div className="version-meta">
                  <span className="version-label">Version #{ver.version}</span>
                  <span className="version-time">{ver.timestamp}</span>
                  <p className="version-summary">
                    {ver.changesSummary} · {ver.document.blocks.length} blocks
                  </p>
                </div>
                <button
                  type="button"
                  className="version-restore-btn"
                  onClick={() => {
                    if (confirm(`Restore Version #${ver.version}? Current workspace will be reverted.`)) {
                      restoreVersion(ver)
                      onClose()
                    }
                  }}
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
