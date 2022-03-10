import { App, AppAbility, Authenticated } from './types'
import { AbilityBuilder } from '@casl/ability'

const defineAbility = (data: Authenticated | null): AppAbility => {
  const {
    can,
    build
  } = new AbilityBuilder(App)

  can('interact', ['Club', 'Post'])

  if (data != null) {
    can('configure', ['Account', 'Club'])

    if (!data.isLocked) {
      can('create', ['Club', 'Post'])
    }

    if (data.isModerator) {
      if (!data.isLocked) {
        can('moderate', 'Post')
      }
    }

    if (data.isStaff) {
      if (!data.isLocked) {
        can('admin', ['Tags', 'Club', 'Account', 'Post', 'Billing'])
      }
    }
  }

  return build()
}

export default defineAbility
