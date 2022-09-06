import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { RandomQuery } from '@//:artifacts/RandomQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import AccountInformationBanner from '../../../../common/components/AccountInformationBanner/AccountInformationBanner'
import SearchButton from '../../../../common/components/PageHeader/SearchButton/SearchButton'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/FullSimplePost/FullSimplePost'
import PlatformPromoteAlert from '@//:common/components/PlatformPromoteAlert/PlatformPromoteAlert'

interface Props {
  query: PreloadedQuery<RandomQuery>
}

const Query = graphql`
  query RandomQuery($seed: String) @preloadable {
    ...RandomFragment
    viewer {
      ...AccountInformationBannerFragment
      ...FullSimplePostViewerFragment
    }
  }
`

const Fragment = graphql`
  fragment RandomFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "RandomPostsPaginationQuery" ) {
    postsFeed (first: $first, after: $after, seed: $seed)
    @connection (key: "RandomPosts_postsFeed") {
      edges {
        node {
          ...FullSimplePostFragment
        }
      }
      ...PostInfiniteScrollFragment
    }
  }
`

export default function Random (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<RandomQuery>(
    Query,
    props.query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<RandomQuery, any>(
    Fragment,
    queryData
  )

  return (
    <>
      <AccountInformationBanner query={queryData?.viewer} />
      <Stack spacing={8}>
        <HStack spacing={2} justify='space-between'>
          <Heading color='gray.00' fontSize='2xl'>
            <Trans>Random Posts</Trans>
          </Heading>
          <SearchButton />
        </HStack>
        <GlobalVideoManagerProvider>
          <PostInfiniteScroll
            query={data.postsFeed}
            hasNext={hasNext}
            loadNext={loadNext}
            isLoadingNext={isLoadingNext}
            endOfTree={<PlatformPromoteAlert />}
          >
            {({ index }) => (
              <FullSimplePost
                query={data.postsFeed.edges[index].node}
                viewerQuery={queryData.viewer}
              />
            )}
          </PostInfiniteScroll>
        </GlobalVideoManagerProvider>
      </Stack>
    </>
  )
}
