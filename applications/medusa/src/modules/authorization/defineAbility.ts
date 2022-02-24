import { App, AppAbility, Authenticated } from './types'
import { AbilityBuilder } from '@casl/ability'

const defineAbility = (data: Authenticated | null): AppAbility => {
  const {
    can,
    cannot,
    build
  } = new AbilityBuilder(App)

  if (data != null) {
    can('manage', 'Account')

    if (data.clubs.length > 0) {
      can('manage', 'Club')
    }

    if (!data.isLocked) {
      can('create', 'Club')
      can('create', 'Post')
    }

    if (data.isModerator) {
      if (!data.isLocked) {
        can('moderate', 'Post')
      }
    }

    if (data.isStaff) {
      if (!data.isLocked) {
        can('admin', 'Tags')
        can('admin', 'Account')
        can('admin', 'Post')
      }
    }
  }

  return build()
}

export default defineAbility
