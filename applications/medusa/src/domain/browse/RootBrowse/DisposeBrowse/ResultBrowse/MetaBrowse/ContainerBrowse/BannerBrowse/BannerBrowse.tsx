import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { BannerBrowseViewerFragment$key } from '@//:artifacts/BannerBrowseViewerFragment.graphql'
import AccountInformationBanner from '@//:common/components/AccountInformationBanner/AccountInformationBanner'

interface Props {
  viewerQuery: BannerBrowseViewerFragment$key | null
}

const ViewerFragment = graphql`
  fragment BannerBrowseViewerFragment on Account {
    ...AccountInformationBannerFragment
  }
`

export default function BannerBrowse (props: Props): JSX.Element {
  const {
    viewerQuery
  } = props

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <AccountInformationBanner query={viewerData} />
  )
}
