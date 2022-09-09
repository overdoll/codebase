import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'
import { CharacterIdentifier } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

export default function EmptyCustomCharacters ({ hint }: HintProp): JSX.Element {
  return (
    <EmptyBackground icon={CharacterIdentifier}>
      {hint == null
        ? (
          <Trans>
            No original characters were found. Turn off the filter if you would like to search for all characters
            instead.
          </Trans>
          )
        : (
          <Trans>
            No original characters were found with the name {hint}. Turn off the filter if you would like to
            search for all characters instead.
          </Trans>
          )}
    </EmptyBackground>
  )
}
