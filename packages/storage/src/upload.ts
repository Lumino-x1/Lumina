import { randomUUID } from 'crypto'
import { createReadStream } from 'fs'
import { s3 } from './s3'
import { getBucketName, getRegion } from './utils'
import { PutObjectCommand } from '@aws-sdk/client-s3'

import type { UploadFileOptions } from '@lumina/core/contracts'
import type { Readable } from 'stream'

function safeObjectName(mimeType: string) {
  const ext =
    mimeType === 'image/jpeg' || mimeType === 'image/jpg'
      ? 'jpg'
      : mimeType === 'image/png'
        ? 'png'
        : mimeType === 'image/webp'
          ? 'webp'
          : mimeType === 'video/mp4'
            ? 'mp4'
            : mimeType === 'video/webm'
              ? 'webm'
              : mimeType === 'video/quicktime'
                ? 'mov'
                : 'bin'
  return `${randomUUID()}.${ext}`
}

export async function uploadFile({
  buffer,
  body,
  mimeType,
  folder,
  fileName,
}: UploadFileOptions & { body?: Readable; filePath?: string }): Promise<{
  url: string
  key: string
}> {
  const bucketName = getBucketName()
  const region = getRegion()
  const objectName = safeObjectName(mimeType)
  const key = `${folder}/${objectName}`
  void fileName

  const payload = body ?? buffer
  if (!payload) {
    throw new Error('Upload body is required')
  }

  await s3.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: payload,
      ContentType: mimeType,
    })
  )

  const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`

  return {
    url,
    key,
  }
}

export async function uploadFileFromPath(args: {
  filePath: string
  mimeType: string
  folder: string
}) {
  return uploadFile({
    mimeType: args.mimeType,
    folder: args.folder,
    body: createReadStream(args.filePath),
  })
}
