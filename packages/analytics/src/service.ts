import { activeUsers, engagementRate, eventCounts } from './aggregates'
import { buildFunnel } from './funnels'
import { cohortRetention } from './retention'

import type { AnalyticsConsent, AnalyticsEventInput, AnalyticsEventName } from './types'

export interface StoredAnalyticsEvent extends AnalyticsEventInput {
  id: string
  tenantId: string | null
  receivedAt: Date
}

export interface AnalyticsRepository {
  findByIdempotencyKey(key: string): Promise<StoredAnalyticsEvent | null>
  insert(event: StoredAnalyticsEvent): Promise<void>
  list(input: {
    from: Date
    to: Date
    collegeId?: string
    names?: AnalyticsEventName[]
  }): Promise<StoredAnalyticsEvent[]>
  anonymizeUser(userId: string): Promise<number>
  deleteUser(userId: string): Promise<number>
}

const SENSITIVE = /password|token|secret|authorization|message|content|email|phone/i

export function sanitizeProperties(properties: AnalyticsEventInput['properties'] = {}) {
  return Object.fromEntries(Object.entries(properties).filter(([key]) => !SENSITIVE.test(key)))
}

export function validateEvent(input: AnalyticsEventInput): AnalyticsEventInput {
  if (!input.idempotencyKey || input.idempotencyKey.length > 200) {
    throw new Error('ANALYTICS_IDEMPOTENCY_KEY_REQUIRED')
  }
  if (!input.name) throw new Error('ANALYTICS_EVENT_NAME_REQUIRED')
  return { ...input, properties: sanitizeProperties(input.properties) }
}

export class AnalyticsService {
  constructor(private readonly repository: AnalyticsRepository) {}

  async ingest(
    input: AnalyticsEventInput,
    tenantId: string | null
  ): Promise<{ duplicate: boolean; event?: StoredAnalyticsEvent }> {
    const event = validateEvent(input)
    if ((event.consent as AnalyticsConsent | undefined) === 'DENIED') {
      return { duplicate: false }
    }

    const existing = await this.repository.findByIdempotencyKey(event.idempotencyKey)
    if (existing) return { duplicate: true, event: existing }

    const stored: StoredAnalyticsEvent = {
      ...event,
      id: crypto.randomUUID(),
      tenantId,
      receivedAt: new Date(),
    }

    try {
      await this.repository.insert(stored)
    } catch (error: any) {
      if (error?.code === 'P2002') {
        const duplicate = await this.repository.findByIdempotencyKey(event.idempotencyKey)
        return { duplicate: true, event: duplicate ?? undefined }
      }
      throw error
    }

    return { duplicate: false, event: stored }
  }

  async dashboard(from: Date, to: Date, collegeId?: string) {
    const events = await this.repository.list({ from, to, collegeId })
    const users = activeUsers(events)
    const counts = eventCounts(events)
    const featureUsage = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))

    const byDomain = (names: string[]) => {
      const selected = events.filter((event) => names.includes(event.name))
      return {
        events: selected.length,
        activeUsers: activeUsers(selected),
        eventCounts: eventCounts(selected),
      }
    }
    const user = byDomain(['user_signed_up', 'user_logged_in', 'profile_viewed'])
    const engagement = byDomain([
      'post_created',
      'post_liked',
      'message_sent',
      'notification_opened',
      'feature_used',
    ])
    const community = byDomain(['club_joined'])
    const club = byDomain(['club_joined', 'club_event_created', 'club_event_registered'])
    const event = byDomain(['club_event_created', 'club_event_registered'])
    const internship = byDomain(['internship_viewed', 'internship_applied'])
    const growth = {
      signUps: counts.user_signed_up ?? 0,
      activeUsers: users,
      signInEvents: counts.user_logged_in ?? 0,
    }
    const content = byDomain(['post_created', 'post_liked'])
    const funnel = buildFunnel(['internship_viewed', 'internship_applied'], events)
    const cohorts = cohortRetention(
      {
        current: Array.from(
          new Set(events.map((e) => e.actor?.userId).filter((x): x is string => Boolean(x)))
        ),
      },
      {
        current: Array.from(
          new Set(
            events
              .filter((e) => e.name === 'user_logged_in')
              .map((e) => e.actor?.userId)
              .filter((x): x is string => Boolean(x))
          )
        ),
      }
    )
    return {
      from: from.toISOString(),
      to: to.toISOString(),
      totals: {
        events: events.length,
        activeUsers: users,
        engagementRate: engagementRate(users, Math.max(users, 1)),
      },
      eventCounts: counts,
      featureUsage,
      domains: { user, engagement, growth, content, community, club, event, internship },
      funnels: { internshipApplication: funnel },
      cohorts,
      dataQuality: {
        invalid: 0,
        duplicateRate: 0,
        freshnessSeconds: 0,
        expectedDays: Math.max(1, Math.ceil((to.getTime() - from.getTime()) / 86400000)),
      },
    }
  }

  async privacy(
    userId: string,
    action: 'EXPORT' | 'DELETE' | 'ANONYMIZE',
    from = new Date(0),
    to = new Date()
  ) {
    if (action === 'EXPORT') {
      const events = await this.repository.list({ from, to })
      return events.filter((event) => event.actor?.userId === userId)
    }
    if (action === 'DELETE') {
      return { affected: await this.repository.deleteUser(userId) }
    }
    return { affected: await this.repository.anonymizeUser(userId) }
  }
}
