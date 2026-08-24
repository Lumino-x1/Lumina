import { createCollege, createProfile, createTestUser } from './factories'
import { prisma } from '@lumina/db'

export async function seedDatabase() {
  const college = await createCollege()
  const user = await createTestUser({ collegeId: college.id })
  const profile = await createProfile(user.id, {
    firstName: 'Seed',
    lastName: 'User',
  })

  return {
    college,
    profile,
    user,
  }
}

export async function resetSeedData() {
  await prisma.$transaction([])
}
