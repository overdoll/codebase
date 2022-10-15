import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { HeaderPublicClubFragment$key } from '@//:artifacts/HeaderPublicClubFragment.graphql'
import { HeaderPublicClubViewerFragment$key } from '@//:artifacts/HeaderPublicClubViewerFragment.graphql'
import { Stack } from '@chakra-ui/react'
import JoinBannerPublicClub from './JoinBannerPublicClub/JoinBannerPublicClub'
import ClubExternalLinks from './ClubExternalLinks/ClubExternalLinks'
import ClubFooterButtons from './ClubFooterButtons/ClubFooterButtons'

interface Props {
  clubQuery: HeaderPublicClubFragment$key
  viewerQuery: HeaderPublicClubViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment HeaderPublicClubFragment on Club {
    ...ClubExternalLinksFragment
    ...JoinBannerPublicClubFragment
    ...ClubFooterButtonsFragment
  }
`

const ViewerFragment = graphql`
  fragment HeaderPublicClubViewerFragment on Account {
    ...JoinBannerPublicClubViewerFragment
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
    <Stack spacing={2}>
      <JoinBannerPublicClub clubQuery={clubData} viewerQuery={viewerData} />
      <ClubExternalLinks clubQuery={clubData} />
      <ClubFooterButtons query={clubData} />
    </Stack>
  )
}
