import { useState, useRef, useCallback, useEffect } from 'react'
import {
  uploadMediaFlow,
  validateImageFile,
  type UploadedMediaItem,
  type UploadMediaFlowOptions,
} from '../api/mediaApi'

export interface UseMediaUploadReturn {
  isUploading: boolean
  progress: number
  error: string | null
  uploadImage: (
    file: File,
    options?: Omit<UploadMediaFlowOptions, 'onProgress' | 'signal'>
  ) => Promise<UploadedMediaItem | null>
  clearError: () => void
  abortUpload: () => void
}

/**
 * Reusable React Hook for managing client-side image uploads directly to S3
 * Handles progress tracking, client validation, cancellation, and concurrency locks.
 */
export function useMediaUpload(): UseMediaUploadReturn {
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  const abortControllerRef = useRef<AbortController | null>(null)
  const isUploadingRef = useRef<boolean>(false)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const abortUpload = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    setIsUploading(false)
    isUploadingRef.current = false
    setProgress(0)
    setError('Upload cancelled.')
  }, [])

  const uploadImage = useCallback(
    async (
      file: File,
      options?: Omit<UploadMediaFlowOptions, 'onProgress' | 'signal'>
    ): Promise<UploadedMediaItem | null> => {
      // Prevent duplicate concurrent uploads
      if (isUploadingRef.current) {
        setError('An image upload is already in progress. Please wait.')
        return null
      }

      // 1. Client-side Validation Check (JPEG, PNG, WebP <= 5 MB)
      const validation = validateImageFile(file)
      if (!validation.valid) {
        setError(validation.error || 'Invalid image file.')
        return null
      }

      // Initialize upload state
      isUploadingRef.current = true
      setIsUploading(true)
      setProgress(0)
      setError(null)

      const abortController = new AbortController()
      abortControllerRef.current = abortController

      try {
        const result = await uploadMediaFlow(file, {
          order: options?.order,
          signal: abortController.signal,
          onProgress: (pct) => {
            setProgress(pct)
          },
        })

        setProgress(100)
        return result
      } catch (err: any) {
        if (err?.name === 'AbortError' || err?.message?.includes('aborted')) {
          setError('Upload was cancelled.')
        } else {
          const errorMsg =
            err instanceof Error ? err.message : 'Upload failed. Please try again.'
          setError(errorMsg)
        }
        return null
      } finally {
        isUploadingRef.current = false
        setIsUploading(false)
        abortControllerRef.current = null
      }
    },
    []
  )

  return {
    isUploading,
    progress,
    error,
    uploadImage,
    clearError,
    abortUpload,
  }
}
