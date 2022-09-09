import EmptyBackground, { HintProp } from '../EmptyBackground/EmptyBackground'
import { TopicIdentifier } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

export default function EmptyTopics ({ hint }: HintProp): JSX.Element {
  return (
    <EmptyBackground icon={TopicIdentifier}>
      {hint == null
        ? (
          <Trans>
            No topics were found
          </Trans>
          )
        : (
          <Trans>
            No topics were found with the title {hint}
          </Trans>
          )}
    </EmptyBackground>
  )
}
