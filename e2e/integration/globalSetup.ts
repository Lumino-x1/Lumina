export default async function globalSetup() {
  if (!process.env.TEST_DATABASE_URL) {
    throw new Error('TEST_DATABASE_URL is required to run integration tests.')
  }
}
