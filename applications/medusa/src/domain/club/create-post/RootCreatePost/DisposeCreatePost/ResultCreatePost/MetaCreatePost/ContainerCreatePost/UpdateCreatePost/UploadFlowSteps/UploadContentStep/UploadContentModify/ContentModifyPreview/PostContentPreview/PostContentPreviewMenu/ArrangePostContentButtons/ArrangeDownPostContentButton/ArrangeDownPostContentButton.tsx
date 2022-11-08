import { graphql, useFragment } from 'react-relay/hooks'
import type {
  ArrangeDownPostContentButtonFragment$key
} from '@//:artifacts/ArrangeDownPostContentButtonFragment.graphql'
import type {
  ArrangeDownPostContentButtonPostFragment$key
} from '@//:artifacts/ArrangeDownPostContentButtonPostFragment.graphql'
import { Trans } from '@lingui/macro'
import { ArrowButtonDown } from '@//:assets/icons'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'

interface Props {
  query: ArrangeDownPostContentButtonFragment$key
  postQuery: ArrangeDownPostContentButtonPostFragment$key
  onClick: () => void
  isLoading: boolean
}

const Fragment = graphql`
  fragment ArrangeDownPostContentButtonFragment on PostContent {
    id
  }
`

const PostFragment = graphql`
  fragment ArrangeDownPostContentButtonPostFragment on Post {
    id
    content {
      id
    }
  }
`

export default function ArrangeDownPostContentButton ({
  query,
  postQuery,
  onClick,
  isLoading
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)

  const data = useFragment(Fragment, query)

  const index = postData.content.findIndex(item => item.id === data.id)

  if (index + 1 === postData.content.length || postData.content.length < 2) {
    return <></>
  }

  return (
    <MenuItem
      onClick={onClick}
      isLoading={isLoading}
      text={<Trans>Move Down</Trans>}
      icon={ArrowButtonDown}
    />
  )
}
