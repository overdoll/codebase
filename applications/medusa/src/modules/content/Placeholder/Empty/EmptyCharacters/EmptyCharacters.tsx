import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'
import { CharacterIdentifier } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

export default function EmptyCharacters ({ hint }: HintProp): JSX.Element {
  return (
    <EmptyBackground icon={CharacterIdentifier}>
      {hint == null
        ? (
          <Trans>
            We couldn't find any characters
          </Trans>
          )
        : (
          <Trans>
            We couldn't find any characters with the name {hint}
          </Trans>
          )}
    </EmptyBackground>
  )
}
