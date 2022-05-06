import { Trans } from '@lingui/macro'
import EmptyBackground from '../EmptyBackground/EmptyBackground'

export default function EmptyPayments (): JSX.Element {
  return (
    <EmptyBackground>
      <Trans>
        No payments were found
      </Trans>
    </EmptyBackground>
  )
}
