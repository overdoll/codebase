/**
 * @flow
 */
import type { RouterInstance } from '@//:modules/routing/router'
import BatteryFriendlyTimer from '@//:modules/timer'
import { getEnv } from '@//:modules/runtime'
import axios from 'axios'

const timer = new BatteryFriendlyTimer(window)

let UpdateIsScheduled = false

export default function registerUpdateListener (router: RouterInstance) {
  timer.setInterval(
    () => checkForUpdate(router),
    10 * 60 * 1000, // check every 10 minutes if network is available
    24 * 60 * 60 * 1000 // check every day even if no network activity
  )

  // Subscribe to router change - only update our timer everytime the user's location
  // is changed, since this indicates "activity"
  router.context.history.listen(() => {
    timer.fetchHappens()
  })
}

// Check for update
// If an update is needed, the location will reload, as the route changes
function checkForUpdate (router: RouterInstance) {
  if (UpdateIsScheduled) {
    router.context.history.go(0)
    return
  }

  // fetch version
  axios.get('/api/version')
    .then(response => {
      if (response.data === getEnv('APP_VERSION')) return
      // On the next route change, the page will reload
      UpdateIsScheduled = true
    })
}
