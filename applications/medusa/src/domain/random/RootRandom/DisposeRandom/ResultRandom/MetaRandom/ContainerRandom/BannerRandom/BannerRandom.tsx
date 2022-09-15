import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { BannerRandomViewerFragment$key } from '@//:artifacts/BannerRandomViewerFragment.graphql'
import AccountInformationBanner from '@//:common/components/AccountInformationBanner/AccountInformationBanner'

interface Props {
  viewerQuery: BannerRandomViewerFragment$key | null
}

const ViewerFragment = graphql`
  fragment BannerRandomViewerFragment on Account {
    ...AccountInformationBannerFragment
  }
`

export default function BannerRandom (props: Props): JSX.Element {
  const {
    viewerQuery
  } = props

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <AccountInformationBanner query={viewerData} />
  )
}
