import { Trans } from '@lingui/macro'
import EmptyBackground from '../EmptyBackground/EmptyBackground'
import { PaymentMethodIdentifier } from '@//:assets/icons'

export default function EmptyPaymentMethods (): JSX.Element {
  return (
    <EmptyBackground icon={PaymentMethodIdentifier}>
      <Trans>
        No payment methods found
      </Trans>
    </EmptyBackground>
  )
}
