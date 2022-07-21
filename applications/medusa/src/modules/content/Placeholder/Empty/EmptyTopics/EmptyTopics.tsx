import { Trans } from '@lingui/react'
import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'
import { TopicIdentifier } from '@//:assets/icons'

export default function EmptyTopics ({ hint }: HintProp): JSX.Element {
  const emptyMessage = (
    <Trans
      id='message.placeholder.empty.topics.one'
      message='No topics were found'
      values={{}}
      components={{}}
    />
  )

  const fullMessage = (
    <Trans
      id='message.placeholder.empty.topics.other'
      values={{ hint: hint }}
      message={`No topics were found with the title ${hint as string}`}
      components={{}}
    />
  )

  return (
    <EmptyBackground icon={TopicIdentifier}>
      {hint == null ? emptyMessage : fullMessage}
    </EmptyBackground>
  )
}
