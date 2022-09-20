import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { SupportLinksPublicClubFragment$key } from '@//:artifacts/SupportLinksPublicClubFragment.graphql'
import { SupportLinksPublicClubViewerFragment$key } from '@//:artifacts/SupportLinksPublicClubViewerFragment.graphql'
import { Stack } from '@chakra-ui/react'
import ClubExternalLinks from './ClubExternalLinks/ClubExternalLinks'
import ClubFooterButtons from './ClubFooterButtons/ClubFooterButtons'
import ClubSupportBanner from './ClubSupportBanner/ClubSupportBanner'

interface Props {
  clubQuery: SupportLinksPublicClubFragment$key
  viewerQuery: SupportLinksPublicClubViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment SupportLinksPublicClubFragment on Club {
    ...ClubExternalLinksFragment
    ...ClubFooterButtonsFragment
    ...ClubSupportBannerFragment
  }
`

const ViewerFragment = graphql`
  fragment SupportLinksPublicClubViewerFragment on Account {
    ...ClubSupportBannerViewerFragment
  }
`

export default function SupportLinksPublicClub (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <Stack spacing={2}>
      <ClubExternalLinks clubQuery={clubData} />
      <Stack spacing={4}>
        <ClubFooterButtons query={clubData} />
        <ClubSupportBanner clubQuery={clubData} viewerQuery={viewerData} />
      </Stack>
    </Stack>
  )
}
