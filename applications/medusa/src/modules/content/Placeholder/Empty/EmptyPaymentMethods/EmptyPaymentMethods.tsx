import { Trans } from '@lingui/macro'
import EmptyBackground from '../EmptyBackground/EmptyBackground'

export default function EmptyPaymentMethods (): JSX.Element {
  return (
    <EmptyBackground>
      <Trans>
        No payment methods found
      </Trans>
    </EmptyBackground>
  )
}
