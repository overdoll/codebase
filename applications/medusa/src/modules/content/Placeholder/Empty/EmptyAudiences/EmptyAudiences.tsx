import { Trans } from '@lingui/react'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'
import { UserHuman } from '@//:assets/icons'

export default function EmptyAudiences ({ hint }: HintProp): JSX.Element {
  const emptyMessage = (
    <Trans
      id='message.placeholder.empty.audiences.one'
      message='No audiences were found'
      values={{}}
      components={{}}
    />
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
    <EmptyBackground icon={UserHuman}>
      {hint == null ? emptyMessage : fullMessage}
    </EmptyBackground>
  )
}
