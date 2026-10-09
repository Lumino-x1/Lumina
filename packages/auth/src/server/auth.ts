import '@lumina/env'

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

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const stringValue = (value: unknown, fallback = '') =>
            typeof value === 'string' ? value : fallback
          const arrayValue = (value: unknown) =>
            Array.isArray(value) && value.every((item) => typeof item === 'string') ? value : []
          const numberValue = (value: unknown, fallback: number) =>
            typeof value === 'number' && Number.isFinite(value) ? value : fallback

          const firstName = stringValue(
            (user as any).firstName,
            user.name ? user.name.split(' ')[0] : 'Student'
          )
          const lastName = stringValue(
            (user as any).lastName,
            user.name ? user.name.split(' ').slice(1).join(' ') : 'User'
          )
          const email = user.email.trim().toLowerCase()
          const profilePicture = stringValue((user as any).profilePicture || (user as any).image)
          const college = stringValue((user as any).college)
          const department = stringValue((user as any).department)
          const year = numberValue((user as any).year, 1)
          const interests = arrayValue((user as any).interests || (user as any).technology)
          const skills = arrayValue((user as any).skills)
          const bio = stringValue((user as any).bio)
          const about = stringValue((user as any).about)
          const github = stringValue((user as any).github)
          const linkedin = stringValue((user as any).linkedin)
          const portfolio = stringValue((user as any).portfolio)
          const location = stringValue((user as any).location)

          let collegeId: string | null = null
          let departmentId: string | null = null

          if (college) {
            try {
              let collegeRecord = await prisma.college.findFirst({
                where: { name: { equals: college, mode: 'insensitive' } },
              })
              if (!collegeRecord) {
                const slug = college
                  .toLowerCase()
                  .replace(/[^a-z0-9]/g, '-')
                  .replace(/-+/g, '-')
                  .slice(0, 30)
                const domain = `${slug || 'campus'}-${Math.random().toString(36).slice(2, 7)}.lumina.edu`
                collegeRecord = await prisma.college.create({
                  data: { name: college, domain },
                })
              }
              collegeId = collegeRecord.id

              if (department) {
                let deptRecord = await prisma.department.findFirst({
                  where: {
                    collegeId: collegeRecord.id,
                    name: { equals: department, mode: 'insensitive' },
                  },
                })
                if (!deptRecord) {
                  deptRecord = await prisma.department.create({
                    data: { collegeId: collegeRecord.id, name: department },
                  })
                }
                departmentId = deptRecord.id
              }

              await prisma.user.update({
                where: { id: user.id },
                data: {
                  collegeId: collegeId ?? undefined,
                  departmentId: departmentId ?? undefined,
                },
              })
            } catch (err) {
              console.warn('Could not auto-link college in auth hook:', err)
            }
          }

          await prisma.profile.upsert({
            where: { userId: user.id },
            update: {},
            create: {
              userId: user.id,
              firstName,
              lastName,
              email,
              profilePicture: profilePicture || null,
              year,
              interests,
              skills,
              bio: bio || null,
              about: about || null,
              github: github || null,
              linkedin: linkedin || null,
              portfolio: portfolio || null,
              location: location || null,
            },
          })
        },
      },
    },
  },

  trustedOrigins: [process.env.CORS_ORIGIN!],

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,

    // async sendResetPassword({ user, url }) {
    //   await resend.emails.send({
    //     from: process.env.RESEND_FROM!,
    //     to: user.email,
    //     subject: 'Reset your password',
    //     html: `Click <a href="${url}">here</a> to reset your password.`,
    //   })
    // },
  },

  // emailVerification: {
  //   sendOnSignUp: true,

  //   async sendVerificationEmail({ user, url }) {
  //     await resend.emails.send({
  //       from: process.env.RESEND_FROM!,
  //       to: user.email,
  //       subject: 'Verify your email',
  //       html: `Click <a href="${url}">here</a> to verify your email.`,
  //     })
  //   },
  // },

  session: {
    // Keep the session/JWT valid for one month.
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
    fields: {
      ipAddress: 'ip',
    },
  },

  verification: {
    modelName: 'authVerification',
  },
})
