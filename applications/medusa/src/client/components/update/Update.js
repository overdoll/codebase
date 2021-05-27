import { useRuntime } from '@//:modules/runtime'
import { useEffect } from 'react'
import BatteryFriendlyTimer from '@//:modules/timer'

export default function Update () {
  const [getEnv] = useRuntime()

  const checkForUpdate = () => {
    const version = getEnv('APP_VERSION')

    fetch('/api/version')
      .then(body => {

      })
  }

  useEffect(() => {
    (new BatteryFriendlyTimer(window))
      .setInterval(
        checkForUpdate,
        10 * 60 * 1000, // check every 10 minutes if network is available
        24 * 60 * 60 * 1000 // check every day even if no network activity
      )
  }, [])

  return null
}
