import { graphql, useFragment } from 'react-relay/hooks'
import type { ArrangeUpPostContentButtonFragment$key } from '@//:artifacts/ArrangeUpPostContentButtonFragment.graphql'
import type {
  ArrangeUpPostContentButtonPostFragment$key
} from '@//:artifacts/ArrangeUpPostContentButtonPostFragment.graphql'
import { Trans } from '@lingui/macro'
import { ArrowButtonUp } from '@//:assets/icons'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'

interface Props {
  query: ArrangeUpPostContentButtonFragment$key
  postQuery: ArrangeUpPostContentButtonPostFragment$key
  onClick: () => void
  isLoading: boolean
}

const Fragment = graphql`
  fragment ArrangeUpPostContentButtonFragment on PostContent {
    id
  }
`

const PostFragment = graphql`
  fragment ArrangeUpPostContentButtonPostFragment on Post {
    id
    content {
      id
    }
  }
`

export default function ArrangeUpPostContentButton ({
  query,
  postQuery,
  onClick,
  isLoading
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)

  const data = useFragment(Fragment, query)

  const index = postData.content.findIndex(item => item.id === data.id)

  if (index === 0) {
    return <></>
  }

  return (
    <MenuItem
      onClick={onClick}
      isLoading={isLoading}
      text={<Trans>Move Up</Trans>}
      icon={ArrowButtonUp}
    />
  )
}
