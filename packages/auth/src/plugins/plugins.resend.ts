


import '@lumina/env';



import { Resend } from 'resend';





/**
 * Resend accepts an API key at construction time. Keep startup resilient in
 * local and CI environments where email delivery is not exercised.
 */
export const resend = new Resend(process.env.RESEND_API_KEY || 're_64Y346au_5FKiYa4HCBQFZUzokhexMyEF')