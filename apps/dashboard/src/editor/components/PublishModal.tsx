import { useEditorStore } from '../state/editorStore'
import React, { useState, useRef, useEffect } from 'react'
import { searchLivePhotos, type UnsplashPhoto } from '../blocks/UnsplashSearchBlock'
import { uploadMediaFlow } from '../api/mediaApi'
import { serializePostForApi, createPostApi, sanitizeUrl, syncLiveDomToBlocks } from '../api/postApi'

function parseDataUrlToFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg'
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  const ext = mime.split('/')[1] || 'jpg'
  return new File([u8arr], `${filename}.${ext}`, { type: mime })
}

async function parseBlobUrlToFile(blobUrl: string, filename: string): Promise<File> {
  const res = await fetch(blobUrl)
  const blob = await res.blob()
  const mime = blob.type || 'image/jpeg'
  const ext = mime.split('/')[1] || 'jpg'
  return new File([blob], `${filename}.${ext}`, { type: mime })
}

function extractDefaultTitleAndSubtitle(doc: ReturnType<typeof useEditorStore.getState>['document']): {
  defaultTitle: string
  defaultSubtitle: string
} {
  const cleanText = (str?: string) =>
    (str || '')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim()

  let defaultTitle = cleanText(doc.title)
  let defaultSubtitle = cleanText(doc.subtitle)

  if (!defaultTitle) {
    // 1. Look for heading block first
    const headingBlock = doc.blocks.find(
      (b) =>
        (b.type === 'heading-1' || b.type === 'heading-2' || b.type === 'heading-3') &&
        cleanText(b.content).length > 0
    )
    if (headingBlock) {
      defaultTitle = cleanText(headingBlock.content).slice(0, 100)
    } else {
      // 2. Look for any non-empty text block
      const firstNonEmpty = doc.blocks.find((b) => cleanText(b.content).length > 0)
      if (firstNonEmpty) {
        defaultTitle = cleanText(firstNonEmpty.content).slice(0, 100)
      }
    }
  }

  if (!defaultSubtitle) {
    // Find first paragraph or text block that isn't the title
    const nonTitleBlock =
      doc.blocks.find((b) => {
        const txt = cleanText(b.content)
        return txt.length > 0 && txt !== defaultTitle && b.type === 'paragraph'
      }) ||
      doc.blocks.find((b) => {
        const txt = cleanText(b.content)
        return txt.length > 0 && txt !== defaultTitle
      })

    if (nonTitleBlock) {
      defaultSubtitle = cleanText(nonTitleBlock.content).slice(0, 140)
    }
  }

  return { defaultTitle, defaultSubtitle }
}

interface PublishModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export const PublishModal: React.FC<PublishModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { document, setDocumentTitle, setDocumentSubtitle, setDocumentMetadata } = useEditorStore()

  const initialValues = extractDefaultTitleAndSubtitle(document)
  const [title, setTitle] = useState(initialValues.defaultTitle)
  const [subtitle, setSubtitle] = useState(initialValues.defaultSubtitle)
  const [topics, setTopics] = useState<string[]>(document.metadata.tags || [])
  const [topicInput, setTopicInput] = useState('')
  const [isScheduling, setIsScheduling] = useState(false)
  const [scheduleDateTime, setScheduleDateTime] = useState('')
  const [isPublishing, setIsPublishing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [publishError, setPublishError] = useState<string | null>(null)

  // Cover / Preview Image state
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewImage, setPreviewImage] = useState('')
  const [coverLocalFile, setCoverLocalFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isCoverUploading, setIsCoverUploading] = useState(false)
  const [coverMediaItem, setCoverMediaItem] = useState<any>(null)

  // Unsplash search state
  const [isSearchingUnsplash, setIsSearchingUnsplash] = useState(false)
  const [unsplashQuery, setUnsplashQuery] = useState('')
  const [unsplashPhotos, setPhotos] = useState<UnsplashPhoto[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [unsplashPage, setPage] = useState(1)
  const [unsplashTotalPages, setTotalPages] = useState(1)

  // Sync title, subtitle, cover and topics whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      const extracted = extractDefaultTitleAndSubtitle(document)
      setTitle(extracted.defaultTitle)
      setSubtitle(extracted.defaultSubtitle)
      setTopics(document.metadata.tags || [])
      setPublishError(null)
      setIsSuccess(false)

      const firstImgBlock = document.blocks.find((b) => b.type === 'image' && b.metadata?.url)
      const initialCover = document.metadata.coverImage || firstImgBlock?.metadata?.url || ''
      setPreviewImage(initialCover)
      setCoverLocalFile(null)
      setCoverMediaItem(null)
      setIsSearchingUnsplash(false)
      setUnsplashQuery('')
      setPhotos([])
    }
  }, [isOpen, document])

  if (!isOpen) return null

  // Calculate read time
  const totalWords = document.blocks.reduce((acc, b) => {
    const text = b.content || ''
    return acc + text.trim().split(/\s+/).filter(Boolean).length
  }, 0)
  const readTime = Math.max(1, Math.ceil(totalWords / 200))

  const handleAddTopic = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const clean = topicInput.trim().replace(/^,+|,+$/g, '')
      if (clean && topics.length < 5 && !topics.includes(clean)) {
        setTopics([...topics, clean])
        setTopicInput('')
      }
    }
  }

  const handleRemoveTopic = (idxToRemove: number) => {
    setTopics(topics.filter((_, i) => i !== idxToRemove))
  }

  const handleSearchUnsplash = async (pageNum: number, customQuery?: string) => {
    const q = (customQuery !== undefined ? customQuery : unsplashQuery).trim()
    if (!q) return
    setIsSearching(true)
    try {
      const res = await searchLivePhotos(q, pageNum)
      setPhotos(res.photos)
      setTotalPages(res.totalPages)
      setPage(pageNum)
    } catch {
      setPhotos([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleSelectUnsplashPhoto = (photo: UnsplashPhoto) => {
    setPreviewImage(photo.url)
    setCoverLocalFile(null)
    setCoverMediaItem(null)
    setIsSearchingUnsplash(false)
  }

  const processCoverFile = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) return
    setIsCoverUploading(true)
    setPublishError(null)
    try {
      const result = await uploadMediaFlow(file, { order: 0 })
      setPreviewImage(result.url)
      setCoverMediaItem(result)
      setCoverLocalFile(null)
      setIsSearchingUnsplash(false)
    } catch (err) {
      setPublishError(err instanceof Error ? err.message : 'Cover image upload failed')
    } finally {
      setIsCoverUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      void processCoverFile(file)
    }
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      void processCoverFile(file)
    }
  }

  const handleRemoveCover = () => {
    setPreviewImage('')
    setCoverLocalFile(null)
    setCoverMediaItem(null)
    setIsSearchingUnsplash(false)
  }

  const publishPost = async (status: 'published' | 'scheduled') => {
    setIsPublishing(true)
    setPublishError(null)

    try {
      // 1. Process cover image: If local file or blob/data url, upload directly to S3 via presigned PUT
      let finalCoverImageUrl = sanitizeUrl(previewImage)
      let currentCoverMedia: any = coverMediaItem

      if (coverLocalFile) {
        const result = await uploadMediaFlow(coverLocalFile, { order: 0 })
        finalCoverImageUrl = result.url
        currentCoverMedia = result
      } else if (
        previewImage &&
        (previewImage.startsWith('data:') || previewImage.startsWith('blob:'))
      ) {
        let file: File
        if (previewImage.startsWith('data:')) {
          file = parseDataUrlToFile(previewImage, `cover_${Date.now()}`)
        } else {
          file = await parseBlobUrlToFile(previewImage, `cover_${Date.now()}`)
        }
        const result = await uploadMediaFlow(file, { order: 0 })
        finalCoverImageUrl = result.url
        currentCoverMedia = result
      }

      // 2. Resolve any un-uploaded local image blocks in the document
      const currentBlocks = syncLiveDomToBlocks(document.blocks)
      const resolvedBlocks = await Promise.all(
        currentBlocks.map(async (block, index) => {
          if (block.type === 'image' || block.type === 'video') {
            const rawUrl = block.metadata?.url || block.content || ''

            // If local unuploaded image, upload to S3 now
            if (rawUrl.startsWith('data:') || rawUrl.startsWith('blob:')) {
              let file: File
              if (rawUrl.startsWith('data:')) {
                file = parseDataUrlToFile(rawUrl, `block_${Date.now()}`)
              } else {
                file = await parseBlobUrlToFile(rawUrl, `block_${Date.now()}`)
              }
              const result = await uploadMediaFlow(file, { order: index + 1 })
              return {
                ...block,
                content: '',
                metadata: {
                  ...block.metadata,
                  mediaId: result.key,
                  key: result.key,
                  url: result.url,
                  type: result.type,
                  mimeType: result.mimeType,
                  size: result.size,
                  width: result.width,
                  height: result.height,
                  order: result.order,
                  isUploading: false,
                },
              }
            }
          }
          return block
        })
      )

      // 3. Serialize editor state into clean, validated API payload
      const payload = serializePostForApi({
        document: {
          ...document,
          blocks: resolvedBlocks,
        },
        title,
        subtitle,
        coverImage: finalCoverImageUrl,
        coverMediaItem: currentCoverMedia,
        topics,
        visibility: document.metadata.visibility,
      })

      // 4. Send clean JSON request to POST /api/posts
      await createPostApi(payload)

      setDocumentTitle(title)
      setDocumentSubtitle(subtitle)
      setDocumentMetadata({
        coverImage: finalCoverImageUrl || undefined,
        tags: topics,
        status,
        updatedAt: new Date().toISOString(),
      })
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
        if (onSuccess) {
          onSuccess()
        }
      }, 700)
    } catch (error) {
      setPublishError(error instanceof Error ? error.message : 'Unable to publish post.')
    } finally {
      setIsPublishing(false)
    }
  }

  const handlePublishNow = () => {
    void publishPost('published')
  }

  const handleScheduleSubmit = () => {
    if (!scheduleDateTime) return
    void publishPost('scheduled')
  }

  return (
    <div className="medium-publish-overlay">
      {/* Hidden file input for uploading local cover image */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Top Right Close Button */}
      <button
        type="button"
        className="medium-publish-close-btn"
        onClick={onClose}
        title="Close (Esc)"
        aria-label="Close publish view"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Main Two-Column Container */}
      <div className="medium-publish-container">
        {isSuccess ? (
          <div className="medium-publish-success-card">
            <div className="medium-publish-success-check">✓</div>
            <h2>Story {isScheduling ? 'Scheduled' : 'Published'} Successfully!</h2>
            <p>Your story is now live and accessible on Lumina.</p>
          </div>
        ) : (
          <>
            {/* Left Column: Story Preview */}
            <div className="medium-publish-left-col">
              <h3 className="medium-publish-col-title">Story preview</h3>

              {/* Image Preview Box with Unsplash and Local upload */}
              {isSearchingUnsplash ? (
                <div className="medium-publish-unsplash-panel">
                  <div className="medium-publish-unsplash-header">
                    <div className="medium-publish-unsplash-search-bar">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <input
                        type="text"
                        value={unsplashQuery}
                        onChange={(e) => setUnsplashQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleSearchUnsplash(1)
                          }
                        }}
                        placeholder="Search Unsplash photos..."
                        className="medium-publish-unsplash-input"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => handleSearchUnsplash(1)}
                        className="medium-publish-unsplash-search-btn"
                        disabled={isSearching}
                      >
                        {isSearching ? '...' : 'Search'}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsSearchingUnsplash(false)}
                      className="medium-publish-unsplash-close"
                      title="Close search"
                    >
                      ✕
                    </button>
                  </div>

                  {isSearching && (
                    <div className="medium-publish-unsplash-loading">
                      Searching photos for &quot;{unsplashQuery}&quot;...
                    </div>
                  )}

                  {!isSearching && unsplashPhotos.length > 0 && (
                    <div className="medium-publish-unsplash-grid">
                      {unsplashPhotos.map((photo) => (
                        <div
                          key={photo.id}
                          className="medium-publish-unsplash-item"
                          onClick={() => handleSelectUnsplashPhoto(photo)}
                          title={`Select photo by ${photo.author}`}
                        >
                          <img src={photo.thumbUrl || photo.url} alt={photo.alt} />
                          <span className="medium-publish-unsplash-author">{photo.author}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {!isSearching && unsplashPhotos.length === 0 && unsplashQuery.trim() !== '' && (
                    <div className="medium-publish-unsplash-empty">
                      No photos found. Try another search.
                    </div>
                  )}

                  {unsplashTotalPages > 1 && !isSearching && unsplashPhotos.length > 0 && (
                    <div className="medium-publish-unsplash-pagination">
                      <button
                        type="button"
                        disabled={unsplashPage <= 1}
                        onClick={() => handleSearchUnsplash(unsplashPage - 1)}
                        className="medium-publish-unsplash-page-btn"
                      >
                        Prev
                      </button>
                      <span>
                        Page {unsplashPage} of {unsplashTotalPages}
                      </span>
                      <button
                        type="button"
                        disabled={unsplashPage >= unsplashTotalPages}
                        onClick={() => handleSearchUnsplash(unsplashPage + 1)}
                        className="medium-publish-unsplash-page-btn"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className={`medium-publish-image-box ${isDragging ? 'is-dragging' : ''}`}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                >
                  {isCoverUploading ? (
                    <div className="medium-publish-image-empty">
                      <div className="lumina-upload-spinner" />
                      <p style={{ marginTop: '8px' }}>Uploading...</p>
                    </div>
                  ) : previewImage ? (
                    <div className="medium-publish-image-filled">
                      <img
                        src={previewImage}
                        alt="Story preview"
                        className="medium-publish-preview-img"
                      />
                      <div className="medium-publish-image-overlay">
                        <button
                          type="button"
                          className="medium-publish-img-action-btn"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Upload Local
                        </button>
                        <button
                          type="button"
                          className="medium-publish-img-action-btn"
                          onClick={() => {
                            setIsSearchingUnsplash(true)
                            if (unsplashPhotos.length === 0) {
                              handleSearchUnsplash(1, title || 'nature')
                            }
                          }}
                        >
                          Unsplash
                        </button>
                        <button
                          type="button"
                          className="medium-publish-img-action-btn is-danger"
                          onClick={handleRemoveCover}
                        >
                          ✕ Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="medium-publish-image-empty">
                      <p>
                        Include a high-quality image in your story to make it more inviting to
                        readers.
                      </p>
                      <div className="medium-publish-image-btn-row">
                        <button
                          type="button"
                          className="medium-publish-pick-btn"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          Upload local image
                        </button>
                        <button
                          type="button"
                          className="medium-publish-pick-btn"
                          onClick={() => {
                            setIsSearchingUnsplash(true)
                            handleSearchUnsplash(1, title || 'technology')
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          </svg>
                          Search Unsplash
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Read Time */}
              <div className="medium-publish-read-time">{readTime} min read</div>

              {/* Story Title */}
              <div className="medium-publish-field">
                <input
                  type="text"
                  value={title}
                  maxLength={100}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Write a preview title..."
                  className="medium-publish-title-input"
                />
                <div className="medium-publish-counter">{title.length}/100</div>
              </div>

              {/* Story Subtitle */}
              <div className="medium-publish-field">
                <input
                  type="text"
                  value={subtitle}
                  maxLength={140}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Write a preview subtitle..."
                  className="medium-publish-subtitle-input"
                />
                <div className="medium-publish-counter">{subtitle.length}/140</div>
              </div>

              {/* Notice Disclaimer */}
              <p className="medium-publish-disclaimer">
                <strong>Note:</strong> Changes here will affect how your story appears in public
                places like Lumina’s homepage and in subscribers’ inboxes — not the contents of the
                story itself.
              </p>
            </div>

            {/* Right Column: Publishing Controls */}
            <div className="medium-publish-right-col">
              {/* Topics Section */}
              <div className="medium-publish-section">
                <h4 className="medium-publish-section-heading">Topics</h4>
                <p className="medium-publish-section-sub">
                  Add up to five topics to help readers find your story.
                </p>

                <div className="medium-publish-topics-input-box">
                  {topics.map((t, idx) => (
                    <span
                      key={idx}
                      className="medium-publish-topic-pill"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => handleRemoveTopic(idx)}
                        className="medium-publish-topic-remove"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {topics.length < 5 && (
                    <input
                      type="text"
                      value={topicInput}
                      onChange={(e) => setTopicInput(e.target.value)}
                      onKeyDown={handleAddTopic}
                      placeholder={topics.length === 0 ? 'Add a topic...' : 'Add another topic...'}
                      className="medium-publish-topic-text-input"
                    />
                  )}
                </div>
              </div>

              <div className="medium-publish-divider" />

              {/* Learn More link */}
              <p className="medium-publish-learn-more">
                <span className="medium-publish-action-link">Learn more</span> about what happens to
                your post when you publish.
              </p>

              {/* Schedule Date/Time Picker (if expanded) */}
              {isScheduling && (
                <div className="medium-publish-schedule-box">
                  <label className="medium-publish-schedule-label">Pick release date & time:</label>
                  <input
                    type="datetime-local"
                    value={scheduleDateTime}
                    onChange={(e) => setScheduleDateTime(e.target.value)}
                    className="medium-publish-datetime-picker"
                  />
                </div>
              )}

              {publishError && (
                <div className="medium-publish-error-banner" role="alert">
                  <div className="medium-publish-error-icon">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <div className="medium-publish-error-body">
                    <span className="medium-publish-error-text">{publishError}</span>
                  </div>
                  <button
                    type="button"
                    className="medium-publish-error-dismiss"
                    onClick={() => setPublishError(null)}
                    title="Dismiss alert"
                    aria-label="Dismiss error"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* CTA Action Row */}
              <div className="medium-publish-actions-row">
                {isScheduling ? (
                  <>
                    <button
                      type="button"
                      disabled={!scheduleDateTime || isPublishing}
                      onClick={handleScheduleSubmit}
                      className="medium-publish-now-btn"
                    >
                      {isPublishing ? 'Scheduling...' : 'Confirm Schedule'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsScheduling(false)}
                      className="medium-publish-schedule-link"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      disabled={isPublishing}
                      onClick={handlePublishNow}
                      className="medium-publish-now-btn"
                    >
                      {isPublishing ? 'Publishing...' : 'Publish now'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsScheduling(true)}
                      className="medium-publish-schedule-link"
                    >
                      Schedule for later
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
