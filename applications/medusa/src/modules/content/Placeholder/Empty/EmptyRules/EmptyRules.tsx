import { Trans } from '@lingui/macro'
import EmptyBackground from '../EmptyBackground/EmptyBackground'
import { FlagReport } from '@//:assets/icons'

export default function EmptyRules (): JSX.Element {
  return (
    <EmptyBackground icon={FlagReport}>
      <Trans>
        No rules were found
      </Trans>
    </EmptyBackground>
  )
}
