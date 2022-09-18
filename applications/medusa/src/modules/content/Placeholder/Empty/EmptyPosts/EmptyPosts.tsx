import { Trans } from '@lingui/macro'
import EmptyBackground from '../EmptyBackground/EmptyBackground'
import { FileMultiple } from '@//:assets/icons'

export default function EmptyPosts (): JSX.Element {
  return (
    <EmptyBackground icon={FileMultiple}>
      <Trans>
        We couldn't find any posts
      </Trans>
    </EmptyBackground>
  )
}
