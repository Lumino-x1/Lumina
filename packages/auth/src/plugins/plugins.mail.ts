import '@lumina/env'
import nodemailer from 'nodemailer'

const host = process.env.BREVO_SMTP_HOST || process.env.SMTP_HOST || 'smtp-relay.brevo.com'
const port = Number(process.env.BREVO_SMTP_PORT || process.env.SMTP_PORT || 587)
const user = process.env.BREVO_SMTP_USER || process.env.SMTP_USER || '980817001@smtp-brevo.com'
const pass =
  process.env.BREVO_SMTP_KEY ||
  process.env.BREVO_SMTP_PASSWORD ||
  process.env.SMTP_PASSWORD ||
  process.env.BREVO_API_KEY ||
  ''

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: {
    user,
    pass,
  },
})

export interface SendMailOptions {
  from?: string
  to: string | string[]
  subject: string
  html?: string
  text?: string
}

export async function sendMail(options: SendMailOptions) {
  const from =
    options.from ||
    process.env.BREVO_FROM ||
    process.env.SMTP_FROM ||
    process.env.RESEND_FROM ||
    'Lumina <sunilbe2006@9963543.brevosend.com>'

  if (!pass) {
    console.warn('[Brevo Mail] SMTP password/key not set (BREVO_SMTP_KEY / SMTP_PASSWORD). Email dispatch skipped.')
    return { skipped: true, reason: 'SMTP_PASSWORD_MISSING' }
  }

  const result = await transporter.sendMail({
    from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  })

  return { success: true, messageId: result.messageId }
}
