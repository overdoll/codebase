import { Trans } from '@lingui/react'

import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'

export default function EmptyClubs ({ hint }: HintProp): JSX.Element {
  const emptyMessage = (
    <Trans values={{}} components={{}} id='message.placeholder.empty.clubs.one'>No clubs were
      found
    </Trans>
  )

  const fullMessage = (
    <Trans
      id='message.placeholder.empty.clubs.other'
      values={{ hint: hint }}
      message={`No clubs were found with the name ${hint as string}`}
      components={{}}
    />
  )

  return (
    <EmptyBackground>
      {hint == null ? emptyMessage : fullMessage}
    </EmptyBackground>
  )
}
