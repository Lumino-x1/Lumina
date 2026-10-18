import '@lumina/env'
import { resend } from '../plugins/plugins.resend'
import { prisma } from '@lumina/db'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { emailOTP } from 'better-auth/plugins'
import {
  renderVerificationOtpEmailHtml,
  renderVerificationOtpEmailText,
} from '../emails/verification-otp.email'

if (!process.env.BETTER_AUTH_SECRET?.trim()) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Missing required secret: BETTER_AUTH_SECRET')
  }
}

export async function generateUniqueUsername(firstName: string, lastName?: string): Promise<string> {
  const cleanFirst = (firstName || 'user').toLowerCase().replace(/[^a-z0-9]/g, '') || 'user'
  const cleanLast = lastName ? lastName.toLowerCase().replace(/[^a-z0-9]/g, '') : ''
  const base = `${cleanFirst}${cleanLast}`

  for (let attempt = 0; attempt < 20; attempt++) {
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    const candidate = `${base}${randomNum}`

    const existing = await prisma.user.findUnique({
      where: { username: candidate },
      select: { id: true },
    })
    if (!existing) {
      return candidate
    }
  }

  return `${base}${Math.floor(1000 + Math.random() * 9000)}${Date.now().toString().slice(-4)}`
}

// auth instance resposible for all the auth features
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,

  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  user: {
    additionalFields: {
      collegeId: {
        type: 'string',
        required: false,
        input: false,
      },
      username: {
        type: 'string',
        required: false,
        input: false,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user: any) => {
          let collegeId: string | undefined
          const email = (user.email || '').trim().toLowerCase()
          const emailDomain = email.split('@')[1]
          if (emailDomain) {
            try {
              const collegeEmailDomain = await prisma.collegeEmailDomain.findFirst({
                where: { domain: { equals: emailDomain, mode: 'insensitive' } },
                include: { college: { select: { id: true, name: true, isActive: true } } },
              })
              if (collegeEmailDomain?.college?.isActive) {
                collegeId = collegeEmailDomain.college.id
              } else {
                const directCollege = await prisma.college.findFirst({
                  where: { domain: { equals: emailDomain, mode: 'insensitive' } },
                })
                if (directCollege?.isActive) {
                  collegeId = directCollege.id
                }
              }

              if (!collegeId) {
                const domainParts = emailDomain.split('.')
                for (let i = 1; i < domainParts.length - 1; i++) {
                  const parentDomain = domainParts.slice(i).join('.')
                  const parentEmailDomain = await prisma.collegeEmailDomain.findFirst({
                    where: { domain: { equals: parentDomain, mode: 'insensitive' } },
                    include: { college: { select: { id: true, name: true, isActive: true } } },
                  })
                  if (parentEmailDomain?.college?.isActive) {
                    collegeId = parentEmailDomain.college.id
                    break
                  }
                  const parentCollege = await prisma.college.findFirst({
                    where: { domain: { equals: parentDomain, mode: 'insensitive' } },
                  })
                  if (parentCollege?.isActive) {
                    collegeId = parentCollege.id
                    break
                  }
                }
              }
            } catch (err) {
              console.warn('Could not auto-link college in before hook:', err)
            }
          }

          // Generate unique username: firstName + lastName? + randomnumber
          const stringVal = (value: unknown, fallback = '') =>
            typeof value === 'string' ? value.trim() : fallback

          const rawFirst = stringVal(
            (user as any).firstName,
            user.name ? user.name.trim().split(/\s+/)[0] : (email ? email.split('@')[0] : 'user')
          )
          const rawLast = stringVal(
            (user as any).lastName,
            user.name && user.name.trim().split(/\s+/).length > 1
              ? user.name.trim().split(/\s+/).slice(1).join('')
              : ''
          )

          let username = stringVal((user as any).username)
          if (!username) {
            username = await generateUniqueUsername(rawFirst, rawLast)
          } else {
            const clean = username.toLowerCase().replace(/[^a-z0-9_]/g, '')
            const existing = await prisma.user.findUnique({
              where: { username: clean },
              select: { id: true },
            })
            if (existing) {
              username = await generateUniqueUsername(rawFirst, rawLast)
            } else {
              username = clean
            }
          }

          return {
            data: {
              ...(collegeId ? { collegeId } : {}),
              username,
            },
          }
        },
        after: async (user: any) => {
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
                  data: { name: college, domain, slug },
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
          } else {
            const emailDomain = email.split('@')[1]
            if (emailDomain) {
              try {
                const collegeEmailDomain = await prisma.collegeEmailDomain.findFirst({
                  where: { domain: { equals: emailDomain, mode: 'insensitive' } },
                  include: { college: { select: { id: true, name: true, isActive: true } } },
                })
                if (collegeEmailDomain?.college?.isActive) {
                  collegeId = collegeEmailDomain.college.id
                } else {
                  const directCollege = await prisma.college.findFirst({
                    where: { domain: { equals: emailDomain, mode: 'insensitive' } },
                  })
                  if (directCollege?.isActive) {
                    collegeId = directCollege.id
                  }
                }
                if (collegeId) {
                  await prisma.user.update({
                    where: { id: user.id },
                    data: { collegeId },
                  })
                }
              } catch (err) {
                console.warn('Could not auto-link college from domain in auth hook:', err)
              }
            }
          }

          if (!(user as any).username) {
            try {
              const gen = await generateUniqueUsername(firstName, lastName)
              await prisma.user.update({
                where: { id: user.id },
                data: { username: gen },
              })
            } catch (err) {
              console.warn('Could not auto-generate username in auth hook:', err)
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

  trustedOrigins: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:3002',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3002',
    'https://untolerative-len-rumblingly.ngrok-free.dev',
    'https://*.ngrok-free.dev',
    'https://*.ngrok.app',
    'https://*.vercel.app',
    ...(process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(',').map((s) => s.trim())
      : []),
    ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS
      ? process.env.BETTER_AUTH_TRUSTED_ORIGINS.split(',').map((s) => s.trim())
      : []),
  ].filter(Boolean),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,

    async sendResetPassword({ user, url }: { user: any; url: string }) {
      const masked = user.email.replace(/^(.)(.*)(@.*)$/, (_: string, a: string, b: string, c: string) => `${a}***${c}`)
      console.info(`[Auth] Password reset email requested for ${masked}`)
      try {
        const fromAddress =
          process.env.BREVO_FROM ||
          process.env.SMTP_FROM ||
          process.env.RESEND_FROM ||
          'Lumina <980817001@smtp-brevo.com>'
        const result = await resend.emails.send({
          from: fromAddress,
          to: user.email,
          subject: 'Reset your password',
          html: `Click <a href="${url}">here</a> to reset your password.`,
        })
        if (result?.error) {
          console.warn(`[Auth] Mail delivery notice for ${masked}: ${result.error.message}`)
        }
      } catch (error) {
        console.warn(`[Auth] Mail send error for ${masked}:`, error)
      }
    },
  },

  emailVerification: {
    sendOnSignUp: true,
  },

  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 600, // 10 minutes (600 seconds)
      allowedAttempts: 5,
      storeOTP: 'hashed',
      resendStrategy: 'rotate',
      sendVerificationOnSignUp: true,
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        const masked = email.replace(/^(.)(.*)(@.*)$/, (_, a, b, c) => `${a}***${c}`)
        console.info(`[Auth] Dispatching ${type} OTP to ${masked}`)
        try {
          const fromAddress =
            process.env.BREVO_FROM ||
            process.env.SMTP_FROM ||
            process.env.RESEND_FROM ||
            'Lumina <980817001@smtp-brevo.com>'
          const subject =
            type === 'forget-password'
              ? 'Reset your Lumina password'
              : 'Verify your Lumina email address'
          const result = await resend.emails.send({
            from: fromAddress,
            to: email,
            subject,
            html: renderVerificationOtpEmailHtml(otp),
            text: renderVerificationOtpEmailText(otp),
          })
          if (result?.error) {
            console.warn(`[Auth] Mail delivery notice for ${masked}: ${result.error.message}`)
          }
        } catch (error) {
          console.warn(`[Auth] Mail send error for ${masked}:`, error)
        }
      },
    }),
  ],

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
