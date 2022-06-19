import { Trans } from '@lingui/react'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'
import { ClubPeopleGroup } from '@//:assets/icons'

export default function EmptyClubs ({ hint }: HintProp): JSX.Element {
  const emptyMessage = (
    <Trans
      id='message.placeholder.empty.clubs.one'
      message='No clubs were found'
      values={{}}
      components={{}}
    />
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
    <EmptyBackground icon={ClubPeopleGroup}>
      {hint == null ? emptyMessage : fullMessage}
    </EmptyBackground>
  )
}
