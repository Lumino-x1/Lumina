import React from 'react'
import { useEditorStore } from '../state/editorStore'
import { EditorIcons } from '../icons'
import { TEMPLATES_DATA } from '../state/templatesData'
import type { BlockType } from '../types'

export const LeftSidebar: React.FC = () => {
  const {
    activeLeftTool,
    setActiveLeftTool,
    addBlock,
    loadTemplate,
    document,
    selectedBlockId,
    setSelectedBlockId,
    removeBlock,
    comments,
    addComment,
    resolveComment,
  } = useEditorStore()

  const [commentInput, setCommentInput] = React.useState('')
  const [aiPrompt, setAiPrompt] = React.useState('')
  const [aiGenerating, setAiGenerating] = React.useState(false)

  const toolTabs = [
    { id: 'templates', label: 'Templates', icon: <EditorIcons.LayoutTemplate size={18} /> },
    { id: 'text', label: 'Text', icon: <EditorIcons.Type size={18} /> },
    { id: 'media', label: 'Media', icon: <EditorIcons.Image size={18} /> },
    { id: 'elements', label: 'Elements', icon: <EditorIcons.Shapes size={18} /> },
    { id: 'campus', label: 'Campus', icon: <EditorIcons.GraduationCap size={18} /> },
    { id: 'ai', label: 'AI Studio', icon: <EditorIcons.Sparkles size={18} /> },
    { id: 'layers', label: 'Layers', icon: <EditorIcons.Layers size={18} /> },
    { id: 'comments', label: 'Comments', icon: <EditorIcons.MessageSquare size={18} /> },
  ]

  const handleInsert = (type: BlockType, initialData?: any) => {
    const newBlock = addBlock(type, selectedBlockId || undefined, initialData)
    if (['image', 'video', 'embed', 'table', 'gallery', 'divider'].includes(type)) {
      const nextPara = addBlock('paragraph', newBlock.id, { content: '' })
      setSelectedBlockId(nextPara.id)
    }
  }

  const handleAiAction = (action: string) => {
    setAiGenerating(true)
    setTimeout(() => {
      setAiGenerating(false)
      if (action === 'announcement') {
        addBlock('announcement', selectedBlockId || undefined, {
          metadata: {
            title: 'Lumina Campus AI Advisory: Semester Final Guidelines',
          },
          content:
            'Please review updated proctoring procedures, submission portals, and academic integrity policies before Friday.',
        })
      } else if (action === 'summary') {
        addBlock('callout', selectedBlockId || undefined, {
          content:
            'Executive Summary: The proposed research protocol establishes zero-knowledge proof verification across 12 distributed campus nodes with sub-50ms latency.',
          styles: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' },
        })
      } else {
        addBlock('paragraph', selectedBlockId || undefined, {
          content: `AI Draft (${action}): Academic integrity and cross-campus collaboration are paramount to technical innovation.`,
        })
      }
    }, 600)
  }

  return (
    <aside className="lumina-left-sidebar-wrapper">
      {/* Icon Rail */}
      <nav className="lumina-tool-rail">
        {toolTabs.map((tab) => {
          const isActive = activeLeftTool === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              className={`tool-rail-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveLeftTool(activeLeftTool === tab.id ? null : tab.id)}
              title={tab.label}
            >
              <div className="tool-rail-icon">{tab.icon}</div>
              <span className="tool-rail-label">{tab.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Slide-out Contextual Panel */}
      {activeLeftTool && (
        <div className="lumina-tool-panel">
          <div className="tool-panel-header">
            <h3 className="tool-panel-title">
              {toolTabs.find((t) => t.id === activeLeftTool)?.label}
            </h3>
            <button
              type="button"
              className="tool-panel-close-btn"
              onClick={() => setActiveLeftTool(null)}
              title="Close panel"
            >
              <EditorIcons.X size={15} />
            </button>
          </div>

          <div key={activeLeftTool} className="tool-panel-content">
            {/* 1. Templates Panel */}
            {activeLeftTool === 'templates' && (
              <div className="templates-panel-list">
                <p className="panel-hint-text">
                  Choose an academic or campus template to jumpstart your creation:
                </p>
                {TEMPLATES_DATA.map((t) => (
                  <div key={t.id} className="template-card-item">
                    <img src={t.thumbnailUrl} alt={t.title} className="template-card-thumb" />
                    <div className="template-card-info">
                      <span className="template-category-pill">{t.category}</span>
                      <h4 className="template-card-name">{t.title}</h4>
                      <p className="template-card-desc">{t.description}</p>
                      <button
                        type="button"
                        className="template-apply-btn"
                        onClick={() => {
                          if (confirm(`Load template "${t.title}"? Current document content will be replaced.`)) {
                            loadTemplate(t.id)
                          }
                        }}
                      >
                        Apply Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 2. Text Tools Panel */}
            {activeLeftTool === 'text' && (
              <div className="text-tools-list">
                <button
                  type="button"
                  className="quick-text-insert-btn is-h1"
                  onClick={() => handleInsert('heading-1')}
                >
                  <span className="sample-h1">Heading 1</span>
                  <span className="desc">Main section title</span>
                </button>
                <button
                  type="button"
                  className="quick-text-insert-btn is-h2"
                  onClick={() => handleInsert('heading-2')}
                >
                  <span className="sample-h2">Heading 2</span>
                  <span className="desc">Subsection title</span>
                </button>
                <button
                  type="button"
                  className="quick-text-insert-btn is-h3"
                  onClick={() => handleInsert('heading-3')}
                >
                  <span className="sample-h3">Heading 3</span>
                  <span className="desc">Minor section header</span>
                </button>
                <button
                  type="button"
                  className="quick-text-insert-btn"
                  onClick={() => handleInsert('paragraph')}
                >
                  <span>Paragraph</span>
                  <span className="desc">Standard body copy</span>
                </button>
                <button
                  type="button"
                  className="quick-text-insert-btn"
                  onClick={() => handleInsert('quote')}
                >
                  <span>Blockquote</span>
                  <span className="desc">Formatted quote block</span>
                </button>
                <button
                  type="button"
                  className="quick-text-insert-btn"
                  onClick={() => handleInsert('callout')}
                >
                  <span>Callout Note</span>
                  <span className="desc">Colored alert with icon</span>
                </button>
                <button
                  type="button"
                  className="quick-text-insert-btn"
                  onClick={() => handleInsert('checklist')}
                >
                  <span>Checklist Task</span>
                  <span className="desc">Interactive to-do item</span>
                </button>
                <button
                  type="button"
                  className="quick-text-insert-btn"
                  onClick={() => handleInsert('code')}
                >
                  <span>Code Snippet</span>
                  <span className="desc">Preformatted code block</span>
                </button>
              </div>
            )}

            {/* 3. Media Tools Panel */}
            {activeLeftTool === 'media' && (
              <div className="media-tools-list">
                <button
                  type="button"
                  className="media-insert-card"
                  onClick={() => handleInsert('image')}
                >
                  <EditorIcons.Image size={24} />
                  <div>
                    <h4>Photo / Image</h4>
                    <p>High-resolution student photos & artwork</p>
                  </div>
                </button>
                <button
                  type="button"
                  className="media-insert-card"
                  onClick={() => handleInsert('unsplash')}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z" />
                  </svg>
                  <div>
                    <h4>Unsplash Photos</h4>
                    <p>Search millions of royalty-free photos</p>
                  </div>
                </button>
                <button
                  type="button"
                  className="media-insert-card"
                  onClick={() => handleInsert('video')}
                >
                  <EditorIcons.Video size={24} />
                  <div>
                    <h4>Video Player</h4>
                    <p>YouTube, Vimeo, or MP4 campus streams</p>
                  </div>
                </button>
                <button
                  type="button"
                  className="media-insert-card"
                  onClick={() => handleInsert('gallery')}
                >
                  <EditorIcons.Grid size={24} />
                  <div>
                    <h4>Photo Gallery</h4>
                    <p>Multi-image collegiate photo grid</p>
                  </div>
                </button>

                <button
                  type="button"
                  className="media-insert-card"
                  onClick={() => handleInsert('table')}
                >
                  <EditorIcons.Table size={24} />
                  <div>
                    <h4>Spreadsheet Table</h4>
                    <p>Organize grades, data, or schedules</p>
                  </div>
                </button>
              </div>
            )}

            {/* 4. Canva Elements Panel */}
            {activeLeftTool === 'elements' && (
              <div className="elements-panel-list">
                <div className="element-category">
                  <h4>Shapes & Containers</h4>
                  <div className="shapes-grid">
                    <button
                      type="button"
                      className="shape-picker-btn is-rect"
                      onClick={() => handleInsert('shape', { metadata: { shapeType: 'rectangle' } })}
                      title="Rectangle"
                    >
                      <div className="shape-preview is-rect" />
                      <span>Box</span>
                    </button>
                    <button
                      type="button"
                      className="shape-picker-btn is-pill"
                      onClick={() => handleInsert('shape', { metadata: { shapeType: 'pill' } })}
                      title="Pill Container"
                    >
                      <div className="shape-preview is-pill" />
                      <span>Pill</span>
                    </button>
                    <button
                      type="button"
                      className="shape-picker-btn is-circle"
                      onClick={() => handleInsert('shape', { metadata: { shapeType: 'circle' } })}
                      title="Circle"
                    >
                      <div className="shape-preview is-circle" />
                      <span>Circle</span>
                    </button>
                  </div>
                </div>

                <div className="element-category">
                  <h4>Interactive CTAs</h4>
                  <button
                    type="button"
                    className="element-insert-item-btn"
                    onClick={() => handleInsert('button')}
                  >
                    <span>Action Button</span>
                    <span className="badge">CTA</span>
                  </button>
                  <button
                    type="button"
                    className="element-insert-item-btn"
                    onClick={() => handleInsert('badge')}
                  >
                    <span>Campus Pill Badge</span>
                    <span className="badge">Tag</span>
                  </button>
                  <button
                    type="button"
                    className="element-insert-item-btn"
                    onClick={() => handleInsert('divider')}
                  >
                    <span>Horizontal Divider</span>
                    <span className="badge">Line</span>
                  </button>
                </div>
              </div>
            )}

            {/* 5. Lumina Campus Ecosystem Blocks */}
            {activeLeftTool === 'campus' && (
              <div className="campus-tools-list">
                <button
                  type="button"
                  className="campus-insert-btn"
                  onClick={() => handleInsert('campus-event')}
                >
                  <EditorIcons.Calendar size={18} />
                  <div>
                    <h4>Campus Event Card</h4>
                    <p>Title, date, time, location & registration button</p>
                  </div>
                </button>
                <button
                  type="button"
                  className="campus-insert-btn"
                  onClick={() => handleInsert('internship')}
                >
                  <EditorIcons.Briefcase size={18} />
                  <div>
                    <h4>Internship Opportunity Card</h4>
                    <p>Company, stipend, deadline & apply button</p>
                  </div>
                </button>
                <button
                  type="button"
                  className="campus-insert-btn"
                  onClick={() => handleInsert('club-card')}
                >
                  <EditorIcons.GraduationCap size={18} />
                  <div>
                    <h4>Student Club Card</h4>
                    <p>Organization showcase with member count</p>
                  </div>
                </button>
                <button
                  type="button"
                  className="campus-insert-btn"
                  onClick={() => handleInsert('profile-card')}
                >
                  <EditorIcons.Users size={18} />
                  <div>
                    <h4>Student Profile Spotlight</h4>
                    <p>Avatar, department, skills & connect button</p>
                  </div>
                </button>
                <button
                  type="button"
                  className="campus-insert-btn"
                  onClick={() => handleInsert('announcement')}
                >
                  <EditorIcons.Megaphone size={18} />
                  <div>
                    <h4>Official Announcement Banner</h4>
                    <p>High-priority academic alert with badge</p>
                  </div>
                </button>
                <button
                  type="button"
                  className="campus-insert-btn"
                  onClick={() => handleInsert('achievement')}
                >
                  <EditorIcons.Award size={18} />
                  <div>
                    <h4>Student Achievement Card</h4>
                    <p>Honors, awards, grants, and recognitions</p>
                  </div>
                </button>
              </div>
            )}

            {/* 6. AI Writing Assistant Panel */}
            {activeLeftTool === 'ai' && (
              <div className="ai-tools-panel">
                <p className="panel-hint-text">
                  Accelerate your writing with Lumina's academic and creative AI assistant:
                </p>

                <div className="ai-actions-grid">
                  <button
                    type="button"
                    className="ai-action-btn"
                    onClick={() => handleAiAction('improve')}
                    disabled={aiGenerating}
                  >
                    <span>✨ Improve Writing</span>
                  </button>
                  <button
                    type="button"
                    className="ai-action-btn"
                    onClick={() => handleAiAction('grammar')}
                    disabled={aiGenerating}
                  >
                    <span>🔍 Fix Grammar & Tone</span>
                  </button>
                  <button
                    type="button"
                    className="ai-action-btn"
                    onClick={() => handleAiAction('summary')}
                    disabled={aiGenerating}
                  >
                    <span>📋 Generate Summary</span>
                  </button>
                  <button
                    type="button"
                    className="ai-action-btn"
                    onClick={() => handleAiAction('announcement')}
                    disabled={aiGenerating}
                  >
                    <span>📢 Create Announcement</span>
                  </button>
                </div>

                <div className="ai-custom-prompt-box">
                  <label>Custom Academic Prompt</label>
                  <textarea
                    rows={3}
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="E.g., Write a 3-paragraph summary of quantum computing foundations..."
                    className="ai-prompt-textarea"
                  />
                  <button
                    type="button"
                    className="ai-generate-btn"
                    onClick={() => handleAiAction('custom')}
                    disabled={aiGenerating || !aiPrompt.trim()}
                  >
                    {aiGenerating ? 'Generating with AI...' : 'Generate with Lumina AI'}
                  </button>
                </div>
              </div>
            )}

            {/* 7. Layers Tree Panel */}
            {activeLeftTool === 'layers' && (
              <div className="layers-panel-list">
                <p className="panel-hint-text">
                  Document hierarchy ({document.blocks.length} blocks):
                </p>
                {document.blocks.map((block) => {
                  const isSelected = selectedBlockId === block.id
                  return (
                    <div
                      key={block.id}
                      className={`layer-tree-item ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setSelectedBlockId(block.id)}
                    >
                      <span className="layer-type-tag">{block.type}</span>
                      <span className="layer-label-preview">
                        {block.content?.slice(0, 30) || block.metadata?.title || block.type}
                      </span>
                      <button
                        type="button"
                        className="layer-delete-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeBlock(block.id)
                        }}
                        title="Delete block"
                      >
                        ✕
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            {/* 8. Comments Panel */}
            {activeLeftTool === 'comments' && (
              <div className="comments-panel-view">
                <div className="comment-create-box">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Add a comment or feedback..."
                    className="comment-input-field"
                  />
                  <button
                    type="button"
                    className="comment-submit-btn"
                    onClick={() => {
                      if (commentInput.trim()) {
                        addComment(commentInput.trim(), selectedBlockId || undefined)
                        setCommentInput('')
                      }
                    }}
                  >
                    Post
                  </button>
                </div>

                <div className="comments-thread-list">
                  {comments.length === 0 ? (
                    <div className="comments-empty-hint">No comments yet. Collaborate with team!</div>
                  ) : (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`comment-thread-item ${comment.resolved ? 'is-resolved' : ''}`}
                      >
                        <div className="comment-author-row">
                          <span className="comment-author-name">{comment.author.name}</span>
                          <span className="comment-timestamp">{comment.createdAt}</span>
                        </div>
                        <p className="comment-body-text">{comment.text}</p>
                        <button
                          type="button"
                          className="comment-resolve-btn"
                          onClick={() => resolveComment(comment.id)}
                        >
                          {comment.resolved ? '✓ Resolved' : 'Mark as resolved'}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  )
}
