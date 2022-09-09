import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'
import { CategoryIdentifier } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

export default function EmptyCategories ({ hint }: HintProp): JSX.Element {
  return (
    <EmptyBackground icon={CategoryIdentifier}>
      {hint == null
        ? (
          <Trans>
            No categories were found
          </Trans>
          )
        : (
          <Trans>
            No categories were found with the title {hint}
          </Trans>
          )}
    </EmptyBackground>
  )
}
