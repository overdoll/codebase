import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { HeaderPublicClubFragment$key } from '@//:artifacts/HeaderPublicClubFragment.graphql'
import { HeaderPublicClubViewerFragment$key } from '@//:artifacts/HeaderPublicClubViewerFragment.graphql'
import { Stack } from '@chakra-ui/react'
import SupportLinksPublicClub from './SupportLinksPublicClub/SupportLinksPublicClub'
import JoinBannerPublicClub from './JoinBannerPublicClub/JoinBannerPublicClub'
import HomeRedirectPrompt from '@//:common/components/HomeRedirectPrompt/HomeRedirectPrompt'

interface Props {
  clubQuery: HeaderPublicClubFragment$key
  viewerQuery: HeaderPublicClubViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment HeaderPublicClubFragment on Club {
    ...SupportLinksPublicClubFragment
    ...JoinBannerPublicClubFragment
  }
`

const ViewerFragment = graphql`
  fragment HeaderPublicClubViewerFragment on Account {
    ...SupportLinksPublicClubViewerFragment
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
      <SupportLinksPublicClub clubQuery={clubData} viewerQuery={viewerData} />
    </Stack>
  )
}
