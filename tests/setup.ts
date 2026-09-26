import '@lumina/env'

import { installResendFetchMock } from './integration/helpers/auth'

process.env.TEST_DATABASE_URL ||=
  'postgresql://lumina_user:lumina_password@localhost:5432/lumina_dev'

process.env.BETTER_AUTH_SECRET ||= 'lumina-test-secret-key-lumina-test-secret-key'
process.env.CORS_ORIGIN ||= 'http://localhost:3000'
process.env.RESEND_API_KEY ||= 're_test_api_key'
process.env.RESEND_FROM ||= 'Lumina <no-reply@lumina.test>'
process.env.DATABASE_URL ||= process.env.TEST_DATABASE_URL

installResendFetchMock()
