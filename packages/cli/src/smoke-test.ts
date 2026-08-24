import process from "node:process";

const targetUrl = process.argv[2] || process.env.TARGET_URL || 'http://localhost:3000'

interface ProbeResult {
  name: string
  url: string
  success: boolean
  status?: number
  durationMs: number
  detail?: string
}

async function runProbe(
  name: string,
  path: string,
  validator: (res: Response, body: any) => boolean
): Promise<ProbeResult> {
  const url = `${targetUrl}${path}`
  const startTime = Date.now()
  try {
    const res = await fetch(url)
    const durationMs = Date.now() - startTime
    let body: any = null
    const contentType = res.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      body = await res.json()
    } else {
      body = await res.text()
    }

    const isValid = res.ok && validator(res, body)
    return {
      name,
      url,
      success: isValid,
      status: res.status,
      durationMs,
      detail: isValid ? 'PASSED' : `Validation failed: status=${res.status}`,
    }
  } catch (err) {
    return {
      name,
      url,
      success: false,
      durationMs: Date.now() - startTime,
      detail: `Connection error: ${err instanceof Error ? err.message : String(err)}`,
    }
  }
}

async function main() {
  console.log(`\n🚀 Executing Post-Deployment Automated Smoke Tests against: ${targetUrl}\n`)

  const probes: ProbeResult[] = []

  // Probe 1: Liveness /health
  probes.push(await runProbe('Liveness Probe', '/health', (res, body) => body?.status === 'ok'))

  // Probe 2: Readiness /ready
  probes.push(
    await runProbe(
      'Readiness Probe',
      '/ready',
      (res, body) =>
        body?.status === 'ready' && body?.checks?.database === 'ok' && body?.checks?.redis === 'ok'
    )
  )

  // Probe 3: General API Sanity /ok
  probes.push(await runProbe('API Sanity Check', '/ok', (res, body) => body?.message === 'OK'))

  // Probe 4: Telemetry Metrics /metrics
  probes.push(
    await runProbe(
      'Prometheus Telemetry Probe',
      '/metrics',
      (res, body) => typeof body === 'string' && body.includes('lumina_http_requests_total')
    )
  )

  // Probe 5: Core Domain Route Probe
  probes.push(
    await runProbe('Leaderboard Domain Probe', '/api/leaderboard', (res) => res.status < 500)
  )

  let failedCount = 0
  console.log('--------------------------------------------------------------------------------')
  for (const probe of probes) {
    const statusStr = probe.success ? '✅ PASS' : '❌ FAIL'
    console.log(
      `${statusStr} | ${probe.name.padEnd(25)} | HTTP ${probe.status || 'ERR'} | ${probe.durationMs}ms | ${probe.detail}`
    )
    if (!probe.success) failedCount++
  }
  console.log('--------------------------------------------------------------------------------\n')

  if (failedCount > 0) {
    console.error(
      `💥 SMOKE TESTS FAILED: ${failedCount} of ${probes.length} probes failed. Aborting deployment!`
    )
    process.exit(1)
  }

  console.log(
    `✨ ALL SMOKE TESTS PASSED (${probes.length}/${probes.length} probes successful). Deployment verified!`
  )
  process.exit(0)
}

main().catch((err) => {
  console.error('Fatal error during smoke test execution:', err)
  process.exit(1)
})
