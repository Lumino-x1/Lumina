export default async function globalSetup() {
  process.env.TEST_DATABASE_URL ||=
    'postgresql://lumina_user:lumina_password@localhost:5432/lumina_dev'
}
