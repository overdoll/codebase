import { graphql, useFragment } from 'react-relay/hooks'
import type { BannerPublicClubPostsViewerFragment$key } from '@//:artifacts/BannerPublicClubPostsViewerFragment.graphql'
import React from 'react'
import AccountInformationBanner from '@//:common/components/AccountInformationBanner/AccountInformationBanner'

interface Props {
  viewerQuery: BannerPublicClubPostsViewerFragment$key | null
}

const ViewerFragment = graphql`
  fragment BannerPublicClubPostsViewerFragment on Account {
    ...AccountInformationBannerFragment
  }
`

export default function BannerPublicClubPosts (props: Props): JSX.Element {
  const {
    viewerQuery
  } = props

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <AccountInformationBanner query={viewerData} />
  )
}
