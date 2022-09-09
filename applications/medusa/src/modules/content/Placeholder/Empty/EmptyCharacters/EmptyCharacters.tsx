import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'
import { CharacterIdentifier } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

export default function EmptyCharacters ({ hint }: HintProp): JSX.Element {
  return (
    <EmptyBackground icon={CharacterIdentifier}>
      {hint == null
        ? (
          <Trans>
            No characters were found
          </Trans>
          )
        : (
          <Trans>
            No characters were found with the name {hint}
          </Trans>
          )}
    </EmptyBackground>
  )
}
