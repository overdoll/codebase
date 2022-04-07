import { Trans } from '@lingui/macro'
import EmptyBackground from '../EmptyBackground/EmptyBackground'

export default function EmptyTransactions (): JSX.Element {
  return (
    <EmptyBackground>
      <Trans>
        No transactions were found
      </Trans>
    </EmptyBackground>
  )
}
