import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'
import { CharacterIdentifier } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

export default function EmptyCustomCharacters ({ hint }: HintProp): JSX.Element {
  return (
    <EmptyBackground icon={CharacterIdentifier}>
      {hint == null
        ? (
          <Trans>
            We couldn't find any of your club characters
          </Trans>
          )
        : (
          <Trans>
            We couldn't find any of your club characters with the name {hint}
          </Trans>
          )}
    </EmptyBackground>
  )
}
