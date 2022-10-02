import * as Sentry from '@sentry/nextjs'
import { graphql, useFragment } from 'react-relay/hooks'
import type { identifyAccountFragment$key } from '@//:artifacts/identifyAccountFragment.graphql'
import posthog from 'posthog-js'

interface Props {
  query: identifyAccountFragment$key | null
}

const GrantFragment = graphql`
  fragment identifyAccountFragment on Account {
    isStaff
    isArtist
    isModerator
    isWorker
    username
    reference
  }
`

export default function identifyAccount (props: Props): void {
  const {
    query
  } = props

  const data = useFragment(GrantFragment, query)

  posthog.identify(data?.reference, {
    isStaff: data?.isStaff,
    isArtist: data?.isArtist,
    isModerator: data?.isModerator,
    isWorker: data?.isWorker,
    username: data?.username
  })

  // identify user in sentry
  Sentry.setUser({
    username: data?.username,
    id: data?.reference
  })

  if (data != null && (data.isStaff || data.isWorker)) {
    posthog.opt_out_capturing()
  }
}
