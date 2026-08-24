import {
  canChangeMemberRole,
  canDeleteGroup,
  canEditOwnOrModerate,
  canManageGroup,
  canRemoveMember,
} from '../../apps/api/src/api/service'
import { describe, expect, test } from 'vitest'

describe('study group RBAC', () => {
  test('owners and admins can manage the group', () => {
    expect(canManageGroup('OWNER')).toBe(true)
    expect(canManageGroup('ADMIN')).toBe(true)
    expect(canManageGroup('MEMBER')).toBe(false)
  })

  test('only the owner can delete the group', () => {
    expect(canDeleteGroup('OWNER')).toBe(true)
    expect(canDeleteGroup('ADMIN')).toBe(false)
  })

  test('members can edit their own content and admins can moderate', () => {
    expect(canEditOwnOrModerate('MEMBER', true)).toBe(true)
    expect(canEditOwnOrModerate('MEMBER', false)).toBe(false)
    expect(canEditOwnOrModerate('ADMIN', false)).toBe(true)
  })

  test('admins cannot change owner roles and owners cannot be removed', () => {
    expect(canChangeMemberRole('ADMIN', 'OWNER')).toBe(false)
    expect(canChangeMemberRole('OWNER', 'ADMIN')).toBe(true)
    expect(canRemoveMember('ADMIN', 'OWNER', false)).toBe(false)
    expect(canRemoveMember('MEMBER', 'MEMBER', true)).toBe(true)
  })
})
