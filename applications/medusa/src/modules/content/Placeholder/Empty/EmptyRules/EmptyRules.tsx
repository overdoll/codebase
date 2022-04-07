import { Trans } from '@lingui/macro'
import EmptyBackground from '../EmptyBackground/EmptyBackground'

export default function EmptyRules (): JSX.Element {
  return (
    <EmptyBackground>
      <Trans>
        No rules were found
      </Trans>
    </EmptyBackground>
  )
}
