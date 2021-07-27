import { Ability, AbilityBuilder } from '@casl/ability'

export default function defineAbility (isLoggedIn, isModerator, isStaff) {
  const { can, build } = new AbilityBuilder(Ability)

  // Check if user is logged in
  if (isLoggedIn) {
    can('manage', 'account')

    // Check if user is a moderator and give permissions accordingly
    if (isModerator) {
      can(['read', 'manage'], 'pendingPosts')
    }

    // Check if user is staff and give access to everything
    if (isStaff) {
      can('manage', 'moderators')
      can('manage', 'all')
    }
  }

  return build()
}
