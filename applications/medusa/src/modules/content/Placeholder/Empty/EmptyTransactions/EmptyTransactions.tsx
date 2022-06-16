import { Trans } from '@lingui/macro'
import EmptyBackground from '../EmptyBackground/EmptyBackground'
import { PaymentMethodIdentifier } from '@//:assets/icons'

export default function EmptyTransactions (): JSX.Element {
  return (
    <EmptyBackground icon={PaymentMethodIdentifier}>
      <Trans>
        No transactions were found
      </Trans>
    </EmptyBackground>
  )
}
