import { Trans } from '@lingui/react'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'
import { SeriesIdentifier } from '@//:assets/icons'

export default function EmptySeries ({ hint }: HintProp): JSX.Element {
  const emptyMessage = (
    <Trans
      id='message.placeholder.empty.series.one'
      message='No series were found'
      values={{}}
      components={{}}
    />
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
    <EmptyBackground icon={SeriesIdentifier}>
      {hint == null ? emptyMessage : fullMessage}
    </EmptyBackground>
  )
}
