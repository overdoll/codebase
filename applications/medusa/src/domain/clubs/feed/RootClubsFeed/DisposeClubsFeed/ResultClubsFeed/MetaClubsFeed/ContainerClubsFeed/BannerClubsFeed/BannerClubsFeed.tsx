import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { BannerClubsFeedViewerFragment$key } from '@//:artifacts/BannerClubsFeedViewerFragment.graphql'
import AccountInformationBanner from '@//:common/components/AccountInformationBanner/AccountInformationBanner'

interface Props {
  viewerQuery: BannerClubsFeedViewerFragment$key | null
}

const ViewerFragment = graphql`
  fragment BannerClubsFeedViewerFragment on Account {
    ...AccountInformationBannerFragment
  }
`

export default function BannerClubsFeed (props: Props): JSX.Element {
  const {
    viewerQuery
  } = props

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <AccountInformationBanner query={viewerData} />
  )
}
