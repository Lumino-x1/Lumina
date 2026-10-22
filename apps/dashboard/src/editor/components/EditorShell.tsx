import React, { useState, useEffect } from 'react'
import { EditorToolbar } from './EditorToolbar'
import { EditorCanvas } from './EditorCanvas'
import { PublishModal } from './PublishModal'
import { VersionHistoryModal } from './VersionHistoryModal'
import { useEditorStore } from '../state/editorStore'
import '../Editor.css'

export interface EditorShellProps {
  onBackToDashboard: () => void
  user?: {
    id?: string
    name?: string
    email?: string
    image?: string
  } | null
}

export const EditorShell: React.FC<EditorShellProps> = ({ onBackToDashboard, user }) => {
  const {
    undo,
    redo,
    saveVersionSnapshot,
    setDocumentMetadata,
    removeBlock,
    selectedBlockId,
    resetDocument,
  } = useEditorStore()

  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)

  // Associate author if logged in
  useEffect(() => {
    if (user?.name || user?.email) {
      setDocumentMetadata({
        author: {
          id: user.id || 'u-auth',
          name: user.name || user.email?.split('@')[0] || 'Lumina Creator',
          avatar: user.image,
        },
      })
    }
  }, [user])

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey

      if (e.key === 'Delete' || e.key === 'Backspace') {
        const activeEl = window.document.activeElement
        const isTypingText =
          activeEl instanceof HTMLInputElement ||
          activeEl instanceof HTMLTextAreaElement ||
          (activeEl instanceof HTMLElement &&
            activeEl.isContentEditable &&
            (activeEl.innerText || '').trim().length > 0)

        if (!isTypingText && selectedBlockId) {
          e.preventDefault()
          removeBlock(selectedBlockId)
          return
        }
      }

      if (isCmdOrCtrl && e.key === 'z') {
        e.preventDefault()
        if (e.shiftKey) {
          redo()
        } else {
          undo()
        }
      } else if (isCmdOrCtrl && e.key === 's') {
        e.preventDefault()
        saveVersionSnapshot('Manual save shortcut (⌘S)')
      } else if (isCmdOrCtrl && e.key === 'p') {
        e.preventDefault()
        setIsPublishModalOpen(true)
      } else if (e.key === 'Escape') {
        setIsPublishModalOpen(false)
        setIsHistoryModalOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo, saveVersionSnapshot, removeBlock, selectedBlockId])

  const handlePublishSuccess = () => {
    setIsPublishModalOpen(false)
    resetDocument(
      user
        ? {
            id: user.id || 'u-auth',
            name: user.name || user.email?.split('@')[0] || 'Lumina Creator',
            avatar: user.image,
          }
        : undefined
    )
    onBackToDashboard()
  }

  return (
    <div className="lumina-editor-shell dark" data-theme="dark">
      {/* 1. Top Navigation Bar */}
      <EditorToolbar
        onBackToDashboard={onBackToDashboard}
        onOpenPublish={() => setIsPublishModalOpen(true)}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        isPreviewMode={isPreviewMode}
        onTogglePreview={() => setIsPreviewMode((prev) => !prev)}
      />

      {/* 2. Main Studio Workspace Layout */}
      <div className="lumina-editor-body">
        {/* Central Workspace Canvas */}
        <EditorCanvas isPreviewMode={isPreviewMode} />
      </div>

      {/* 3. Modal Dialogs */}
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onSuccess={handlePublishSuccess}
      />

      <VersionHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      />
    </div>
  )
}

export default EditorShell
