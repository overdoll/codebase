import { Helmet } from 'react-helmet-async'
import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { SearchQuery as SearchQueryType } from '@//:artifacts/SearchQuery.graphql'
import SearchQuery from '@//:artifacts/SearchQuery.graphql'
import Search from './Search/Search'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import useGeneralSearchArguments from '@//:modules/content/Posts/components/PostNavigation/PostsSearch/support/useGeneralSearchArguments'
import { PostOrderButton, PostSearchButton } from '@//:modules/content/Posts/components/PostNavigation/PostsSearch'
import PageFixedHeader from '@//:modules/content/PageLayout/Wrappers/PageFixedHeader/PageFixedHeader'
import PageInfiniteScrollWrapper
  from '@//:modules/content/PageLayout/Wrappers/PageInfiniteScrollWrapper/PageInfiniteScrollWrapper'
import FixedHeaderWrapper from '@//:modules/content/PageLayout/Wrappers/PageFixedHeader/FixedHeaderWrapper/FixedHeaderWrapper'
import { Flex, HStack } from '@chakra-ui/react'
import LockedAccountTrigger from '../../home/Home/LockedAccount/LockedAccountTrigger/LockedAccountTrigger'

interface Props {
  prepared: {
    query: PreloadedQuery<SearchQueryType>
  }
}

export default function RootSearch (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    SearchQuery,
    props.prepared.query
  )

  useGeneralSearchArguments((params) => loadQuery(params))

  return (
    <>
      <Helmet>
        <title>
          Search :: overdoll.com
        </title>
      </Helmet>
      <PageFixedHeader>
        <FixedHeaderWrapper>
          <Flex justify='space-between'>
            <PostOrderButton />
            <HStack spacing={2}>
              <LockedAccountTrigger />
              <PostSearchButton routeTo='/search' />
            </HStack>
          </Flex>
        </FixedHeaderWrapper>
      </PageFixedHeader>
      <PageInfiniteScrollWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({
          sortBy: 'TOP'
        })}
        >
          <Suspense fallback={<SkeletonPost />}>
            <Search query={queryRef as PreloadedQuery<SearchQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageInfiniteScrollWrapper>
    </>
  )
}
