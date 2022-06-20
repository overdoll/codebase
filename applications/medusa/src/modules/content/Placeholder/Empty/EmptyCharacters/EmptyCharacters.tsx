import { Trans } from '@lingui/react'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'
import { CharacterIdentifier } from '@//:assets/icons'

export default function EmptyCharacters ({ hint }: HintProp): JSX.Element {
  const emptyMessage = (
    <Trans
      id='message.placeholder.empty.characters.one'
      message='No characters were found'
      values={{}}
      components={{}}
    />
  )

  const fullMessage = (
    <Trans
      id='message.placeholder.empty.characters.other'
      values={{ hint: hint }}
      message={`No characters were found with the name ${hint as string}`}
      components={{}}
    />
  )

  return (
    <EmptyBackground icon={CharacterIdentifier}>
      {hint == null ? emptyMessage : fullMessage}
    </EmptyBackground>
  )
}
