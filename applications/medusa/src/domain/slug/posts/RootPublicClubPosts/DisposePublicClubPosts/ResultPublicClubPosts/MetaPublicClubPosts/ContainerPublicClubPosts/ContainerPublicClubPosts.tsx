import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import type { ContainerPublicClubPostsFragment$key } from '@//:artifacts/ContainerPublicClubPostsFragment.graphql'
import type {
  ContainerPublicClubPostsViewerFragment$key
} from '@//:artifacts/ContainerPublicClubPostsViewerFragment.graphql'
import BannerPublicClubPosts from './BannerPublicClubPosts/BannerPublicClubPosts'
import HeaderPublicClubPosts from './HeaderPublicClubPosts/HeaderPublicClubPosts'
import ScrollPublicClubPosts from './ScrollPublicClubPosts/ScrollPublicClubPosts'
import { BannerContainer, ContentContainer } from '@//:modules/content/PageLayout'
import { Stack } from '@chakra-ui/react'

interface Props {
  clubQuery: ContainerPublicClubPostsFragment$key
  viewerQuery: ContainerPublicClubPostsViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ContainerPublicClubPostsFragment on Club {
    ...HeaderPublicClubPostsFragment
    ...ScrollPublicClubPostsFragment
  }
`

const ViewerFragment = graphql`
  fragment ContainerPublicClubPostsViewerFragment on Account {
    ...BannerPublicClubPostsViewerFragment
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
    <>
      <BannerContainer pt={2}>
        <BannerPublicClubPosts viewerQuery={viewerData} />
      </BannerContainer>
      <ContentContainer>
        <Stack spacing={16}>
          <HeaderPublicClubPosts clubQuery={clubData} />
          <ScrollPublicClubPosts accountQuery={viewerData} clubQuery={clubData} />
        </Stack>
      </ContentContainer>
    </>
  )
}
