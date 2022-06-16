import { Trans } from '@lingui/react'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'
import { CategoryIdentifier } from '@//:assets/icons'

export default function EmptyCategories ({ hint }: HintProp): JSX.Element {
  const emptyMessage = (
    <Trans
      id='message.placeholder.empty.categories.one'
      message='No categories were found'
      values={{}}
      components={{}}
    />
  )

  const fullMessage = (
    <Trans
      id='message.placeholder.empty.categories.other'
      values={{ hint: hint }}
      message={`No categories were found with the title ${hint as string}`}
      components={{}}
    />
  )

  return (
    <EmptyBackground icon={CategoryIdentifier}>
      {hint == null ? emptyMessage : fullMessage}
    </EmptyBackground>
  )
}
