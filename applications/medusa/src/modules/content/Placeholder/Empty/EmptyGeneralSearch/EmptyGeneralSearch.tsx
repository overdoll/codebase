import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'
import { SearchBar } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

export default function EmptyGeneralSearch ({ hint }: HintProp): JSX.Element {
  return (
    <EmptyBackground icon={SearchBar}>
      {hint == null
        ? (
          <Trans>
            No categories, characters, or series were found
          </Trans>
          )
        : (
          <Trans>
            No categories, characters, or series were found from the text {hint}
          </Trans>
          )}
    </EmptyBackground>
  )
}
