export type BlockType =
  | 'paragraph'
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'heading-4'
  | 'bullet-list'
  | 'number-list'
  | 'checklist'
  | 'quote'
  | 'callout'
  | 'code'
  | 'divider'
  | 'image'
  | 'unsplash'
  | 'video'
  | 'embed'
  | 'table'
  | 'gallery'
  | 'shape'
  | 'badge'
  | 'button'
  | 'campus-event'
  | 'internship'
  | 'profile-card'
  | 'club-card'
  | 'achievement'
  | 'announcement'

export interface BlockStyles {
  fontFamily?: string
  fontSize?: number
  fontWeight?: number | string
  color?: string
  backgroundColor?: string
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  lineHeight?: number
  letterSpacing?: string
  borderRadius?: number
  borderColor?: string
  borderWidth?: number
  padding?: number
  width?: string | number
  height?: string | number
  opacity?: number
  boxShadow?: string
  rotation?: number
}

export interface LuminaBlock {
  id: string
  type: BlockType
  content: string
  styles?: BlockStyles
  metadata?: Record<string, any>
  children?: LuminaBlock[]
  isLocked?: boolean
  isHidden?: boolean
}

export type DocumentVisibility = 'public' | 'college' | 'department' | 'friends' | 'private'
export type DocumentStatus = 'draft' | 'published' | 'scheduled'

export interface DocumentMetadata {
  createdAt: string
  updatedAt: string
  author: {
    id: string
    name: string
    avatar?: string
    department?: string
  }
  category: string
  tags: string[]
  coverImage?: string
  visibility: DocumentVisibility
  status: DocumentStatus
  scheduledFor?: string
}

export interface DocumentSettings {
  canvasWidth: number
  zoom: number
  theme: 'dark' | 'light'
  fontFamily: string
  lineHeight: number
  showRulers: boolean
  snapToGrid: boolean
}

export interface LuminaDocument {
  id: string
  title: string
  subtitle?: string
  metadata: DocumentMetadata
  settings: DocumentSettings
  blocks: LuminaBlock[]
  version: number
}

export interface DocumentVersion {
  version: number
  timestamp: string
  authorName: string
  changesSummary: string
  document: LuminaDocument
}

export interface EditorComment {
  id: string
  blockId?: string
  author: {
    name: string
    avatar?: string
  }
  text: string
  createdAt: string
  resolved: boolean
  replies?: Array<{
    id: string
    author: { name: string; avatar?: string }
    text: string
    createdAt: string
  }>
}

export interface MediaAsset {
  id: string
  url: string
  name: string
  type: 'image' | 'video' | 'audio' | 'document'
  size: string
  createdAt: string
  aspectRatio?: string
}
