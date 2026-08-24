/**
 * packages/cli/src/seed.ts
 *
 * Database seeding script for Lumina development and testing.
 *
 * Usage:
 *   bun run packages/cli/src/seed.ts
 *   bun run db:seed
 *
 * This script creates:
 *   - Demo organization and workspace
 *   - Demo admin user (admin@lumina.dev / password: Demo1234!)
 *   - Demo regular user (user@lumina.dev / password: Demo1234!)
 *   - Sample dashboard with placeholder charts
 *   - Sample data source connections
 */

import { hash } from '@node-rs/argon2'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ─── Seed Data ────────────────────────────────────────────────────────────────

const DEMO_PASSWORD = 'Demo1234!'

const organizations = [
  {
    id: 'org_demo_acme',
    name: 'Acme Corp',
    slug: 'acme-corp',
    plan: 'GROWTH',
  },
]

const users = [
  {
    id: 'user_demo_admin',
    email: 'admin@lumina.dev',
    name: 'Demo Admin',
    role: 'ADMIN',
    organizationId: 'org_demo_acme',
  },
  {
    id: 'user_demo_analyst',
    email: 'user@lumina.dev',
    name: 'Demo Analyst',
    role: 'VIEWER',
    organizationId: 'org_demo_acme',
  },
]

const dashboards = [
  {
    id: 'dash_demo_overview',
    name: 'Business Overview',
    description: 'Key business metrics at a glance',
    organizationId: 'org_demo_acme',
    createdById: 'user_demo_admin',
    isPublic: false,
  },
  {
    id: 'dash_demo_revenue',
    name: 'Revenue Analytics',
    description: 'Monthly recurring revenue trends and cohort analysis',
    organizationId: 'org_demo_acme',
    createdById: 'user_demo_admin',
    isPublic: false,
  },
]

// ─── Main Seed Function ───────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Starting database seed...\n')

  // Hash the demo password
  const passwordHash = await hash(DEMO_PASSWORD, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })

  // 1. Create organizations
  console.log('📦 Creating organizations...')
  for (const org of organizations) {
    await prisma.organization.upsert({
      where: { id: org.id },
      update: org,
      create: org,
    })
    console.log(`  ✓ ${org.name}`)
  }

  // 2. Create users
  console.log('\n👤 Creating users...')
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: { name: user.name },
      create: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    // Create password credential
    await prisma.account.upsert({
      where: {
        providerId_accountId: {
          providerId: 'credential',
          accountId: user.email,
        },
      },
      update: { password: passwordHash },
      create: {
        userId: user.id,
        providerId: 'credential',
        accountId: user.email,
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    console.log(`  ✓ ${user.name} (${user.email})`)
  }

  // 3. Create dashboards
  console.log('\n📊 Creating sample dashboards...')
  for (const dashboard of dashboards) {
    await prisma.dashboard.upsert({
      where: { id: dashboard.id },
      update: { name: dashboard.name, description: dashboard.description },
      create: {
        ...dashboard,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
    console.log(`  ✓ ${dashboard.name}`)
  }

  console.log('\n✅ Database seeded successfully!')
  console.log('\n📋 Demo Credentials:')
  console.log('  Admin:  admin@lumina.dev / Demo1234!')
  console.log('  User:   user@lumina.dev  / Demo1234!')
  console.log('\n🌐 Start the app: bun run dev\n')
}

// ─── Run ──────────────────────────────────────────────────────────────────────

main()
  .catch((error) => {
    console.error('\n❌ Seed failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
