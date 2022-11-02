import { ReactNode, useEffect, useMemo } from 'react'
import { AbilityContext } from '@//:modules/authorization/AbilityContext'
import { graphql, useFragment } from 'react-relay/hooks'
import { AccountAuthorizerFragment$key } from '@//:artifacts/AccountAuthorizerFragment.graphql'
import defineAbility from '@//:modules/authorization/defineAbility'
import * as Sentry from '@sentry/nextjs'
import posthog from 'posthog-js'
import { useRouter } from 'next/router'

interface Props {
  children: ReactNode
  queryRef: AccountAuthorizerFragment$key | null
}

const AccountAuthorizerGQL = graphql`
  fragment AccountAuthorizerFragment on Account {
    reference
    username
    lock {
      __typename
    }
    deleting {
      __typename
    }
    isModerator
    isStaff
    isArtist
    isWorker
    hasClubSupporterSubscription
  }
`

export default function AccountAuthorizer ({
  queryRef,
  children
}: Props): JSX.Element {
  const router = useRouter()

  const data = useFragment(AccountAuthorizerGQL, queryRef)

  const ability = useMemo(() => defineAbility(
    (
      data != null
        ? {
            isModerator: data.isModerator,
            isStaff: data.isStaff,
            isLocked: data.lock != null || data.deleting != null,
            isArtist: data.isArtist,
            isWorker: data.isWorker,
            isSupporter: data.hasClubSupporterSubscription
          }
        : null
    )), [data])

  // only run this on the client
  useEffect(() => {
    if (data != null) {
      Sentry.setUser({
        username: data.username,
        id: data.reference
      })
    }
  }, [])

  // fathom setup for tracking users
  useEffect(() => {
    const trackingCode: string = process.env.NEXT_PUBLIC_POSTHOG_TRACKING_CODE as string
    const isInProperHostName = [process.env.NEXT_PUBLIC_POSTHOG_DOMAIN as string].includes(window.location.hostname)
    if (trackingCode !== '') {
      const disableSessionRecording = !isInProperHostName || (data != null ? (data?.isStaff || data?.isWorker) : false)

      // let random = Math.floor(Math.random() * 5)
      // // only record 1/10 sessions (around 20%))
      //
      // // always record logged in sessions
      // if (data?.isArtist === true || (data != null && !data?.isStaff && !data?.isWorker)) {
      //   random = 0
      // }
      //
      // if (random !== 0 && !disableSessionRecording) {
      //   disableSessionRecording = true
      // }

      posthog.init(trackingCode, {
        api_host: 'https://app.posthog.com',
        persistence: 'localStorage',
        opt_out_capturing_by_default: !isInProperHostName,
        opt_out_capturing_persistence_type: 'localStorage',
        autocapture: !disableSessionRecording,
        capture_pageview: isInProperHostName,
        disable_session_recording: disableSessionRecording,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        loaded: (posthog_instance) => {
          if (data != null) {
            posthog_instance.identify(data?.reference, {
              isStaff: data?.isStaff,
              isArtist: data?.isArtist,
              isModerator: data?.isModerator,
              isWorker: data?.isWorker,
              username: data?.username,
              isSupporter: data?.hasClubSupporterSubscription
            })

            // don't capture data from staff or workers
            if (data.isStaff || data.isWorker) {
              posthog_instance.opt_out_capturing()
            }
          }
        }
      })
    }

    function onRouteChangeComplete (): void {
      if (trackingCode !== '') {
        posthog?.capture('$pageview', {
          next_pathname: router.pathname,
          next_query: router.query
        })
      }
    }

    // posthog.feature_flags.override({ 'grid-post': 'one-image' })
    // posthog.feature_flags.override({ 'home-suggested': 'suggested' })
    // posthog.feature_flags.override({ 'club-preview': 'tile' })

    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router])

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  )
}
