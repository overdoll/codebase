import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { TagsPublicPostFragment$key } from '@//:artifacts/TagsPublicPostFragment.graphql'
import PostPreviewCharacters from './PostPreviewCharacters/PostPreviewCharacters'
import { Stack } from '@chakra-ui/react'
import PageHeader from '@//:modules/content/PageLayout/Display/components/PageHeader/PageHeader'
import { Trans } from '@lingui/macro'
import { CategoryIdentifier } from '@//:assets/icons'
import PostPreviewCategories from './PostPreviewCategories/PostPreviewCategories'

interface Props {
  postQuery: TagsPublicPostFragment$key
}

const PostFragment = graphql`
  fragment TagsPublicPostFragment on Post {
    ...PostPreviewCharactersFragment
    ...PostPreviewCategoriesFragment
  }
`
export default function TagsPublicPost (props: Props): JSX.Element {
  const {
    postQuery
  } = props

  const postData = useFragment(PostFragment, postQuery)

  return (
    <Stack spacing={2}>
      <PageHeader icon={CategoryIdentifier} title={<Trans>Featured in this post</Trans>} />
      <PostPreviewCharacters postQuery={postData} />
      <PostPreviewCategories postQuery={postData} />
    </Stack>

  )
}
