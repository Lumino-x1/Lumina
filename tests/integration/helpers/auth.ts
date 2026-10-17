import { createHash } from 'node:crypto'
import request from 'supertest'

import type { Express } from 'express'
import type { Response } from 'supertest'

export { clearDatabase } from './database'

const resendRequests: Array<{ url: string; body: unknown }> = []
const originalFetch = globalThis.fetch

export function installResendFetchMock() {
  //@ts-ignore
  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input.toString()

    if (url.startsWith('https://api.resend.com')) {
      let body: unknown = null

      if (init?.body) {
        const rawBody = typeof init.body === 'string' ? init.body : String(init.body)
        try {
          body = JSON.parse(rawBody)
        } catch {
          body = rawBody
        }
      }

      resendRequests.push({ url, body })

      return new Response(
        JSON.stringify({
          id: `email_${createHash('sha1').update(`${url}:${resendRequests.length}`).digest('hex').slice(0, 16)}`,
        }),
        {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        }
      )
    }

    return originalFetch(input, init)
  }
}

export function clearCapturedEmails() {
  resendRequests.length = 0
}

export function getCapturedEmails() {
  return [...resendRequests]
}

export const TEST_ORIGIN = process.env.CORS_ORIGIN ?? 'http://localhost:3000'
export const SESSION_COOKIE_NAME = 'better-auth.session_token'

export function createAgent(app: Express) {
  return request.agent(app)
}

export async function signUpWithEmail(
  app: Express,
  payload: {
    name: string
    email: string
    password: string
    image?: string
    callbackURL?: string
  }
) {
  return request(app).post('/api/auth/sign-up/email').set('Origin', TEST_ORIGIN).send(payload)
}

export async function signInWithEmail(
  app: Express,
  payload: {
    email: string
    password: string
    rememberMe?: boolean
    callbackURL?: string
  }
) {
  return request(app).post('/api/auth/sign-in/email').set('Origin', TEST_ORIGIN).send(payload)
}

export async function signOut(app: Express, cookie?: string) {
  const req = request(app).post('/api/auth/sign-out').set('Origin', TEST_ORIGIN)

  if (cookie) {
    req.set('Cookie', cookie)
  }

  return req.send()
}

export async function getSession(app: Express, cookie?: string) {
  const req = request(app).get('/api/auth/get-session').set('Origin', TEST_ORIGIN)

  if (cookie) {
    req.set('Cookie', cookie)
  }

  return req.send()
}

export function getSetCookieHeader(response: Response) {
  const header = response.headers['set-cookie']
  return Array.isArray(header) ? header : header ? [header] : []
}

export function getCookieValue(setCookieHeaders: string[], cookieName = SESSION_COOKIE_NAME) {
  const entry = setCookieHeaders.find((header) => header.startsWith(`${cookieName}=`))

  if (!entry) {
    return null
  }

  return entry.split(';')[0]?.slice(cookieName.length + 1) ?? null
}

export function buildCookieHeader(setCookieHeaders: string[], cookieName = SESSION_COOKIE_NAME) {
  const value = getCookieValue(setCookieHeaders, cookieName)

  return value ? `${cookieName}=${value}` : null
}

export async function verifyOtp(
  app: Express,
  payload: { email: string; otp: string }
) {
  return request(app).post('/api/auth/verify-otp').set('Origin', TEST_ORIGIN).send(payload)
}

export async function resendOtp(
  app: Express,
  payload: { email: string }
) {
  return request(app).post('/api/auth/resend-otp').set('Origin', TEST_ORIGIN).send(payload)
}

export async function createTestUserWithSession(
  overrides: { collegeId?: string; name?: string; email?: string; role?: string; emailVerified?: boolean } = {}
) {
  const { prisma } = await import('@db/client')
  const token = createHash('sha256')
    .update(`${Math.random()}:${Date.now()}`)
    .digest('hex')
    .slice(0, 8)
  const user = await prisma.user.create({
    data: {
      email: overrides.email ?? `user.${token}@lumina.test`,
      name: overrides.name ?? `Test User ${token}`,
      username: `user_${token}`,
      role: (overrides.role as any) ?? 'STUDENT',
      status: 'ACTIVE',
      emailVerified: overrides.emailVerified ?? true,
      collegeId: overrides.collegeId ?? null,
    },
  })

  await prisma.profile.create({
    data: {
      userId: user.id,
      firstName: (overrides.name ?? `Test User ${token}`).split(' ')[0] || 'Test',
      lastName: (overrides.name ?? `Test User ${token}`).split(' ').slice(1).join(' ') || 'User',
      email: user.email,
    },
  })

  const sessionToken = `test_session_${token}`
  await prisma.session.create({
    data: {
      id: `sess_${token}`,
      userId: user.id,
      token: sessionToken,
      expiresAt: new Date(Date.now() + 86400000),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  return {
    user,
    cookie: `${SESSION_COOKIE_NAME}=${sessionToken}`,
  }
}
