import { Trans } from '@lingui/macro'
import EmptyBackground from '../EmptyBackground/EmptyBackground'
import { SadError } from '@//:assets/icons'

export default function EmptyPosts (): JSX.Element {
  return (
    <EmptyBackground icon={SadError}>
      <Trans>
        We couldn't find any posts
      </Trans>
    </EmptyBackground>
  )
}
