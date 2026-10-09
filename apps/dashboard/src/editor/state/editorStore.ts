import { useState, useEffect } from 'react'
import type {
  BlockType,
  DocumentMetadata,
  DocumentSettings,
  DocumentVersion,
  EditorComment,
  LuminaBlock,
  LuminaDocument,
} from '../types'
import { TEMPLATES_DATA } from './templatesData'

const STORAGE_KEY = 'lumina_editor_doc_v2'
const VERSIONS_KEY = 'lumina_editor_versions_v1'

export const DEFAULT_BLOCKS: LuminaBlock[] = [
  {
    id: 'block-title',
    type: 'heading-1',
    content: 'Fall 2026 Campus Symposium & Innovation Expo',
    styles: {
      fontSize: 34,
      fontWeight: 700,
      color: '#ffffff',
      letterSpacing: '-0.03em',
      textAlign: 'left',
    },
  },
  {
    id: 'block-intro',
    type: 'paragraph',
    content:
      'Welcome to the official creative workspace of Lumina. Use this document to craft campus announcements, research presentations, event posters, or club showcases.',
    styles: {
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.72)',
      lineHeight: 1.65,
    },
  },
  {
    id: 'block-event-demo',
    type: 'campus-event',
    content: '',
    metadata: {
      title: 'Lumina Keynote & Student Developer Showcase',
      date: 'Friday, October 24, 2026',
      time: '10:00 AM - 4:30 PM',
      location: 'Student Union Grand Hall & Live Stream',
      organizer: 'Lumina University Network & CS Council',
      buttonText: 'RSVP Attendance',
      buttonUrl: 'https://lumina.edu/symposium',
    },
  },
  {
    id: 'block-callout-demo',
    type: 'callout',
    content:
      'Tip: Use the "+" button to insert images, videos, tables, or divider lines.',
    styles: {
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
      borderColor: 'rgba(255, 255, 255, 0.15)',
      borderWidth: 1,
      borderRadius: 8,
      padding: 14,
    },
  },
]

const DEFAULT_INITIAL_BLOCKS: LuminaBlock[] = [
  { id: 'b-init-1', type: 'paragraph', content: '' },
]

const INITIAL_DOC: LuminaDocument = {
  id: 'doc-lumina-default',
  title: '',
  metadata: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: {
      id: 'u-1',
      name: 'Lumina Creator',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      department: 'School of Computing',
    },
    category: 'General',
    tags: [],
    visibility: 'college',
    status: 'draft',
    coverImage: undefined,
  },
  settings: {
    canvasWidth: 680,
    zoom: 100,
    theme: 'dark',
    fontFamily: 'serif',
    lineHeight: 1.6,
    showRulers: false,
    snapToGrid: true,
  },
  blocks: DEFAULT_INITIAL_BLOCKS,
  version: 1,
}

export function sanitizeBlocks(blocks: LuminaBlock[]): LuminaBlock[] {
  if (!blocks || blocks.length === 0) {
    return [{ id: 'b-init-1', type: 'paragraph', content: '' }]
  }

  const result: LuminaBlock[] = []
  let consecutiveEmpty = 0

  for (const block of blocks) {
    const isEmpty =
      block.type === 'paragraph' && (!block.content || !block.content.trim())
    if (isEmpty) {
      consecutiveEmpty++
      if (consecutiveEmpty <= 3) {
        result.push(block)
      }
    } else {
      consecutiveEmpty = 0
      result.push(block)
    }
  }

  return result.length > 0
    ? result
    : [{ id: 'b-init-1', type: 'paragraph', content: '' }]
}

class EditorStore {
  private document: LuminaDocument
  private history: LuminaDocument[] = []
  private historyIndex: number = -1
  private selectedBlockId: string | null = null
  private activeLeftTool: string | null = null
  private autosaveStatus: 'saved' | 'saving' | 'unsaved' = 'saved'
  private lastSavedTime: Date = new Date()
  private comments: EditorComment[] = []
  private listeners: Set<() => void> = new Set()
  private saveTimeout: any = null

  constructor() {
    this.document = this.loadInitialDocument()
    this.pushHistory(this.document)
  }

  private loadInitialDocument(): LuminaDocument {
    if (typeof window === 'undefined') return INITIAL_DOC
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed && Array.isArray(parsed.blocks)) {
          parsed.blocks = sanitizeBlocks(parsed.blocks)
          if (parsed.settings && parsed.settings.canvasWidth > 680) {
            parsed.settings.canvasWidth = 680
          }
          return parsed
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_DOC
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notify() {
    this.listeners.forEach((listener) => listener())
  }

  public getDocument(): LuminaDocument {
    return this.document
  }

  public getSelectedBlockId(): string | null {
    return this.selectedBlockId
  }

  public getSelectedBlock(): LuminaBlock | null {
    if (!this.selectedBlockId) return null
    return this.document.blocks.find((b) => b.id === this.selectedBlockId) || null
  }

  public getActiveLeftTool(): string | null {
    return this.activeLeftTool
  }

  public getAutosaveStatus(): 'saved' | 'saving' | 'unsaved' {
    return this.autosaveStatus
  }

  public getLastSavedTime(): Date {
    return this.lastSavedTime
  }

  public getComments(): EditorComment[] {
    return this.comments
  }

  public canUndo(): boolean {
    return this.historyIndex > 0
  }

  public canRedo(): boolean {
    return this.historyIndex < this.history.length - 1
  }

  private pushHistory(doc: LuminaDocument) {
    // Truncate redo stack when new action is performed
    this.history = this.history.slice(0, this.historyIndex + 1)
    this.history.push(JSON.parse(JSON.stringify(doc)))
    if (this.history.length > 50) {
      this.history.shift()
    } else {
      this.historyIndex++
    }
  }

  private scheduleAutosave() {
    this.autosaveStatus = 'saving'
    this.notify()

    if (this.saveTimeout) clearTimeout(this.saveTimeout)
    this.saveTimeout = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.document))
        this.autosaveStatus = 'saved'
        this.lastSavedTime = new Date()
      } catch {
        this.autosaveStatus = 'unsaved'
      }
      this.notify()
    }, 600)
  }

  public setSelectedBlockId(id: string | null) {
    this.selectedBlockId = id
    this.notify()
  }

  public setActiveLeftTool(tool: string | null) {
    this.activeLeftTool = tool === this.activeLeftTool ? null : tool
    this.notify()
  }

  public setDocumentTitle(title: string) {
    this.document = {
      ...this.document,
      title,
      metadata: {
        ...this.document.metadata,
        updatedAt: new Date().toISOString(),
      },
    }
    this.pushHistory(this.document)
    this.scheduleAutosave()
    this.notify()
  }

  public setDocumentSubtitle(subtitle: string) {
    this.document = {
      ...this.document,
      subtitle,
      metadata: {
        ...this.document.metadata,
        updatedAt: new Date().toISOString(),
      },
    }
    this.pushHistory(this.document)
    this.scheduleAutosave()
    this.notify()
  }

  public setDocumentSettings(settings: Partial<DocumentSettings>) {
    this.document = {
      ...this.document,
      settings: {
        ...this.document.settings,
        ...settings,
      },
    }
    this.pushHistory(this.document)
    this.scheduleAutosave()
    this.notify()
  }

  public setDocumentMetadata(metadata: Partial<DocumentMetadata>) {
    this.document = {
      ...this.document,
      metadata: {
        ...this.document.metadata,
        ...metadata,
        updatedAt: new Date().toISOString(),
      },
    }
    this.pushHistory(this.document)
    this.scheduleAutosave()
    this.notify()
  }

  public resetDocument(author?: { id?: string; name?: string; avatar?: string; department?: string }) {
    if (this.saveTimeout) clearTimeout(this.saveTimeout)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    const freshDoc: LuminaDocument = {
      ...INITIAL_DOC,
      id: `doc-${Date.now()}`,
      title: '',
      subtitle: undefined,
      metadata: {
        ...INITIAL_DOC.metadata,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: {
          id: author?.id || 'u-1',
          name: author?.name || 'Lumina Creator',
          avatar:
            author?.avatar ||
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
          department: author?.department || 'School of Computing',
        },
        tags: [],
        status: 'draft',
        coverImage: undefined,
      },
      blocks: [{ id: `b-init-${Date.now()}`, type: 'paragraph', content: '' }],
    }
    this.document = freshDoc
    this.history = [JSON.parse(JSON.stringify(freshDoc))]
    this.historyIndex = 0
    this.selectedBlockId = null
    this.activeLeftTool = null
    this.autosaveStatus = 'saved'
    this.notify()
  }

  public addBlock(type: BlockType, afterBlockId?: string, initialData?: Partial<LuminaBlock>): LuminaBlock {
    // Guard: Prevent creating more than 3 consecutive empty paragraph lines
    if (type === 'paragraph' && (!initialData?.content || !initialData.content.trim())) {
      let targetIdx = this.document.blocks.length
      if (afterBlockId === '__START__') {
        targetIdx = 0
      } else if (afterBlockId) {
        const found = this.document.blocks.findIndex((b) => b.id === afterBlockId)
        if (found !== -1) targetIdx = found + 1
      }

      let consecutiveEmpty = 0
      for (let i = targetIdx - 1; i >= 0; i--) {
        const b = this.document.blocks[i]
        if (b.type === 'paragraph' && (!b.content || !b.content.trim())) {
          consecutiveEmpty++
        } else {
          break
        }
      }
      for (let i = targetIdx; i < this.document.blocks.length; i++) {
        const b = this.document.blocks[i]
        if (b.type === 'paragraph' && (!b.content || !b.content.trim())) {
          consecutiveEmpty++
        } else {
          break
        }
      }

      if (consecutiveEmpty >= 3) {
        const fallback = this.document.blocks[targetIdx - 1] || this.document.blocks[targetIdx]
        if (fallback) {
          this.selectedBlockId = fallback.id
          this.notify()
          return fallback
        }
      }
    }

    const newBlock: LuminaBlock = {
      id: `b-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type,
      content: initialData?.content ?? '',
      styles: initialData?.styles ?? {},
      metadata: initialData?.metadata ?? {},
      ...initialData,
    }

    let updatedBlocks: LuminaBlock[] = []
    if (afterBlockId === '__START__') {
      updatedBlocks = [newBlock, ...this.document.blocks]
    } else if (afterBlockId) {
      const idx = this.document.blocks.findIndex((b) => b.id === afterBlockId)
      if (idx !== -1) {
        updatedBlocks = [
          ...this.document.blocks.slice(0, idx + 1),
          newBlock,
          ...this.document.blocks.slice(idx + 1),
        ]
      } else {
        updatedBlocks = [...this.document.blocks, newBlock]
      }
    } else {
      updatedBlocks = [...this.document.blocks, newBlock]
    }

    this.document = {
      ...this.document,
      blocks: sanitizeBlocks(updatedBlocks),
    }
    this.selectedBlockId = newBlock.id
    this.pushHistory(this.document)
    this.scheduleAutosave()
    this.notify()
    return newBlock
  }

  public updateBlock(id: string, updates: Partial<LuminaBlock>) {
    const updatedBlocks = this.document.blocks.map((block) => {
      if (block.id !== id) return block
      return {
        ...block,
        ...updates,
        styles: {
          ...block.styles,
          ...updates.styles,
        },
        metadata: {
          ...block.metadata,
          ...updates.metadata,
        },
      }
    })

    this.document = {
      ...this.document,
      blocks: sanitizeBlocks(updatedBlocks),
    }
    this.pushHistory(this.document)
    this.scheduleAutosave()
    this.notify()
  }

  public removeBlock(id: string) {
    const updatedBlocks = this.document.blocks.filter((b) => b.id !== id)
    this.document = {
      ...this.document,
      blocks: sanitizeBlocks(updatedBlocks),
    }
    if (this.selectedBlockId === id) {
      this.selectedBlockId = null
    }
    this.pushHistory(this.document)
    this.scheduleAutosave()
    this.notify()
  }

  public removeBlocks(ids: string[]) {
    const idSet = new Set(ids)
    let updatedBlocks = this.document.blocks.filter((b) => !idSet.has(b.id))
    if (updatedBlocks.length === 0) {
      updatedBlocks = [{ id: `b-${Date.now()}-init`, type: 'paragraph', content: '' }]
    }
    this.document = {
      ...this.document,
      blocks: sanitizeBlocks(updatedBlocks),
    }
    this.selectedBlockId = updatedBlocks[0]?.id || null
    this.pushHistory(this.document)
    this.scheduleAutosave()
    this.notify()
  }

  public duplicateBlock(id: string) {
    const idx = this.document.blocks.findIndex((b) => b.id === id)
    if (idx === -1) return
    const blockToClone = this.document.blocks[idx]
    const clonedBlock: LuminaBlock = {
      ...JSON.parse(JSON.stringify(blockToClone)),
      id: `b-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    }

    const updatedBlocks = [
      ...this.document.blocks.slice(0, idx + 1),
      clonedBlock,
      ...this.document.blocks.slice(idx + 1),
    ]

    this.document = {
      ...this.document,
      blocks: updatedBlocks,
    }
    this.selectedBlockId = clonedBlock.id
    this.pushHistory(this.document)
    this.scheduleAutosave()
    this.notify()
  }

  public moveBlock(id: string, direction: 'up' | 'down') {
    const idx = this.document.blocks.findIndex((b) => b.id === id)
    if (idx === -1) return
    if (direction === 'up' && idx === 0) return
    if (direction === 'down' && idx === this.document.blocks.length - 1) return

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1
    const blocks = [...this.document.blocks]
    const temp = blocks[idx]
    blocks[idx] = blocks[targetIdx]
    blocks[targetIdx] = temp

    this.document = {
      ...this.document,
      blocks,
    }
    this.pushHistory(this.document)
    this.scheduleAutosave()
    this.notify()
  }

  public loadTemplate(templateId: string) {
    const template = TEMPLATES_DATA.find((t) => t.id === templateId)
    if (!template) return

    const freshBlocks = template.blocks.map((b) => ({
      ...b,
      id: `b-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    }))

    this.document = {
      ...this.document,
      title: template.title,
      blocks: freshBlocks,
      metadata: {
        ...this.document.metadata,
        category: template.category,
        updatedAt: new Date().toISOString(),
      },
    }
    this.selectedBlockId = null
    this.activeLeftTool = null
    this.pushHistory(this.document)
    this.scheduleAutosave()
    this.notify()
  }

  public undo() {
    if (this.canUndo()) {
      this.historyIndex--
      this.document = JSON.parse(JSON.stringify(this.history[this.historyIndex]))
      this.scheduleAutosave()
      this.notify()
    }
  }

  public redo() {
    if (this.canRedo()) {
      this.historyIndex++
      this.document = JSON.parse(JSON.stringify(this.history[this.historyIndex]))
      this.scheduleAutosave()
      this.notify()
    }
  }

  public addComment(text: string, blockId?: string) {
    const newComment: EditorComment = {
      id: `c-${Date.now()}`,
      blockId,
      author: {
        name: 'You',
      },
      text,
      createdAt: 'Just now',
      resolved: false,
    }
    this.comments = [newComment, ...this.comments]
    this.notify()
  }

  public resolveComment(commentId: string) {
    this.comments = this.comments.map((c) =>
      c.id === commentId ? { ...c, resolved: !c.resolved } : c
    )
    this.notify()
  }

  public saveVersionSnapshot(summary: string = 'Manual save') {
    try {
      const versions: DocumentVersion[] = JSON.parse(
        localStorage.getItem(VERSIONS_KEY) || '[]'
      )
      const newVersion: DocumentVersion = {
        version: versions.length + 1,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        authorName: this.document.metadata.author.name,
        changesSummary: summary,
        document: JSON.parse(JSON.stringify(this.document)),
      }
      versions.unshift(newVersion)
      localStorage.setItem(VERSIONS_KEY, JSON.stringify(versions.slice(0, 20)))
    } catch {
      // ignore
    }
  }

  public getSavedVersions(): DocumentVersion[] {
    try {
      return JSON.parse(localStorage.getItem(VERSIONS_KEY) || '[]')
    } catch {
      return []
    }
  }

  public restoreVersion(version: DocumentVersion) {
    this.document = JSON.parse(JSON.stringify(version.document))
    this.pushHistory(this.document)
    this.scheduleAutosave()
    this.notify()
  }
}

export const editorStore = new EditorStore()

export function useEditorStore() {
  const [, setTick] = useState(0)

  useEffect(() => {
    return editorStore.subscribe(() => {
      setTick((t) => t + 1)
    })
  }, [])

  return {
    document: editorStore.getDocument(),
    selectedBlockId: editorStore.getSelectedBlockId(),
    selectedBlock: editorStore.getSelectedBlock(),
    activeLeftTool: editorStore.getActiveLeftTool(),
    autosaveStatus: editorStore.getAutosaveStatus(),
    lastSavedTime: editorStore.getLastSavedTime(),
    comments: editorStore.getComments(),
    canUndo: editorStore.canUndo(),
    canRedo: editorStore.canRedo(),
    setSelectedBlockId: (id: string | null) => editorStore.setSelectedBlockId(id),
    setActiveLeftTool: (tool: string | null) => editorStore.setActiveLeftTool(tool),
    setDocumentTitle: (title: string) => editorStore.setDocumentTitle(title),
    setDocumentSubtitle: (subtitle: string) => editorStore.setDocumentSubtitle(subtitle),
    setDocumentSettings: (settings: Partial<DocumentSettings>) =>
      editorStore.setDocumentSettings(settings),
    setDocumentMetadata: (metadata: Partial<DocumentMetadata>) =>
      editorStore.setDocumentMetadata(metadata),
    addBlock: (type: BlockType, afterBlockId?: string, initialData?: Partial<LuminaBlock>) =>
      editorStore.addBlock(type, afterBlockId, initialData),
    updateBlock: (id: string, updates: Partial<LuminaBlock>) =>
      editorStore.updateBlock(id, updates),
    removeBlock: (id: string) => editorStore.removeBlock(id),
    removeBlocks: (ids: string[]) => editorStore.removeBlocks(ids),
    duplicateBlock: (id: string) => editorStore.duplicateBlock(id),
    moveBlock: (id: string, direction: 'up' | 'down') =>
      editorStore.moveBlock(id, direction),
    loadTemplate: (templateId: string) => editorStore.loadTemplate(templateId),
    undo: () => editorStore.undo(),
    redo: () => editorStore.redo(),
    addComment: (text: string, blockId?: string) => editorStore.addComment(text, blockId),
    resolveComment: (commentId: string) => editorStore.resolveComment(commentId),
    saveVersionSnapshot: (summary?: string) => editorStore.saveVersionSnapshot(summary),
    getSavedVersions: () => editorStore.getSavedVersions(),
    restoreVersion: (v: DocumentVersion) => editorStore.restoreVersion(v),
    resetDocument: (author?: { id?: string; name?: string; avatar?: string; department?: string }) =>
      editorStore.resetDocument(author),
  }
}

useEditorStore.getState = () => ({
  document: editorStore.getDocument(),
  selectedBlockId: editorStore.getSelectedBlockId(),
  selectedBlock: editorStore.getSelectedBlock(),
  activeLeftTool: editorStore.getActiveLeftTool(),
  autosaveStatus: editorStore.getAutosaveStatus(),
  lastSavedTime: editorStore.getLastSavedTime(),
  comments: editorStore.getComments(),
  canUndo: editorStore.canUndo(),
  canRedo: editorStore.canRedo(),
  setSelectedBlockId: (id: string | null) => editorStore.setSelectedBlockId(id),
  setActiveLeftTool: (tool: string | null) => editorStore.setActiveLeftTool(tool),
  setDocumentTitle: (title: string) => editorStore.setDocumentTitle(title),
  setDocumentSubtitle: (subtitle: string) => editorStore.setDocumentSubtitle(subtitle),
  setDocumentSettings: (settings: Partial<DocumentSettings>) =>
    editorStore.setDocumentSettings(settings),
  setDocumentMetadata: (metadata: Partial<DocumentMetadata>) =>
    editorStore.setDocumentMetadata(metadata),
  addBlock: (type: BlockType, afterBlockId?: string, initialData?: Partial<LuminaBlock>) =>
    editorStore.addBlock(type, afterBlockId, initialData),
  updateBlock: (id: string, updates: Partial<LuminaBlock>) =>
    editorStore.updateBlock(id, updates),
  removeBlock: (id: string) => editorStore.removeBlock(id),
  removeBlocks: (ids: string[]) => editorStore.removeBlocks(ids),
  duplicateBlock: (id: string) => editorStore.duplicateBlock(id),
  moveBlock: (id: string, direction: 'up' | 'down') =>
    editorStore.moveBlock(id, direction),
  loadTemplate: (templateId: string) => editorStore.loadTemplate(templateId),
  undo: () => editorStore.undo(),
  redo: () => editorStore.redo(),
  addComment: (text: string, blockId?: string) => editorStore.addComment(text, blockId),
  resolveComment: (commentId: string) => editorStore.resolveComment(commentId),
  saveVersionSnapshot: (summary?: string) => editorStore.saveVersionSnapshot(summary),
  getSavedVersions: () => editorStore.getSavedVersions(),
  restoreVersion: (v: DocumentVersion) => editorStore.restoreVersion(v),
  resetDocument: (author?: { id?: string; name?: string; avatar?: string; department?: string }) =>
    editorStore.resetDocument(author),
})
