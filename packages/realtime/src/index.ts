/** Lightweight server-sent notification stream. In-memory by design; use Redis fan-out when horizontally scaled. */
import type { Response } from 'express'

const clients = new Map<string, Set<Response>>()

export function subscribe(userId: string, response: Response) {
  const set = clients.get(userId) ?? new Set<Response>()
  set.add(response)
  clients.set(userId, set)
  response.write('event: connected\ndata: {"ok":true}\n\n')
  return () => {
    set.delete(response)
    if (set.size === 0) clients.delete(userId)
  }
}

export function publishNotification(userId: string, payload: unknown) {
  const data = JSON.stringify(payload)
  for (const response of clients.get(userId) ?? [])
    response.write(`event: notification\ndata: ${data}\n\n`)
}

export function heartbeat() {
  for (const responses of clients.values())
    for (const response of responses) response.write(': heartbeat\n\n')
}
