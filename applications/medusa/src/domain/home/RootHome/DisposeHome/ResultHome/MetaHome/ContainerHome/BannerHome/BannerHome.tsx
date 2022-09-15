import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { BannerHomeViewerFragment$key } from '@//:artifacts/BannerHomeViewerFragment.graphql'
import AccountInformationBanner from '@//:common/components/AccountInformationBanner/AccountInformationBanner'
import CurationProfileAlert from './CurationProfileAlert/CurationProfileAlert'

interface Props {
  viewerQuery: BannerHomeViewerFragment$key | null
}

const ViewerFragment = graphql`
  fragment BannerHomeViewerFragment on Account {
    ...AccountInformationBannerFragment
    ...CurationProfileAlertFragment
  }
`

export default function BannerHome (props: Props): JSX.Element {
  const {
    viewerQuery
  } = props

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <AccountInformationBanner query={viewerData} />
      <CurationProfileAlert query={viewerData} />
    </>
  )
}
