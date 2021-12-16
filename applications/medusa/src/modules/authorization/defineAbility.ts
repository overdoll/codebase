import { App, AppAbility, Authenticated } from './types'
import { AbilityBuilder } from '@casl/ability'

const defineAbility = (data: Authenticated | null): AppAbility => {
  const {
    can,
    build
  } = new AbilityBuilder(App)

  if (data != null) {
    can('manage', 'Account')

    if (!data.isLocked) {
      can('create', 'Post')
    }

    if (data.isModerator) {
      if (!data.isLocked) {
        can('moderate', 'Post')
      }
    }
  }

  return build()
}

export default defineAbility
