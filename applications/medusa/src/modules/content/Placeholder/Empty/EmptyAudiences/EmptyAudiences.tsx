import { Trans } from '@lingui/react'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'

export default function EmptyAudiences ({ hint }: HintProp): JSX.Element {
  const emptyMessage = (
    <Trans values={{}} components={{}} id='message.placeholder.empty.audiences.one'>No audiences were found</Trans>
  )

  const fullMessage = (
    <Trans
      id='message.placeholder.empty.audiences.other'
      values={{ hint: hint }}
      message={`No audiences were found with the title ${hint as string}`}
      components={{}}
    />
  )

  return (
    <EmptyBackground>
      {hint == null ? emptyMessage : fullMessage}
    </EmptyBackground>
  )
}
