import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaLikedPostsViewerFragment$key } from '@//:artifacts/MetaLikedPostsViewerFragment.graphql'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import LikedPostsRichObject from './LikedPostsRichObject/LikedPostsRichObject'
import ContainerLikedPosts from './ContainerLikedPosts/ContainerLikedPosts'

interface Props {
  viewerQuery: MetaLikedPostsViewerFragment$key | null
}

const ViewerFragment = graphql`
  fragment MetaLikedPostsViewerFragment on Account {
    ...ContainerLikedPostsViewerFragment
  }
`

export default function MetaLikedPosts (props: Props): JSX.Element {
  const {
    viewerQuery
  } = props

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <LikedPostsRichObject />
      <GlobalVideoManagerProvider>
        <ContainerLikedPosts viewerQuery={viewerData} />
      </GlobalVideoManagerProvider>
    </>
  )
}
