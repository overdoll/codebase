import { Trans } from '@lingui/macro'
import EmptyBackground from '../EmptyBackground/EmptyBackground'
import { SubscriptionIdentifier } from '@//:assets/icons'

export default function EmptySubscriptions (): JSX.Element {
  return (
    <EmptyBackground icon={SubscriptionIdentifier}>
      <Trans>
        No subscriptions were found
      </Trans>
    </EmptyBackground>
  )
}
