import * as Sentry from '@sentry/nextjs'
import posthog from 'posthog-js'

interface Props {
  account?: {
    username: string
    reference: string
    isStaff: boolean
    isArtist: boolean
    isModerator: boolean
    isWorker: boolean
  } | null
}

export default function identifyAccount (props: Props): void {
  const {
    account
  } = props

  posthog.identify(account?.reference, {
    isStaff: account?.isStaff,
    isArtist: account?.isArtist,
    isModerator: account?.isModerator,
    isWorker: account?.isWorker,
    username: account?.username
  })

  // identify user in sentry
  Sentry.setUser({
    username: account?.username,
    id: account?.reference
  })

  if (account != null && (account?.isStaff || account?.isWorker)) {
    posthog.opt_out_capturing()
  }
}
