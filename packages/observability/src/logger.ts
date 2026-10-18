import { randomBytes, randomUUID } from 'node:crypto'
import { generateCorrelationContext, getCorrelationContext, runWithCorrelation } from './context.ts'
import { httpErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal } from './metrics.ts'

import type { NextFunction, Request, Response } from 'express'

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LogEntry {
  timestamp: string
  level: LogLevel
  service: string
  environment: string
  request_id?: string
  trace_id?: string
  message: string
  metadata?: Record<string, unknown>
}

export interface LoggerOptions {
  service?: string
  environment?: string
  redactKeys?: string[]
}

const SENSITIVE_KEYS = new Set([
  'password',
  'pass',
  'token',
  'accesstoken',
  'access_token',
  'refreshtoken',
  'refresh_token',
  'secret',
  'better_auth_secret',
  'authorization',
  'cookie',
  'apikey',
  'api_key',
  'resend_api_key',
  'brevo_smtp_key',
  'brevo_api_key',
  'smtp_password',
  'creditcard',
  'ssn',
])

export function redactSensitiveData(obj: unknown): unknown {
  if (obj === null || obj === undefined) return obj
  if (typeof obj !== 'object') return obj

  if (Array.isArray(obj)) {
    return obj.map(redactSensitiveData)
  }

  const redacted: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      redacted[key] = '[REDACTED]'
    } else if (typeof value === 'object' && value !== null) {
      redacted[key] = redactSensitiveData(value)
    } else {
      redacted[key] = value
    }
  }
  return redacted
}

export class Logger {
  private service: string
  private environment: string

  constructor(options?: LoggerOptions) {
    this.service = options?.service ?? process.env.SERVICE_NAME ?? 'api'
    this.environment = options?.environment ?? process.env.NODE_ENV ?? 'development'
  }

  private log(
    level: LogLevel,
    message: string,
    context?: {
      request_id?: string
      trace_id?: string
      metadata?: Record<string, unknown>
    }
  ) {
    const activeCorrelation = getCorrelationContext()
    const requestId = context?.request_id || activeCorrelation?.requestId
    const traceId = context?.trace_id || activeCorrelation?.traceId

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      service: this.service,
      environment: this.environment,
      ...(requestId ? { request_id: requestId } : {}),
      ...(traceId ? { trace_id: traceId } : {}),
      message,
      ...(context?.metadata
        ? { metadata: redactSensitiveData(context.metadata) as Record<string, unknown> }
        : {}),
    }

    if (this.environment === 'production') {
      console.log('%s', JSON.stringify(entry))
    } else {
      const reqInfo = entry.request_id ? ` [req:${entry.request_id}]` : ''
      const logHeader = `[${entry.timestamp}] [${entry.level.toUpperCase()}] [${entry.service}]${reqInfo}: ${entry.message}`
      console.log('%s %o', logHeader, entry.metadata ?? '')
    }
  }

  info(
    message: string,
    context?: { request_id?: string; trace_id?: string; metadata?: Record<string, unknown> }
  ) {
    this.log('info', message, context)
  }

  warn(
    message: string,
    context?: { request_id?: string; trace_id?: string; metadata?: Record<string, unknown> }
  ) {
    this.log('warn', message, context)
  }

  error(
    message: string,
    context?: { request_id?: string; trace_id?: string; metadata?: Record<string, unknown> }
  ) {
    this.log('error', message, context)
  }

  debug(
    message: string,
    context?: { request_id?: string; trace_id?: string; metadata?: Record<string, unknown> }
  ) {
    this.log('debug', message, context)
  }
}

export const logger = new Logger()

export function httpLoggerMiddleware(serviceName = 'api') {
  const reqLogger = new Logger({ service: serviceName })

  return (req: Request, res: Response, next: NextFunction) => {
    const incomingRequestId = req.headers['x-request-id'] as string
    const incomingTraceId =
      (req.headers['x-trace-id'] as string) || (req.headers['traceparent'] as string)
    const correlation = generateCorrelationContext(incomingRequestId, incomingTraceId)

    ;(req as Request & { requestId?: string; traceId?: string }).requestId = correlation.requestId
    ;(req as Request & { requestId?: string; traceId?: string }).traceId = correlation.traceId

    res.setHeader('X-Request-ID', correlation.requestId)
    res.setHeader('X-Trace-ID', correlation.traceId)

    const startTime = Date.now()

    res.on('finish', () => {
      const durationMs = Date.now() - startTime
      const durationSec = durationMs / 1000
      const route = req.route?.path || req.path || 'unknown'
      const statusCodeStr = String(res.statusCode)

      // Record Prometheus Metrics
      httpRequestsTotal.inc({ method: req.method, route, status_code: statusCodeStr })
      httpRequestDurationSeconds.observe(
        { method: req.method, route, status_code: statusCodeStr },
        durationSec
      )

      const metadata = {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        durationMs,
        userAgent: req.get('user-agent'),
        ip: req.ip,
      }

      if (res.statusCode >= 400) {
        httpErrorsTotal.inc({ method: req.method, route, status_code: statusCodeStr })
        reqLogger.warn(`${req.method} ${req.path} ${res.statusCode} - ${durationMs}ms`, {
          request_id: correlation.requestId,
          trace_id: correlation.traceId,
          metadata,
        })
      } else {
        reqLogger.info(`${req.method} ${req.path} ${res.statusCode} - ${durationMs}ms`, {
          request_id: correlation.requestId,
          trace_id: correlation.traceId,
          metadata,
        })
      }
    })

    runWithCorrelation(correlation, () => {
      next()
    })
  }
}
