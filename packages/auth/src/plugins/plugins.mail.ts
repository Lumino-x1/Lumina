import '@lumina/env'
import nodemailer from 'nodemailer'

export function getTransporter() {
  const host = process.env.BREVO_SMTP_HOST || process.env.SMTP_HOST || 'smtp-relay.brevo.com'
  const port = Number(process.env.BREVO_SMTP_PORT || process.env.SMTP_PORT || 587)
  const user = process.env.BREVO_SMTP_USER || process.env.SMTP_USER || '980817001@smtp-brevo.com'
  const pass =
    process.env.BREVO_SMTP_KEY ||
    process.env.BREVO_SMTP_PASSWORD ||
    process.env.SMTP_PASSWORD ||
    process.env.BREVO_API_KEY ||
    ''

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  })
}

export const transporter = getTransporter()

export interface SendMailOptions {
  from?: string
  to: string | string[]
  subject: string
  html?: string
  text?: string
}

export async function sendMail(options: SendMailOptions) {
  const from =
    options.from && !options.from.includes('resend.dev')
      ? options.from
      : process.env.BREVO_FROM ||
        process.env.SMTP_FROM ||
        'Lumina <sunilbe2006@gmail.com>'

  const t = getTransporter()

  console.info(`[Brevo Mail] Dispatching email to ${options.to} from ${from} | Subject: "${options.subject}"`)

  const result = await t.sendMail({
    from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  })

  console.info(`[Brevo Mail] Email successfully accepted by Brevo! MessageId: ${result.messageId} | Response: ${result.response}`)

  return { success: true, messageId: result.messageId, response: result.response }
}
