import { SupportPublicClubFragment$key } from '@//:artifacts/SupportPublicClubFragment.graphql'
import { SupportPublicClubViewerFragment$key } from '@//:artifacts/SupportPublicClubViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import ClubSupportBanner from './ClubSupportBanner/ClubSupportBanner'

interface Props {
  clubQuery: SupportPublicClubFragment$key
  viewerQuery: SupportPublicClubViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment SupportPublicClubFragment on Club {
    ...ClubSupportBannerFragment
  }
`

const ViewerFragment = graphql`
  fragment SupportPublicClubViewerFragment on Account {
    ...ClubSupportBannerViewerFragment
  }
`

export default function SupportPublicClub (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <ClubSupportBanner clubQuery={clubData} viewerQuery={viewerData} />
  )
}
