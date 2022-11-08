import { graphql, useFragment } from 'react-relay/hooks'
import type {
  ArrangeLastPostContentButtonFragment$key
} from '@//:artifacts/ArrangeLastPostContentButtonFragment.graphql'
import type {
  ArrangeLastPostContentButtonPostFragment$key
} from '@//:artifacts/ArrangeLastPostContentButtonPostFragment.graphql'
import { Trans } from '@lingui/macro'
import { DoubleArrowDown } from '@//:assets/icons'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'

interface Props {
  query: ArrangeLastPostContentButtonFragment$key
  postQuery: ArrangeLastPostContentButtonPostFragment$key
  onClick: () => void
  isLoading: boolean
}

const Fragment = graphql`
  fragment ArrangeLastPostContentButtonFragment on PostContent {
    id
  }
`

const PostFragment = graphql`
  fragment ArrangeLastPostContentButtonPostFragment on Post {
    id
    content {
      id
    }
  }
`

export default function ArrangeLastPostContentButton ({
  query,
  postQuery,
  onClick,
  isLoading
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)

  const data = useFragment(Fragment, query)

  const index = postData.content.findIndex(item => item.id === data.id)

  if (index === postData.content.length - 1 || postData.content.length <= 3) {
    return <></>
  }

  return (
    <MenuItem
      onClick={onClick}
      isLoading={isLoading}
      text={<Trans>Move to Last</Trans>}
      icon={DoubleArrowDown}
    />
  )
}
