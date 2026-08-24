import { randomUUID } from 'crypto'
import { s3 } from './s3'
import { getBucketName } from './utils'
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export async function createPresignedUploadUrl(args: {
  key: string
  mimeType: string
  expiresIn?: number
}): Promise<{ url: string; key: string }> {
  const command = new PutObjectCommand({
    Bucket: getBucketName(),
    Key: args.key,
    ContentType: args.mimeType,
  })
  const url = await getSignedUrl(s3 as never, command as never, {
    expiresIn: args.expiresIn ?? 900,
  })
  return { url, key: args.key }
}

export async function createPresignedDownloadUrl(args: {
  key: string
  fileName?: string
  expiresIn?: number
}): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: getBucketName(),
    Key: args.key,
    ResponseContentDisposition: args.fileName
      ? `attachment; filename="${args.fileName.replace(/"/g, '')}"`
      : undefined,
  })
  return getSignedUrl(s3 as never, command as never, { expiresIn: args.expiresIn ?? 900 })
}

export function buildStudyGroupObjectKey(groupId: string, fileName: string): string {
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
  return `study-groups/${groupId}/${randomUUID()}-${safeName}`
}
