/** Transactional notification delivery via Resend HTTP API.
 * Delivery is real when RESEND_API_KEY and NOTIFICATION_FROM_EMAIL are configured.
 */
export async function sendNotificationEmail(input: { to: string; subject: string; text: string }) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.NOTIFICATION_FROM_EMAIL
  if (!apiKey || !from)
    return { delivered: false, skipped: true, reason: 'EMAIL_NOT_CONFIGURED' as const }
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [input.to], subject: input.subject, text: input.text }),
  })
  if (!response.ok) throw new Error(`EMAIL_DELIVERY_FAILED: ${await response.text()}`)
  return { delivered: true, ...(await response.json()) }
}
