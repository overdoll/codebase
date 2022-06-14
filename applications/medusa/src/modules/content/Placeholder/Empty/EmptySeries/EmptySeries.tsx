import { Trans } from '@lingui/react'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'

export default function EmptySeries ({ hint }: HintProp): JSX.Element {
  const emptyMessage = (
    <Trans values={{}} components={{}} id='message.placeholder.empty.series.one'>No series were
      found
    </Trans>
  )

  const fullMessage = (
    <Trans
      id='message.placeholder.empty.series.other'
      values={{ hint: hint }}
      message={`No series were found with the title ${hint as string}`}
      components={{}}
    />
  )

  return (
    <EmptyBackground>
      {hint == null ? emptyMessage : fullMessage}
    </EmptyBackground>
  )
}
