import { Ability, AbilityBuilder } from '@casl/ability'

export default function defineAbility (user) {
  const { can, cannot, build } = new AbilityBuilder(Ability)

  // Check if user is logged in
  if (user) {
    can('manage', 'account')
    can('manage', 'posting')

    // Check if user is a moderator and give permissions accordingly
    if (user.isModerator) {
      can(['read', 'manage'], 'pendingPosts')
    }

    // Check if user is staff and give access to everything
    if (user.isStaff) {
      can('manage', 'moderators')
      can('read', 'pendingPosts')
    }

    // Check if the user is banned
    if (user.lock) {
      can('read', 'locked')
      cannot('manage', 'posting')
    }
  }

  return build()
}
