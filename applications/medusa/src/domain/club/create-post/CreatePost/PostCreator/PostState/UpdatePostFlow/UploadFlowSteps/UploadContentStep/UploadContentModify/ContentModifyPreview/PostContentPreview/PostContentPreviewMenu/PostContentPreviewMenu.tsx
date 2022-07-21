import { graphql, useFragment } from 'react-relay/hooks'
import type { PostContentPreviewMenuFragment$key } from '@//:artifacts/PostContentPreviewMenuFragment.graphql'
import type { PostContentPreviewMenuPostFragment$key } from '@//:artifacts/PostContentPreviewMenuPostFragment.graphql'
import RemovePostContentButton from './RemovePostContentButton/RemovePostContentButton'
import { Menu } from '@//:modules/content/ThemeComponents/Menu/Menu'
import ArrangeUpPostContentButton from './ArrangeUpPostContentButton/ArrangeUpPostContentButton'
import ArrangeDownPostContentButton from './ArrangeDownPostContentButton/ArrangeDownPostContentButton'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

interface Props {
  query: PostContentPreviewMenuFragment$key
  postQuery: PostContentPreviewMenuPostFragment$key
}

const Fragment = graphql`
  fragment PostContentPreviewMenuFragment on PostContent {
    ...ArrangeUpPostContentButtonFragment
    ...RemovePostContentButtonFragment
    ...ArrangeDownPostContentButtonFragment
  }
`

const PostFragment = graphql`
  fragment PostContentPreviewMenuPostFragment on Post {
    ...ArrangeUpPostContentButtonPostFragment
    ...RemovePostContentButtonPostFragment
    ...ArrangeDownPostContentButtonPostFragment
  }
`

export default function PostContentPreviewMenu ({
  query,
  postQuery
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)
  const postData = useFragment(PostFragment, postQuery)

  const { i18n } = useLingui()

  return (
    <Menu
      aria-label={i18n._(t`Content Menu`)}
    >
      <ArrangeUpPostContentButton query={data} postQuery={postData} />
      <ArrangeDownPostContentButton query={data} postQuery={postData} />
      <RemovePostContentButton query={data} postQuery={postData} />
    </Menu>
  )
}
