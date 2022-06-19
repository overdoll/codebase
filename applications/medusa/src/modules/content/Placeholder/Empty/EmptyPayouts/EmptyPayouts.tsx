import { Trans } from '@lingui/macro'
import EmptyBackground from '../EmptyBackground/EmptyBackground'
import { PayoutMethod } from '@//:assets/icons'

export default function EmptyPayouts (): JSX.Element {
  return (
    <EmptyBackground icon={PayoutMethod}>
      <Trans>
        No payouts were found
      </Trans>
    </EmptyBackground>
  )
}
