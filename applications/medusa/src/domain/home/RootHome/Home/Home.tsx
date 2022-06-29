import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { HomeQuery } from '@//:artifacts/HomeQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import PostsInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostsInfiniteScroll/PostsInfiniteScroll'
import { Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import AccountInformationBanner from '../../../../common/components/AccountInformationBanner/AccountInformationBanner'
import CurationProfileAlert from '../CurationProfileAlert/CurationProfileAlert'
import PageHeader from '../../../../common/components/PageHeader/PageHeader'

interface Props {
  query: PreloadedQuery<HomeQuery>
}

const Query = graphql`
  query HomeQuery @preloadable {
    ...HomeFragment
    viewer {
      ...PostsInfiniteScrollViewerFragment
      ...CurationProfileAlertFragment
      ...AccountInformationBannerFragment
    }
  }
`

const Fragment = graphql`
  fragment HomeFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 9}
    after: {type: String}
  )
  @refetchable(queryName: "HomePostsPaginationQuery" ) {
    postsFeed (first: $first, after: $after)
    @connection (key: "HomePosts_postsFeed") {
      edges {
        __typename
      }
      ...PostsInfiniteScrollFragment
    }
  }
`

export default function Home (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<HomeQuery>(
    Query,
    props.query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<HomeQuery, any>(
    Fragment,
    queryData
  )

  return (
    <>
      <AccountInformationBanner query={queryData?.viewer} />
      <CurationProfileAlert query={queryData?.viewer} />
      <Stack spacing={8}>
        <PageHeader title={<Trans>Home</Trans>} hasSearch />
        <GlobalVideoManagerProvider>
          <PostsInfiniteScroll
            hasNext={hasNext}
            isLoadingNext={isLoadingNext}
            loadNext={loadNext}
            query={data.postsFeed}
            viewerQuery={queryData.viewer}
          />
        </GlobalVideoManagerProvider>
      </Stack>
    </>
  )
}
