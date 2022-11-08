import { graphql, useFragment } from 'react-relay/hooks'
import type { PostContentPreviewMenuFragment$key } from '@//:artifacts/PostContentPreviewMenuFragment.graphql'
import type { PostContentPreviewMenuPostFragment$key } from '@//:artifacts/PostContentPreviewMenuPostFragment.graphql'
import RemovePostContentButton from './RemovePostContentButton/RemovePostContentButton'
import { Menu } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import ArrangePostContentButtons from './ArrangePostContentButtons/ArrangePostContentButtons'
import { Box } from '@chakra-ui/react'

interface Props {
  query: PostContentPreviewMenuFragment$key
  postQuery: PostContentPreviewMenuPostFragment$key
}

const Fragment = graphql`
  fragment PostContentPreviewMenuFragment on PostContent {
    ...ArrangePostContentButtonsFragment
    ...RemovePostContentButtonFragment
  }
`

const PostFragment = graphql`
  fragment PostContentPreviewMenuPostFragment on Post {
    ...ArrangePostContentButtonsPostFragment
    ...RemovePostContentButtonPostFragment
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
    <Box position='relative'>
      <Menu
        aria-label={i18n._(t`Content Menu`)}
      >
        <ArrangePostContentButtons query={data} postQuery={postData} />
        <RemovePostContentButton query={data} postQuery={postData} />
      </Menu>
    </Box>

  )
}
