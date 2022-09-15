import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { BannerLikedPostsViewerFragment$key } from '@//:artifacts/BannerLikedPostsViewerFragment.graphql'
import AccountInformationBanner from '@//:common/components/AccountInformationBanner/AccountInformationBanner'

interface Props {
  viewerQuery: BannerLikedPostsViewerFragment$key | null
}

const ViewerFragment = graphql`
  fragment BannerLikedPostsViewerFragment on Account {
    ...AccountInformationBannerFragment
  }
`

export default function BannerLikedPosts (props: Props): JSX.Element {
  const {
    viewerQuery
  } = props

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <AccountInformationBanner query={viewerData} />
  )
}
