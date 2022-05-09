import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { HomeQuery } from '@//:artifacts/HomeQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import PostsInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostsInfiniteScroll/PostsInfiniteScroll'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import PostSearchButton
  from '@//:modules/content/Posts/components/PostNavigation/PostsSearch/components/PostSearchButton/PostSearchButton'
import NewAccountModal from '../NewAccountModal/NewAccountModal'
import { Trans } from '@lingui/macro'
import AccountInformationBanner from '../../../../common/components/AccountInformationBanner/AccountInformationBanner'

interface Props {
  query: PreloadedQuery<HomeQuery>
}

const Query = graphql`
  query HomeQuery @preloadable {
    ...HomeFragment
    viewer {
      ...PostsInfiniteScrollViewerFragment
      ...NewAccountModalFragment
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
    posts (first: $first, after: $after, sortBy: TOP)
    @connection (key: "HomePosts_posts") {
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
      <Stack spacing={8}>
        <HStack spacing={2} justify='space-between'>
          <Heading color='gray.00' fontSize='2xl'>
            <Trans>
              Home
            </Trans>
          </Heading>
          <PostSearchButton routeTo='/search' />
        </HStack>
        <GlobalVideoManagerProvider>
          <PostsInfiniteScroll
            hasNext={hasNext}
            isLoadingNext={isLoadingNext}
            loadNext={loadNext}
            query={data.posts}
            viewerQuery={queryData.viewer}
          />
        </GlobalVideoManagerProvider>
      </Stack>
      <NewAccountModal query={queryData.viewer} />
    </>
  )
}
