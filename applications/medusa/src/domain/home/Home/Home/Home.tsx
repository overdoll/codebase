import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { HomeQuery } from '@//:artifacts/HomeQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import PostsInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostsInfiniteScroll/PostsInfiniteScroll'
import { HStack } from '@chakra-ui/react'
import PostSearchButton
  from '@//:modules/content/Posts/components/PostNavigation/PostsSearch/components/PostSearchButton/PostSearchButton'
import PageFixedHeader from '@//:modules/content/PageLayout/Wrappers/PageFixedHeader/PageFixedHeader'
import FixedHeaderWrapper
  from '@//:modules/content/PageLayout/Wrappers/PageFixedHeader/FixedHeaderWrapper/FixedHeaderWrapper'
import LockedAccountTrigger from '../LockedAccount/LockedAccountTrigger/LockedAccountTrigger'
import NewAccountModal from '../NewAccountModal/NewAccountModal'

interface Props {
  query: PreloadedQuery<HomeQuery>
}

const Query = graphql`
  query HomeQuery @preloadable {
    ...HomeFragment
    viewer {
      ...PostsInfiniteScrollViewerFragment
      ...NewAccountModalFragment
    }
  }
`

const Fragment = graphql`
  fragment HomeFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
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
      <PageFixedHeader>
        <FixedHeaderWrapper>
          <HStack spacing={2} justify='flex-end'>
            <LockedAccountTrigger />
            <PostSearchButton routeTo='/search' />
          </HStack>
        </FixedHeaderWrapper>
      </PageFixedHeader>
      <GlobalVideoManagerProvider>
        <PostsInfiniteScroll
          hasNext={hasNext}
          isLoadingNext={isLoadingNext}
          loadNext={loadNext}
          query={data.posts}
          viewerQuery={queryData.viewer}
        />
      </GlobalVideoManagerProvider>
      <NewAccountModal query={queryData.viewer} />
    </>
  )
}
