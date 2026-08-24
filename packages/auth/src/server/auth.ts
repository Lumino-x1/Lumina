import '@lumina/core/env'

import { existsSync } from 'node:fs'
import { resend } from '../plugins/plugins.resend'
import { prisma } from '@lumina/db'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'

if (!process.env.BETTER_AUTH_SECRET?.trim()) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Missing required secret: BETTER_AUTH_SECRET')
  }
}

// auth instance resposible for all the auth features

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,

  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  trustedOrigins: [process.env.CORS_ORIGIN!],

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,

    async sendResetPassword({ user, url }) {
      await resend.emails.send({
        from: process.env.RESEND_FROM!,
        to: user.email,
        subject: 'Reset your password',
        html: `Click <a href="${url}">here</a> to reset your password.`,
      })
    },
  },

  emailVerification: {
    sendOnSignUp: true,

    async sendVerificationEmail({ user, url }) {
      await resend.emails.send({
        from: process.env.RESEND_FROM!,
        to: user.email,
        subject: 'Verify your email',
        html: `Click <a href="${url}">here</a> to verify your email.`,
      })
    },
  },

  session: {
    fields: {
      ipAddress: 'ip',
    },
  },

  verification: {
    modelName: 'AuthVerification',
  },
})
