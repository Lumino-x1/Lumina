import fs from 'fs/promises'
import { randomUUID } from 'node:crypto'
import os from 'os'
import path from 'path'
import ffprobeInstaller from '@ffprobe-installer/ffprobe'
import ffmpeg from 'fluent-ffmpeg'
import { imageSize } from 'image-size'

ffmpeg.setFfprobePath(ffprobeInstaller.path)

export const MAX_VIDEO_DURATION_SECONDS = 60
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
export const MAX_VIDEO_SIZE_BYTES = 25 * 1024 * 1024

export const getImageDimensions = async (file: Express.Multer.File) => {
  const dimensions = imageSize(file.buffer)
  return {
    width: dimensions.width,
    height: dimensions.height,
  }
}

export async function getVideoMetadata(buffer: Buffer) {
  const tempFile = path.join(os.tmpdir(), `video-${randomUUID()}.mp4`)
  await fs.writeFile(tempFile, buffer)
  return new Promise<{
    width: number | null
    height: number | null
    duration: number | null
  }>((resolve, reject) => {
    ffmpeg.ffprobe(tempFile, async (err: any, metadata: any) => {
      await fs.unlink(tempFile).catch(() => {})
      if (err) return reject(err)
      const stream = metadata.streams.find((s: any) => s.codec_type === 'video')
      resolve({
        width: stream?.width ?? null,
        height: stream?.height ?? null,
        duration: metadata.format.duration ?? null,
      })
    })
  })
}

export function assertValidVideoDuration(duration: number | null): number {
  if (duration === null || Number.isNaN(duration)) {
    throw new Error('Could not determine video duration.')
  }

  if (duration > MAX_VIDEO_DURATION_SECONDS) {
    throw new Error(`Video must be ${MAX_VIDEO_DURATION_SECONDS} seconds or less.`)
  }

  return Math.round(duration)
}
