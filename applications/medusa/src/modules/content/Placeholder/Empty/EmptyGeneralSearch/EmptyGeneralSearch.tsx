import { Trans as TransMacro } from '@lingui/macro'
import { Trans } from '@lingui/react'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'

export default function EmptyGeneralSearch ({ hint }: HintProp): JSX.Element {
  const emptyMessage = (
    <TransMacro id='message.placeholder.empty.clubs.one'>o categories, characters, or series were
      found
    </TransMacro>
  )

  const fullMessage = (
    <Trans
      id='message.placeholder.empty.clubs.other'
      values={{ hint: hint }}
      message={`o categories, characters, or series were found from the text ${hint as string}`}
      components={{}}
    />
  )

  return (
    <EmptyBackground>
      {hint == null ? emptyMessage : fullMessage}
    </EmptyBackground>
  )
}
