import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { SearchCategoryQuery } from '@//:artifacts/SearchCategoryQuery.graphql'
import { NotFoundCategory } from '@//:modules/content/Placeholder'
import { HStack, Stack } from '@chakra-ui/react'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import PostsInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostsInfiniteScroll/PostsInfiniteScroll'
import { usePaginationFragment } from 'react-relay'
import { Trans } from '@lingui/macro'
import SearchSummary from '../../../../../common/components/PageHeader/SearchSummary/SearchSummary'
import PostOrderButton from '../../../../../common/components/PageHeader/PostOrderButton/PostOrderButton'
import SearchButton from '../../../../../common/components/PageHeader/SearchButton/SearchButton'
import SearchCategoryRecommendations from './SearchCategoryRecommendations/SearchCategoryRecommendations'
import SearchCategoryRichObject
  from '../../../../../common/rich-objects/search/SearchCategoryRichObject/SearchCategoryRichObject'

interface Props {
  query: PreloadedQuery<SearchCategoryQuery>
}

const Query = graphql`
  query SearchCategoryQuery(
    $sortBy: PostsSort!,
    $categorySlug: String!
  ) @preloadable {
    category(slug: $categorySlug) {
      title
      totalLikes
      totalPosts
      ...SearchCategoryFragment
      ...SearchCategoryRichObjectFragment
    }
    viewer {
      ...PostsInfiniteScrollViewerFragment
    }
    ...SearchCategoryRecommendationsFragment
  }
`

const Fragment = graphql`
  fragment SearchCategoryFragment on Category
  @argumentDefinitions(
    first: {type: Int, defaultValue: 9}
    after: {type: String}
  )
  @refetchable(queryName: "SearchCategoryPostsPaginationQuery" ) {
    posts (
      first: $first,
      after: $after,
      sortBy: $sortBy,
    )
    @connection (key: "SearchCategoryPosts_posts") {
      edges {
        __typename
      }
      ...PostsInfiniteScrollFragment
    }
  }
`

export default function SearchCategory ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<SearchCategoryQuery>(
    Query,
    query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<SearchCategoryQuery, any>(
    Fragment,
    queryData.category
  )

  if (queryData?.category == null) {
    return <NotFoundCategory />
  }

  return (
    <>
      <SearchCategoryRichObject query={queryData.category} />
      <Stack spacing={8}>
        <Stack spacing={2}>
          <SearchSummary
            title={queryData.category.title}
            type={<Trans>Category</Trans>}
            totalPosts={queryData.category.totalPosts}
            totalLikes={queryData.category.totalLikes}
          />
          <SearchCategoryRecommendations query={queryData} />
          <HStack justify='space-between' spacing={2}>
            <PostOrderButton />
            <SearchButton />
          </HStack>
        </Stack>
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
    </>
  )
}
