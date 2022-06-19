import { Trans } from '@lingui/macro'
import EmptyBackground from '../EmptyBackground/EmptyBackground'
import { FileMultiple } from '@//:assets/icons'

export default function EmptyPayouts (): JSX.Element {
  return (
    <EmptyBackground icon={FileMultiple}>
      <Trans>
        No posts were found
      </Trans>
    </EmptyBackground>
  )
}
