import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { PublicClubQuery } from '@//:artifacts/PublicClubQuery.graphql'
import { graphql } from 'react-relay'
import { Stack } from '@chakra-ui/react'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import ClubSuspendedStaffAlert from './ClubSuspendedStaffAlert/ClubSuspendedStaffAlert'
import AccountInformationBanner
  from '../../../../../common/components/AccountInformationBanner/AccountInformationBanner'
import PublicClubRichObject from '../../../../../common/rich-objects/slug/PublicClubRichObject/PublicClubRichObject'
import ClubFooterButtons from './ClubFooterButtons/ClubFooterButtons'
import ClubHeaderBanner from './ClubBanners/ClubHeaderBanner/ClubHeaderBanner'
import ClubJoinBanner from './ClubBanners/ClubJoinBanner/ClubJoinBanner'
import ClubSupportBanner from './ClubBanners/ClubSupportBanner/ClubSupportBanner'
import ClubPublicPosts from './ClubPublicPosts/ClubPublicPosts'
import PublicClubStructuredData
  from '../../../../../common/structured-data/slug/PublicClubStructuredData/PublicClubStructuredData'

interface Props {
  query: PreloadedQuery<PublicClubQuery>
}

const Query = graphql`
  query PublicClubQuery($slug: String!) {
    club(slug: $slug) {
      ...ClubSuspendedStaffAlertFragment
      ...ClubHeaderBannerFragment
      ...ClubFooterButtonsFragment
      ...ClubJoinBannerFragment
      ...ClubSupportBannerFragment
      ...ClubPublicPostsFragment
      ...PublicClubStructuredDataFragment
      ...PublicClubRichObjectFragment
    }
    viewer {
      ...AccountInformationBannerFragment
      ...ClubJoinBannerViewerFragment
      ...ClubSupportBannerViewerFragment
      ...ClubPublicPostsViewerFragment
    }
  }
`

export default function PublicClub (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<PublicClubQuery>(
    Query,
    props.query
  )

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  return (
    <>
      <PublicClubRichObject query={queryData.club} />
      <PublicClubStructuredData query={queryData.club} />
      <AccountInformationBanner query={queryData.viewer} />
      <ClubSuspendedStaffAlert query={queryData.club} />
      <Stack spacing={8}>
        <Stack spacing={1}>
          <ClubHeaderBanner query={queryData.club} />
          <ClubFooterButtons query={queryData.club} />
        </Stack>
        <Stack spacing={4}>
          <ClubJoinBanner clubQuery={queryData.club} viewerQuery={queryData.viewer} />
          <ClubSupportBanner clubQuery={queryData.club} viewerQuery={queryData.viewer} />
        </Stack>
        <ClubPublicPosts clubQuery={queryData.club} viewerQuery={queryData.viewer} />
      </Stack>
    </>
  )
}
