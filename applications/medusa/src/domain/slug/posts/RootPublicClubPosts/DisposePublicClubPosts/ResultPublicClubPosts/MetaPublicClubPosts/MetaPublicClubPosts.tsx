import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import PublicClubPostsRichObject from './PublicClubPostsRichObject/PublicClubPostsRichObject'
import PublicClubPostsStructuredData from './PublicClubPostsStructuredData/PublicClubPostsStructuredData'
import type { MetaPublicClubPostsFragment$key } from '@//:artifacts/MetaPublicClubPostsFragment.graphql'
import type { MetaPublicClubPostsViewerFragment$key } from '@//:artifacts/MetaPublicClubPostsViewerFragment.graphql'
import ContainerPublicClubPosts from './ContainerPublicClubPosts/ContainerPublicClubPosts'

interface Props {
  clubQuery: MetaPublicClubPostsFragment$key
  viewerQuery: MetaPublicClubPostsViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment MetaPublicClubPostsFragment on Club {
    ...PublicClubPostsRichObjectFragment
    ...PublicClubPostsStructuredDataFragment
    ...ContainerPublicClubPostsFragment
  }
`

const ViewerFragment = graphql`
  fragment MetaPublicClubPostsViewerFragment on Account {
    ...ContainerPublicClubPostsViewerFragment
  }
`

export default function MetaPublicClubPosts (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <PublicClubPostsRichObject clubQuery={clubData} />
      <PublicClubPostsStructuredData query={clubData} />
      <GlobalVideoManagerProvider>
        <ContainerPublicClubPosts clubQuery={clubData} viewerQuery={viewerData} />
      </GlobalVideoManagerProvider>
    </>
  )
}
