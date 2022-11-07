import { App, AppAbility, Authenticated } from './types'
import { AbilityBuilder } from '@casl/ability'

const defineAbility = (data: Authenticated | null): AppAbility => {
  const {
    can,
    build
  } = new AbilityBuilder(App)

  can('interact', ['Club', 'Post'])

  if (data != null) {
    can('configure', 'Account')

    if (data.isSupporter) {
      can('configure', ['Supporter'])
    }

    if (data.isWorker) {
      if (!data.isLocked) {
        can('create', ['Club', 'Post'])
        can('edit', 'Post')
      }
    }

    if (data.isArtist) {
      can('configure', 'Club')
      if (!data.isLocked) {
        can('create', ['Club', 'Post'])
      }
    }

    if (data.isModerator) {
      if (!data.isLocked) {
        can('moderate', 'Post')
      }
    }

    if (data.isStaff) {
      if (!data.isLocked) {
        can('staff', ['Entity', 'Club', 'Account', 'Post', 'Billing'])
        can('edit', 'Post')
      }
    }
  }

  return build()
}

export default defineAbility
