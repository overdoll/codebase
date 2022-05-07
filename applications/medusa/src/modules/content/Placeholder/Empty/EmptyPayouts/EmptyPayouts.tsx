import { Trans } from '@lingui/macro'
import EmptyBackground from '../EmptyBackground/EmptyBackground'

export default function EmptyPayouts (): JSX.Element {
  return (
    <EmptyBackground>
      <Trans>
        No payouts were found
      </Trans>
    </EmptyBackground>
  )
}
