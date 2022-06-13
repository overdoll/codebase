import { Trans as TransMacro } from '@lingui/macro'
import { Trans } from '@lingui/react'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'

export default function EmptyCharacters ({ hint }: HintProp): JSX.Element {
  const emptyMessage = <TransMacro id='message.placeholder.empty.characters.one'>No characters were found</TransMacro>

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
