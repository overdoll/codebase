/**
 * @flow
 */
import type { Location, RouterInstance } from '@//:modules/routing/router'
import BatteryFriendlyTimer from './timer'
import { getEnv } from '@//:modules/runtime'
import axios from 'axios'

const timer = new BatteryFriendlyTimer(window)

let PendingRequest = false

export function registerUpdateListener (router: RouterInstance) {
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

// Export a function to refresh the timer so we can use it in other places,
// i.e. before making an API call
export async function refreshUpdateTimer () {
  await timer.fetchHappens()
}

// PerformUpdate is a simple function that will perform an update
// It just sets the location to where the user was originally supposed to go
// Return false makes it so that history won't do it's usual navigation
function performUpdate (location: Location) {
  window.location.href = `${location.pathname}${location.search}`
  return false
}

// Check for update
// If an update is needed, the location will reload
function checkForUpdate (router: RouterInstance) {
  if (PendingRequest) return

  PendingRequest = true

  // fetch version
  axios.get('/api/version')
    .then(response => {
      // no version change, proceed
      // unblock with PendingRequest as well
      if (getEnv('APP_VERSION') !== response.data) {
        // Block the history
        // When blocked, the function in the callback will be called next time a route
        // change is supposed to happen
        router.context.history.block(performUpdate)
        return
      }

      PendingRequest = false
    })
}
