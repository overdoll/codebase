import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ClubsFeedQuery } from '@//:artifacts/ClubsFeedQuery.graphql'
import { graphql } from 'react-relay'
import ClubPostsFeed from './ClubPostsFeed/ClubPostsFeed'
import { Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import AccountInformationBanner
  from '../../../../../common/components/AccountInformationBanner/AccountInformationBanner'
import PageHeader from '../../../../../common/components/PageHeader/PageHeader'

interface Props {
  query: PreloadedQuery<ClubsFeedQuery>
}

const Query = graphql`
  query ClubsFeedQuery {
    viewer {
      ...ClubPostsFeedFragment
      ...ClubPostsFeedViewerFragment
      ...AccountInformationBannerFragment
    }
  }
`

export default function ClubsFeed (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubsFeedQuery>(
    Query,
    props.query
  )

  return (
    <>
      <AccountInformationBanner query={queryData.viewer} />
      <Stack spacing={8}>
        <PageHeader title={<Trans>Your Clubs Feed</Trans>} hasSearch hasDiscover />
        <ClubPostsFeed
          query={queryData.viewer}
          viewerQuery={queryData.viewer}
        />
      </Stack>
    </>
  )
}
