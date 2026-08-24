const IMAGE_MIMES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp'])
const VIDEO_MIMES = new Set(['video/mp4', 'video/webm', 'video/quicktime'])

export function extensionForMime(mimeType: string): string {
  switch (mimeType) {
    case 'image/jpeg':
    case 'image/jpg':
      return 'jpg'
    case 'image/png':
      return 'png'
    case 'image/webp':
      return 'webp'
    case 'video/mp4':
      return 'mp4'
    case 'video/webm':
      return 'webm'
    case 'video/quicktime':
      return 'mov'
    default:
      return 'bin'
  }
}

export function detectMediaKind(buffer: Buffer): 'image' | 'video' | null {
  if (buffer.length < 12) {
    return null
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image'
  }
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return 'image'
  }
  if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
    return 'image'
  }
  if (buffer.toString('ascii', 4, 8) === 'ftyp') {
    return 'video'
  }
  if (buffer[0] === 0x1a && buffer[1] === 0x45 && buffer[2] === 0xdf && buffer[3] === 0xa3) {
    return 'video'
  }
  return null
}

export function assertDeclaredMimeMatchesContent(declared: string, buffer: Buffer) {
  const kind = detectMediaKind(buffer)
  const declaredImage = IMAGE_MIMES.has(declared)
  const declaredVideo = VIDEO_MIMES.has(declared)

  if (declaredImage && kind === 'image') {
    return
  }
  if (declaredVideo && kind === 'video') {
    return
  }
  throw new Error('FILE_CONTENT_MISMATCH')
}
