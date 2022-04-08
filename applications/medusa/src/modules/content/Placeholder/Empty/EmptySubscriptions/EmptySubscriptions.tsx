import { Trans } from '@lingui/macro'
import EmptyBackground from '../EmptyBackground/EmptyBackground'

export default function EmptySubscriptions (): JSX.Element {
  return (
    <EmptyBackground>
      <Trans>
        No subscriptions were found
      </Trans>
    </EmptyBackground>
  )
}
