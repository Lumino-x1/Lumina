import '@lumina/env'
import { sendMail } from './plugins.mail'

/**
 * Brevo-backed compatibility layer providing the standard send interface.
 */
export const resend = {
  emails: {
    async send(payload: {
      from?: string
      to: string | string[]
      subject: string
      html?: string
      text?: string
    }) {
      try {
        const result = await sendMail(payload)
        return { data: result, error: null }
      } catch (err: any) {
        return { data: null, error: { message: err?.message || String(err) } }
      }
    },
  },
}