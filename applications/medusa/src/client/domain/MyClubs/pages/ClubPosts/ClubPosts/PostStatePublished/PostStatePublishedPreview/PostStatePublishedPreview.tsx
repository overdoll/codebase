import { graphql } from 'react-relay/hooks'
import type { PostStatePublishedPreviewFragment$key } from '@//:artifacts/PostStatePublishedPreviewFragment.graphql'
import { useFragment } from 'react-relay'
import PostGalleryContent from '../../../../../../../components/Posts/PostGalleryContent/PostGalleryContent'
import { Box } from '@chakra-ui/react'
import { useHistory } from '@//:modules/routing'

interface Props {
  query: PostStatePublishedPreviewFragment$key
}

// TODO this is a placeholder - we probably want to give
// TODO more information and control over the post here

const Fragment = graphql`
  fragment PostStatePublishedPreviewFragment on Post {
    reference
    ...PostGalleryContentFragment
  }
`

export default function PostStatePublishedPreview ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const history = useHistory()

  const gotoPublicPage = (): void => {
    history.push(`/post/${data.reference}`)
  }

  return (
    <Box onClick={gotoPublicPage}>
      <PostGalleryContent query={data} />
    </Box>
  )
}
