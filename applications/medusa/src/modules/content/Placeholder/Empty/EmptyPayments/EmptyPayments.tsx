import { Trans } from '@lingui/macro'
import EmptyBackground from '../EmptyBackground/EmptyBackground'
import { PaymentMethodIdentifier } from '@//:assets/icons'

export default function EmptyPayments (): JSX.Element {
  return (
    <EmptyBackground icon={PaymentMethodIdentifier}>
      <Trans>
        No payments were found
      </Trans>
    </EmptyBackground>
  )
}
