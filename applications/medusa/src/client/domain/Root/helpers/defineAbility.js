import { AbilityBuilder, Ability } from '@casl/ability'

export default function defineAbility (user) {
  const { can, cannot, build } = new AbilityBuilder(Ability)

  const roles = user?.roles

  can('access', 'Home')

  can('read', 'Upload')

  can('read', 'Profile')

  if (user) {
    can('access', 'Profile')

    can('manage', 'Upload')

    if (roles.includes('moderator')) {
      can('access', 'Mod')
    }

    if (roles.includes('staff')) {
      can('manage', 'all')
    }
  }

  return build()
}
