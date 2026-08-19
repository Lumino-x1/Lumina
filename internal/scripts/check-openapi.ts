import fs from 'node:fs'
import path from 'node:path'
import YAML from 'yaml'

const openapiPath = path.resolve(process.cwd(), 'docs/api/openapi.yaml')

interface OpenApiDoc {
  openapi?: string
  info?: {
    title?: string
    version?: string
  }
  paths?: Record<string, any>
}

function checkOpenApi() {
  console.log(`\n📋 Checking OpenAPI Specification Contract: ${openapiPath}\n`)

  if (!fs.existsSync(openapiPath)) {
    console.error(`💥 ERROR: OpenAPI specification file missing at ${openapiPath}`)
    process.exit(1)
  }

  let fileContent = ''
  try {
    fileContent = fs.readFileSync(openapiPath, 'utf8')
  } catch (err) {
    console.error(`💥 ERROR: Unable to read OpenAPI file: ${err}`)
    process.exit(1)
  }

  let doc: OpenApiDoc
  try {
    doc = YAML.parse(fileContent) as OpenApiDoc
  } catch (err) {
    console.error(`💥 ERROR: Invalid YAML formatting in openapi.yaml: ${err}`)
    process.exit(1)
  }

  if (!doc || typeof doc !== 'object') {
    console.error('💥 ERROR: openapi.yaml parsed to an empty or non-object payload')
    process.exit(1)
  }

  // 1. OpenAPI 3.x Version Check
  if (!doc.openapi || !doc.openapi.startsWith('3.')) {
    console.error(
      `💥 ERROR: Invalid or missing 'openapi' version: expected 3.x, found '${doc.openapi}'`
    )
    process.exit(1)
  }
  console.log(`✅ Valid OpenAPI version: ${doc.openapi}`)

  // 2. Info Block Check
  if (!doc.info || !doc.info.title || !doc.info.version) {
    console.error("💥 ERROR: Missing required 'info.title' or 'info.version' in openapi.yaml")
    process.exit(1)
  }
  console.log(`✅ Spec metadata verified: ${doc.info.title} (v${doc.info.version})`)

  // 3. Paths Object Check
  if (!doc.paths || typeof doc.paths !== 'object' || Object.keys(doc.paths).length === 0) {
    console.error("💥 ERROR: Missing or empty 'paths' section in openapi.yaml")
    process.exit(1)
  }

  // 4. Expected Route Path Inventory Coverage Smoke Check across all API domains
  const expectedRoutes = [
    '/ok',
    '/health',
    '/ready',
    '/metrics',
    '/api/profile/me',
    '/api/profile/{username}',
    '/api/friends',
    '/api/friends/request/{userId}',
    '/api/friends/request/{requestId}/accept',
    '/api/friends/request/{requestId}/reject',
    '/api/friends/request/{requestId}',
    '/api/friends/{friendId}',
    '/api/friends/mutual/{userId}',
    '/api/friends/requests/incoming',
    '/api/friends/requests/outgoing',
    '/api/posts',
    '/api/posts/{id}/like',
    '/api/posts/{id}/likes/count',
    '/api/posts/{id}/save',
    '/api/posts/saved',
    '/api/chat/token',
    '/api/chat/conversations',
    '/api/leaderboard',
    '/api/leaderboard/me/around',
    '/api/leaderboard/me',
    '/api/leaderboard/{userId}',
    '/api/leetcode/sync',
    '/api/video/token',
    '/api/video/calls',
    '/api/video/calls/history',
    '/api/video/calls/{callId}',
    '/api/video/calls/{callId}/join',
    '/api/video/calls/{callId}/respond',
    '/api/video/calls/{callId}/end',
    '/api/comments/posts/{postId}/comments',
    '/api/comments/{commentId}',
    '/api/comments/{commentId}/history',
    '/api/comments/{commentId}/reactions',
    '/api/comments/{commentId}/pin',
    '/api/comments/{commentId}/report',
  ]

  const declaredPaths = Object.keys(doc.paths)
  const missingRoutes: string[] = []

  for (const expectedRoute of expectedRoutes) {
    if (!declaredPaths.includes(expectedRoute)) {
      missingRoutes.push(expectedRoute)
    }
  }

  if (missingRoutes.length > 0) {
    console.error(
      `💥 ERROR: openapi.yaml is stale! Missing required route path documentation for: ${missingRoutes.join(', ')}`
    )
    process.exit(1)
  }

  console.log(
    `✅ Route path inventory coverage verified (${expectedRoutes.length}/${expectedRoutes.length} expected routes present)`
  )
  console.log(`\n✨ OpenAPI 3.x contract verification successful!\n`)
  process.exit(0)
}

checkOpenApi()
