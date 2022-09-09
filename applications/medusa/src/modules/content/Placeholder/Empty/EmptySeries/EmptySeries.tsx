import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'
import { SeriesIdentifier } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

export default function EmptySeries ({ hint }: HintProp): JSX.Element {
  return (
    <EmptyBackground icon={SeriesIdentifier}>
      {hint == null
        ? (
          <Trans>
            No series were found
          </Trans>
          )
        : (
          <Trans>
            No series were found with the title {hint}
          </Trans>
          )}
    </EmptyBackground>
  )
}
