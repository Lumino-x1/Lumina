import { randomUUID } from 'crypto'
import { createPresignedUploadUrl } from '@lumina/storage'
import { prisma } from '@lumina/db'


export const getPresignedUploadUrl = async (req : any , res : any) => {
  try {
    const { filename, contentType, size } = req.body;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

    if (
      typeof filename !== 'string' ||
      !filename ||
      !allowedTypes.includes(contentType) ||
      !Number.isInteger(size) ||
      size <= 0 ||
      size > 5 * 1024 * 1024
    ) {
      return res.status(400).json({
        message: 'Invalid image metadata',
      })
    }

    const extension = contentType.split('/')[1]
    const key = `posts/${randomUUID()}.${extension}`

    const { url: uploadUrl } = await createPresignedUploadUrl({
      key,
      mimeType: contentType,
      expiresIn: 300,
    })

    const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`

    return res.json({
      uploadUrl,
      key,
      publicUrl,
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Failed to generate upload URL',
    })
  }
}


