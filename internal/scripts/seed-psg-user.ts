/**
 * internal/scripts/seed-psg-user.ts
 *
 * Seeds a verified mock student user with a @psgtech.ac.in email,
 * associated with PSG College of Technology and Computer Science & Engineering.
 *
 * Usage:
 *   bun internal/scripts/seed-psg-user.ts
 */

import { hashPassword } from 'better-auth/crypto'
import { prisma } from '../../packages/db/src/client'

async function main() {
  console.log('🌱 Seeding mock user for PSG College of Technology (psgtech.ac.in)...\n')

  // 1. Ensure PSG College of Technology exists
  console.log('🏫 Ensuring PSG College of Technology exists...')
  let college = await prisma.college.findFirst({
    where: {
      OR: [
        { domain: 'psgtech.ac.in' },
        { slug: 'psg-tech' },
        { name: 'PSG College of Technology' },
      ],
    },
  })

  if (!college) {
    college = await prisma.college.create({
      data: {
        name: 'PSG College of Technology',
        shortName: 'PSG Tech',
        slug: 'psg-tech',
        domain: 'psgtech.ac.in',
        city: 'Coimbatore',
        state: 'Tamil Nadu',
        country: 'India',
        isVerified: true,
        isActive: true,
        description: 'Premier Autonomous Government-Aided Engineering College in Coimbatore, India.',
      },
    })
    console.log(`  ✓ Created college: ${college.name} (${college.id})`)
  } else {
    college = await prisma.college.update({
      where: { id: college.id },
      data: {
        name: 'PSG College of Technology',
        shortName: 'PSG Tech',
        domain: 'psgtech.ac.in',
        isVerified: true,
        isActive: true,
      },
    })
    console.log(`  ✓ College confirmed: ${college.name} (${college.id})`)
  }

  // 2. Ensure CollegeEmailDomain exists
  const existingDomain = await prisma.collegeEmailDomain.findFirst({
    where: { domain: 'psgtech.ac.in' },
  })
  if (!existingDomain) {
    await prisma.collegeEmailDomain.create({
      data: {
        domain: 'psgtech.ac.in',
        collegeId: college.id,
      },
    })
    console.log('  ✓ Linked domain: psgtech.ac.in')
  }

  // 3. Ensure Computer Science & Engineering department exists
  let department = await prisma.department.findFirst({
    where: {
      collegeId: college.id,
      name: { in: ['Computer Science & Engineering', 'Computer Science'] },
    },
  })

  if (!department) {
    department = await prisma.department.create({
      data: {
        name: 'Computer Science & Engineering',
        code: 'CSE',
        collegeId: college.id,
      },
    })
    console.log(`  ✓ Created department: ${department.name}`)
  } else {
    console.log(`  ✓ Department confirmed: ${department.name} (${department.id})`)
  }

  // 4. Mock Users configuration
  const mockUsersToSeed = [
    {
      email: 'student@psgtech.ac.in',
      username: 'psg_student',
      name: 'Sunil Kumar',
      firstName: 'Sunil',
      lastName: 'Kumar',
      rollNumber: '24Z201',
      password: 'Password123!',
      bio: 'Building systems & AI infrastructure. Computer Science & Engineering student at PSG College of Technology.',
    },
    {
      email: '24z201@psgtech.ac.in',
      username: 'sunilkumar_psg',
      name: 'Sunil Kumar T',
      firstName: 'Sunil',
      lastName: 'Kumar T',
      rollNumber: '24Z201',
      password: 'Password123!',
      bio: 'Pre-final year CSE student @ PSG College of Technology. Passionate about distributed systems, peer networks & AI tools.',
    },
  ]

  console.log('\n👤 Seeding mock users...')

  for (const mockData of mockUsersToSeed) {
    const passwordHash = await hashPassword(mockData.password)

    let user = await prisma.user.findUnique({
      where: { email: mockData.email },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: mockData.email,
          name: mockData.name,
          username: mockData.username,
          collegeId: college.id,
          departmentId: department.id,
          emailVerified: true,
          status: 'ACTIVE',
          role: 'STUDENT',
          password: passwordHash,
        },
      })
    } else {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: mockData.name,
          username: mockData.username,
          collegeId: college.id,
          departmentId: department.id,
          emailVerified: true,
          status: 'ACTIVE',
          role: 'STUDENT',
          password: passwordHash,
        },
      })
    }

    // 5. Ensure Better Auth credentials account exists
    await prisma.account.upsert({
      where: {
        providerId_accountId: {
          providerId: 'credential',
          accountId: user.id,
        },
      },
      update: {
        password: passwordHash,
      },
      create: {
        userId: user.id,
        providerId: 'credential',
        accountId: user.id,
        password: passwordHash,
      },
    })

    // Also support accountId as email for legacy lookups
    await prisma.account.upsert({
      where: {
        providerId_accountId: {
          providerId: 'credential',
          accountId: user.email,
        },
      },
      update: {
        password: passwordHash,
      },
      create: {
        userId: user.id,
        providerId: 'credential',
        accountId: user.email,
        password: passwordHash,
      },
    })

    // 6. Ensure Profile record is complete
    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: {
        firstName: mockData.firstName,
        lastName: mockData.lastName,
        email: mockData.email,
        rollNumber: mockData.rollNumber,
        batch: '2024-2028',
        year: 2,
        semester: 4,
        cgpa: 8.92,
        bio: mockData.bio,
        hometown: 'Coimbatore',
        location: 'Coimbatore, India',
        profilePicture: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
        skills: ['TypeScript', 'React', 'Node.js', 'Python', 'Distributed Systems', 'PostgreSQL'],
        interests: ['System Design', 'AI / ML', 'Competitive Programming', 'Open Source Tooling'],
        languages: ['English', 'Tamil'],
        github: 'https://github.com/sunilkumar',
        linkedin: 'https://linkedin.com/in/sunilkumar',
        profileVisibility: 'PUBLIC',
      },
      create: {
        userId: user.id,
        firstName: mockData.firstName,
        lastName: mockData.lastName,
        email: mockData.email,
        rollNumber: mockData.rollNumber,
        batch: '2024-2028',
        year: 2,
        semester: 4,
        cgpa: 8.92,
        bio: mockData.bio,
        hometown: 'Coimbatore',
        location: 'Coimbatore, India',
        profilePicture: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
        skills: ['TypeScript', 'React', 'Node.js', 'Python', 'Distributed Systems', 'PostgreSQL'],
        interests: ['System Design', 'AI / ML', 'Competitive Programming', 'Open Source Tooling'],
        languages: ['English', 'Tamil'],
        github: 'https://github.com/sunilkumar',
        linkedin: 'https://linkedin.com/in/sunilkumar',
        profileVisibility: 'PUBLIC',
      },
    })

    console.log(`  ✓ Seeded User: ${user.name} (${user.email})`)
    console.log(`    - ID: ${user.id}`)
    console.log(`    - Username: @${user.username}`)
    console.log(`    - College: ${college.name}`)
    console.log(`    - Department: ${department.name}`)
    console.log(`    - Profile ID: ${profile.id}`)
    console.log(`    - Status: ${user.status} (Verified: ${user.emailVerified})`)
  }

  console.log('\n✅ Mock PSG Tech user successfully seeded in the database!')
  console.log('\n📋 Account Info:')
  console.log('  Email:    student@psgtech.ac.in (or 24z201@psgtech.ac.in)')
  console.log('  Password: Password123!')
  console.log('  College:  PSG College of Technology\n')
}

main()
  .catch((err) => {
    console.error('❌ Error seeding PSG user:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
