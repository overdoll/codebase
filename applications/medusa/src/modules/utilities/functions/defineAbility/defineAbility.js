import { AbilityBuilder, Ability } from '@casl/ability'

export default function defineAbility (user) {
  const { can, build } = new AbilityBuilder(Ability)

  const roles = user?.roles

  if (user) {
    can('manage', 'account')

    if (roles.includes('Moderator')) {
      can(['read', 'manage'], 'pendingPosts')
    }

    if (roles.includes('Staff')) {
      can('manage', 'all')
    }
  }

  return build()
}
