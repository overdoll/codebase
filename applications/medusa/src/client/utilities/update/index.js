/**
 * @flow
 */
import type { RouterInstance } from '@//:modules/routing/router'
import BatteryFriendlyTimer from '@//:modules/timer'
import { getEnv } from '@//:modules/runtime'
import axios from 'axios'

const timer = new BatteryFriendlyTimer(window)

let UpdateIsScheduled = false
let PendingRequest = false

export function registerUpdateListener (router: RouterInstance) {
  timer.setInterval(
    checkForUpdate,
    10 * 60 * 1000, // check every 10 minutes if network is available
    24 * 60 * 60 * 1000 // check every day even if no network activity
  )

  // Subscribe to router change - only update our timer everytime the user's location
  // is changed, since this indicates "activity"
  // If an update is scheduled for this route change, then perform it
  router.context.history.listen(() => {
    if (UpdateIsScheduled) {
      router.context.history.go(0)
      return
    }

    timer.fetchHappens()
  })
}

// Export a function to refresh the timer so we can use it in other places,
// i.e. before making an API call
export async function refreshUpdateTimer () {
  await timer.fetchHappens()
}

// Check for update
// If an update is needed, the location will reload, as the route changes
function checkForUpdate () {
  if (PendingRequest || UpdateIsScheduled) return

  PendingRequest = true

  // fetch version
  axios.get('/api/version')
    .then(response => {
      PendingRequest = false
      // no version change, proceed
      if (getEnv('APP_VERSION') === response.data) return
      // On the next route change, the page will reload
      UpdateIsScheduled = true
    })
}
