import { Trans } from '@lingui/react'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'

export default function EmptyCharacters ({ hint }: HintProp): JSX.Element {
  const emptyMessage = <Trans values={{}} components={{}} id='message.placeholder.empty.characters.one'>No characters were found</Trans>

  const fullMessage = (
    <Trans
      id='message.placeholder.empty.characters.other'
      values={{ hint: hint }}
      message={`No characters were found with the name ${hint as string}`}
      components={{}}
    />
  )

  return (
    <EmptyBackground>
      {hint == null ? emptyMessage : fullMessage}
    </EmptyBackground>
  )
}
