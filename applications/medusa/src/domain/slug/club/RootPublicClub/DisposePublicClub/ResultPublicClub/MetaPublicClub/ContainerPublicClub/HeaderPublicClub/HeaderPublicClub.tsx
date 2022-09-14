import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { HeaderPublicClubFragment$key } from '@//:artifacts/HeaderPublicClubFragment.graphql'
import { HeaderPublicClubViewerFragment$key } from '@//:artifacts/HeaderPublicClubViewerFragment.graphql'
import { Stack } from '@chakra-ui/react'
import ClubHeaderBanner from './ClubBanners/ClubHeaderBanner/ClubHeaderBanner'
import PostClubLinks from '@//:modules/content/Posts/components/PostData/PostClubLinks/PostClubLinks'
import ClubFooterButtons from './ClubFooterButtons/ClubFooterButtons'
import ClubJoinBanner from './ClubBanners/ClubJoinBanner/ClubJoinBanner'
import ClubSupportBanner from './ClubBanners/ClubSupportBanner/ClubSupportBanner'

interface Props {
  clubQuery: HeaderPublicClubFragment$key
  viewerQuery: HeaderPublicClubViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment HeaderPublicClubFragment on Club {
    ...ClubHeaderBannerFragment
    ...PostClubLinksFragment
    ...ClubFooterButtonsFragment
    ...ClubJoinBannerFragment
    ...ClubSupportBannerFragment
  }
`

const ViewerFragment = graphql`
  fragment HeaderPublicClubViewerFragment on Account {
    ...ClubJoinBannerViewerFragment
    ...ClubSupportBannerViewerFragment
  }
`

export default function HeaderPublicClub (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <Stack spacing={8}>
      <Stack spacing={1}>
        <ClubHeaderBanner query={clubData} />
        <PostClubLinks query={clubData} />
        <ClubFooterButtons query={clubData} />
      </Stack>
      <Stack spacing={4}>
        <ClubJoinBanner clubQuery={clubData} viewerQuery={viewerData} />
        <ClubSupportBanner clubQuery={clubData} viewerQuery={viewerData} />
      </Stack>
    </Stack>
  )
}
