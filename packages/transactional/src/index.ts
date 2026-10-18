import nodemailer from 'nodemailer'

/**
 * Transactional notification delivery via Brevo SMTP.
 * Delivery is active when BREVO_SMTP_KEY (or SMTP_PASSWORD) is configured.
 */
export async function sendNotificationEmail(input: {
  to: string
  subject: string
  text: string
  html?: string
}) {
  const host = process.env.BREVO_SMTP_HOST || process.env.SMTP_HOST || 'smtp-relay.brevo.com'
  const port = Number(process.env.BREVO_SMTP_PORT || process.env.SMTP_PORT || 587)
  const user = process.env.BREVO_SMTP_USER || process.env.SMTP_USER || '980817001@smtp-brevo.com'
  const pass =
    process.env.BREVO_SMTP_KEY ||
    process.env.BREVO_SMTP_PASSWORD ||
    process.env.SMTP_PASSWORD ||
    process.env.BREVO_API_KEY ||
    ''
  const from =
    process.env.BREVO_FROM ||
    process.env.SMTP_FROM ||
    process.env.NOTIFICATION_FROM_EMAIL ||
    `Lumina <${user}>`

  if (!pass) return { delivered: false, skipped: true, reason: 'EMAIL_NOT_CONFIGURED' as const }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  const info = await transporter.sendMail({
    from,
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html,
  })

  return { delivered: true, messageId: info.messageId }
}
