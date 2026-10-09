/**
 * Media Upload API & Utility Functions
 * Handles presigned S3 direct uploads and frontend media state preparation.
 * Note: Does NOT call /media/complete during editing since postId is generated only upon publish.
 */

export const ALLOWED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const
export type AllowedImageMimeType = (typeof ALLOWED_IMAGE_MIME_TYPES)[number]
export const MAX_IMAGE_FILE_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

export interface UploadUrlRequest {
  filename: string
  contentType: string
  size: number
}

export interface UploadUrlResponse {
  uploadUrl: string
  key: string
  publicUrl: string
}

export interface UploadedMediaItem {
  key: string
  url: string
  type: 'IMAGE'
  mimeType: string
  size: number
  width?: number
  height?: number
  order: number
}

export interface ImageValidationResult {
  valid: boolean
  error?: string
}

/**
 * Validates file type and size on the client before initiating upload
 */
export function validateImageFile(file: File): ImageValidationResult {
  if (!file) {
    return { valid: false, error: 'No file selected.' }
  }

  if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type as AllowedImageMimeType)) {
    return {
      valid: false,
      error: `Unsupported file format (${file.type || 'unknown'}). Please upload a JPEG, PNG, or WebP image.`,
    }
  }

  if (file.size > MAX_IMAGE_FILE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1)
    return {
      valid: false,
      error: `File is too large (${sizeMb} MB). Maximum allowed size is 5 MB.`,
    }
  }

  return { valid: true }
}

/**
 * Extracts natural image dimensions (width & height) from a local File
 */
export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
      URL.revokeObjectURL(objectUrl)
    }

    img.onerror = () => {
      resolve({ width: 1200, height: 800 })
      URL.revokeObjectURL(objectUrl)
    }

    img.src = objectUrl
  })
}

function getBaseApiUrl(): string {
  const envUrl = (import.meta.env.VITE_API_URL as string) || ''
  if (envUrl) {
    return envUrl.replace(/\/$/, '')
  }
  return 'http://localhost:3002'
}

/**
 * 1. Request presigned upload URL from backend
 */
export async function getPresignedUploadUrl(
  payload: UploadUrlRequest
): Promise<UploadUrlResponse> {
  const baseUrl = getBaseApiUrl()
  const endpoints = [
    `${baseUrl}/media/upload-url`,
    `${baseUrl}/api/media/upload-url`,
    '/media/upload-url',
    '/api/media/upload-url',
  ]

  let lastError: Error | null = null

  const origin =
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Origin: origin,
  }

  try {
    const token =
      localStorage.getItem('lumina_session_token') ||
      localStorage.getItem('better-auth.session_token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  } catch {
    // ignore
  }

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        const data = (await response.json()) as UploadUrlResponse
        if (data.uploadUrl && data.key) {
          return data
        }
      } else {
        const errBody = await response.json().catch(() => null)
        lastError = new Error(
          errBody?.message ||
            errBody?.error ||
            `Failed to get upload URL (status ${response.status})`
        )
      }
    } catch (err) {
      lastError = err instanceof Error ? err : new Error('Network error requesting upload URL')
    }
  }

  throw lastError || new Error('Failed to request presigned upload URL')
}

/**
 * 2. Upload file directly to S3 via PUT request with progress tracking
 */
export function uploadFileToS3(
  uploadUrl: string,
  file: File,
  contentType: string,
  onProgress?: (progressPercent: number) => void,
  signal?: AbortSignal
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    if (signal) {
      signal.addEventListener('abort', () => {
        xhr.abort()
        reject(new DOMException('Upload aborted by user', 'AbortError'))
      })
    }

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100)
        onProgress(Math.min(99, Math.max(0, percent)))
      }
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        if (onProgress) onProgress(100)
        resolve()
      } else {
        reject(
          new Error(
            `Direct S3 upload failed with status ${xhr.status}: ${xhr.statusText || 'Storage error'}`
          )
        )
      }
    }

    xhr.onerror = () => {
      reject(new Error('Network connection error during direct S3 storage upload.'))
    }

    xhr.ontimeout = () => {
      reject(new Error('Direct S3 upload timed out.'))
    }

    xhr.open('PUT', uploadUrl)
    xhr.setRequestHeader('Content-Type', contentType)
    xhr.send(file)
  })
}

export interface UploadMediaFlowOptions {
  order?: number
  onProgress?: (progressPercent: number) => void
  signal?: AbortSignal
}

/**
 * Orchestrates the full media upload workflow during post editing:
 * 1. Validate file (JPEG, PNG, WebP <= 5 MB)
 * 2. Get image dimensions
 * 3. Request presigned upload URL from /media/upload-url
 * 4. Direct browser-to-S3 PUT upload
 * 5. Returns UploadedMediaItem structure to store in frontend state
 */
export async function uploadMediaFlow(
  file: File,
  options?: UploadMediaFlowOptions
): Promise<UploadedMediaItem> {
  // Step 1: Client Validation
  const validation = validateImageFile(file)
  if (!validation.valid) {
    throw new Error(validation.error || 'Invalid image file.')
  }

  // Step 2: Extract Dimensions
  const dimensions = await getImageDimensions(file)

  // Step 3: Presigned URL Request
  const { uploadUrl, key, publicUrl } = await getPresignedUploadUrl({
    filename: file.name,
    contentType: file.type,
    size: file.size,
  })

  // Step 4: Direct Browser-to-S3 PUT Upload
  await uploadFileToS3(uploadUrl, file, file.type, options?.onProgress, options?.signal)

  const finalPublicUrl = publicUrl || uploadUrl.split('?')[0]

  // Step 5: Return structured media item for frontend state
  return {
    key,
    url: finalPublicUrl,
    type: 'IMAGE',
    mimeType: file.type,
    size: file.size,
    width: dimensions.width,
    height: dimensions.height,
    order: options?.order ?? 0,
  }
}
