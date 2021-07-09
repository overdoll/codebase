import { AbilityBuilder, Ability } from '@casl/ability'

export default function defineAbility (user) {
  const { can, cannot, build } = new AbilityBuilder(Ability)

  const roles = user?.roles

  if (user) {
    can('manage', 'account')

    if (roles.includes('moderator')) {
      can(['read', 'manage'], 'pendingPosts')
    }

    if (roles.includes('staff')) {
      can('manage', 'all')
    }
  }

  return build()
}
