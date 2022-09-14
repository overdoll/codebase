import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { BannerPublicClubFragment$key } from '@//:artifacts/BannerPublicClubFragment.graphql'
import { BannerPublicClubViewerFragment$key } from '@//:artifacts/BannerPublicClubViewerFragment.graphql'
import AccountInformationBanner from '@//:common/components/AccountInformationBanner/AccountInformationBanner'
import ClubSuspendedStaffAlert from './ClubSuspendedStaffAlert/ClubSuspendedStaffAlert'

interface Props {
  clubQuery: BannerPublicClubFragment$key
  viewerQuery: BannerPublicClubViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment BannerPublicClubFragment on Club {
    ...ClubSuspendedStaffAlertFragment
  }
`

const ViewerFragment = graphql`
  fragment BannerPublicClubViewerFragment on Account {
    ...AccountInformationBannerFragment
  }
`

export default function BannerPublicClub (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <AccountInformationBanner query={viewerData} />
      <ClubSuspendedStaffAlert query={clubData} />
    </>
  )
}
