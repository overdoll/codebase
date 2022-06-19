import { Trans } from '@lingui/react'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'
import { RemoveCross } from '@//:assets/icons'

export default function EmptyGeneralSearch ({ hint }: HintProp): JSX.Element {
  const emptyMessage = (
    <Trans
      id='message.placeholder.empty.clubs.on'
      message='No categories, characters, or series were found'
      values={{}}
      components={{}}
    />
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
    <EmptyBackground icon={RemoveCross}>
      {hint == null ? emptyMessage : fullMessage}
    </EmptyBackground>
  )
}
