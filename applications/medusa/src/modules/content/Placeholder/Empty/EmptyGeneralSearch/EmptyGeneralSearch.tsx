import { Trans } from '@lingui/react'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'

export default function EmptyGeneralSearch ({ hint }: HintProp): JSX.Element {
  const emptyMessage = (
    <Trans values={{}} components={{}} id='message.placeholder.empty.clubs.one'>No categories, characters, or series
      were
      found
    </Trans>
  )

  const fullMessage = (
    <Trans
      id='message.placeholder.empty.clubs.other'
      values={{ hint: hint }}
      message={`No categories, characters, or series were found from the text ${hint as string}`}
      components={{}}
    />
  )

  return (
    <EmptyBackground>
      {hint == null ? emptyMessage : fullMessage}
    </EmptyBackground>
  )
}
