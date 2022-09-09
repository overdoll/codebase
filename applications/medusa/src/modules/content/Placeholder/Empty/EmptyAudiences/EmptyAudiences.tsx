import { Trans } from '@lingui/macro'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'
import { UserHuman } from '@//:assets/icons'

export default function EmptyAudiences ({ hint }: HintProp): JSX.Element {
  return (
    <EmptyBackground icon={UserHuman}>
      {hint == null
        ? (
          <Trans>
            No audiences were found
          </Trans>
          )
        : (
          <Trans>
            No audiences were found with the title {hint}
          </Trans>
          )}
    </EmptyBackground>
  )
}
