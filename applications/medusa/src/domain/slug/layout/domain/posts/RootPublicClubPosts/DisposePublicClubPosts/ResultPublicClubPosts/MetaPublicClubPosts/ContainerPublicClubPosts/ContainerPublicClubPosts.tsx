import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import type { ContainerPublicClubPostsFragment$key } from '@//:artifacts/ContainerPublicClubPostsFragment.graphql'
import type {
  ContainerPublicClubPostsViewerFragment$key
} from '@//:artifacts/ContainerPublicClubPostsViewerFragment.graphql'
import ScrollPublicClubPosts from './ScrollPublicClubPosts/ScrollPublicClubPosts'
import { ContentContainer } from '@//:modules/content/PageLayout'

interface Props {
  clubQuery: ContainerPublicClubPostsFragment$key
  viewerQuery: ContainerPublicClubPostsViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ContainerPublicClubPostsFragment on Club {
    ...ScrollPublicClubPostsFragment
  }
`

const ViewerFragment = graphql`
  fragment ContainerPublicClubPostsViewerFragment on Account {
    ...ScrollPublicClubPostsAccountFragment
  }
`

export default function ContainerPublicClubPosts (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <ContentContainer>
      <ScrollPublicClubPosts accountQuery={viewerData} clubQuery={clubData} />
    </ContentContainer>
  )
}
