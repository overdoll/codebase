import { Trans as TransMacro } from '@lingui/macro'
import { Trans } from '@lingui/react'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'

export default function EmptyCategories ({ hint }: HintProp): JSX.Element {
  const emptyMessage = <TransMacro id='message.placeholder.empty.categories.one'>No categories were found</TransMacro>

  const fullMessage = (
    <Trans
      id='message.placeholder.empty.categories.other'
      values={{ hint: hint }}
      message={`No categories were found with the title ${hint as string}`}
      components={{}}
    />
  )

  return (
    <EmptyBackground>
      {hint == null ? emptyMessage : fullMessage}
    </EmptyBackground>
  )
}
