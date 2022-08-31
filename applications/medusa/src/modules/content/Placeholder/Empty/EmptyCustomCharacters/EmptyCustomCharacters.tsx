import { Trans } from '@lingui/react'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'
import { CharacterIdentifier } from '@//:assets/icons'

export default function EmptyCustomCharacters ({ hint }: HintProp): JSX.Element {
  const emptyMessage = (
    <Trans
      id='message.placeholder.empty.custom_characters.one'
      message='No original characters were found. Turn off the filter if you would like to search for all characters instead.'
      values={{}}
      components={{}}
    />
  )

  const fullMessage = (
    <Trans
      id='message.placeholder.empty.custom_characters.other'
      values={{ hint: hint }}
      message={`No original characters were found with the name ${hint as string}. Turn off the filter if you would like to search for all characters instead.`}
      components={{}}
    />
  )

  return (
    <EmptyBackground icon={CharacterIdentifier}>
      {hint == null ? emptyMessage : fullMessage}
    </EmptyBackground>
  )
}
