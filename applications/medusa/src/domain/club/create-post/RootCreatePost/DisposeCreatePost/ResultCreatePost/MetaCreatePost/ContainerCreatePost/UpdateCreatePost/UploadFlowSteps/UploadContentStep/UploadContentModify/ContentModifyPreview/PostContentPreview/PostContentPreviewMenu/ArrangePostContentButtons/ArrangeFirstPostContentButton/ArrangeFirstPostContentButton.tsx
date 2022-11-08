import { graphql, useFragment } from 'react-relay/hooks'
import type {
  ArrangeFirstPostContentButtonFragment$key
} from '@//:artifacts/ArrangeFirstPostContentButtonFragment.graphql'
import type {
  ArrangeFirstPostContentButtonPostFragment$key
} from '@//:artifacts/ArrangeFirstPostContentButtonPostFragment.graphql'
import { Trans } from '@lingui/macro'
import { DoubleArrowUp } from '@//:assets/icons'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'

interface Props {
  query: ArrangeFirstPostContentButtonFragment$key
  postQuery: ArrangeFirstPostContentButtonPostFragment$key
  onClick: () => void
  isLoading: boolean
}

const Fragment = graphql`
  fragment ArrangeFirstPostContentButtonFragment on PostContent {
    id
  }
`

const PostFragment = graphql`
  fragment ArrangeFirstPostContentButtonPostFragment on Post {
    id
    content {
      id
    }
  }
`

export default function ArrangeFirstPostContentButton ({
  query,
  postQuery,
  onClick,
  isLoading
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)

  const data = useFragment(Fragment, query)

  const index = postData.content.findIndex(item => item.id === data.id)

  if (index === 0 || postData.content.length <= 3) {
    return <></>
  }

  return (
    <MenuItem
      onClick={onClick}
      isLoading={isLoading}
      text={<Trans>Move to First</Trans>}
      icon={DoubleArrowUp}
    />
  )
}
