import { Ability, AbilityBuilder } from '@casl/ability'

export default function defineAbility (user) {
  const { can, build } = new AbilityBuilder(Ability)

  if (user) {
    can('manage', 'account')

    if (user.isModerator) {
      can(['read', 'manage'], 'pendingPosts')
    }

    if (user.isStaff) {
      can('manage', 'all')
    }
  }

  return build()
}
