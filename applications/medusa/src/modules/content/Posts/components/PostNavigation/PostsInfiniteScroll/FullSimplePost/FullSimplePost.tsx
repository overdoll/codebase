import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { FullSimplePostFragment$key } from '@//:artifacts/FullSimplePostFragment.graphql'
import { FullSimplePostViewerFragment$key } from '@//:artifacts/FullSimplePostViewerFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PostGalleryPublicSimple } from '../../../../index'
import PostFooterButtons from '../../../PostInteraction/PostFooterButtons/PostFooterButtons'
import PostPublicHeader from '../../../PostInteraction/PostHeaders/PostPublicHeader/PostPublicHeader'
import { useMemo } from 'react'

interface Props {
  query: FullSimplePostFragment$key
  viewerQuery: FullSimplePostViewerFragment$key | null
  hideOverflow?: boolean
}

const PostFragment = graphql`
  fragment FullSimplePostFragment on Post {
    id
    ...PostGalleryPublicSimpleFragment
    ...PostFooterButtonsFragment
    ...PostPublicHeaderFragment
  }
`

const ViewerFragment = graphql`
  fragment FullSimplePostViewerFragment on Account {
    ...PostGalleryPublicSimpleViewerFragment
    ...PostFooterButtonsViewerFragment
    ...PostPublicHeaderViewerFragment
  }
`

export default function FullSimplePost ({
  query,
  viewerQuery,
  hideOverflow = false
}: Props): JSX.Element {
  const data = useFragment<FullSimplePostFragment$key>(PostFragment, query)
  const viewerData = useFragment<FullSimplePostViewerFragment$key>(ViewerFragment, viewerQuery)

  const PostMemo = useMemo(() => (<PostGalleryPublicSimple hideOverflow={hideOverflow} postQuery={data} viewerQuery={viewerData} />), [data.id])

  return (
    <Stack spacing={2}>
      <PostPublicHeader descriptionProps={{ noOfLines: 1 }} postQuery={data} viewerQuery={viewerData} />
      {PostMemo}
      <PostFooterButtons postQuery={data} viewerQuery={viewerData} />
    </Stack>
  )
}
