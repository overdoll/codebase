import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { SearchCategoryQuery } from '@//:artifacts/SearchCategoryQuery.graphql'
import { NotFoundCategory } from '@//:modules/content/Placeholder'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import { usePaginationFragment } from 'react-relay'
import { Trans } from '@lingui/macro'
import SearchSummary from '../../../../../common/components/PageHeader/SearchSummary/SearchSummary'
import SearchButton from '../../../../../common/components/PageHeader/SearchButton/SearchButton'
import SearchCategoryRecommendations from './SearchCategoryRecommendations/SearchCategoryRecommendations'
import SearchCategoryRichObject
  from '../../../../../common/rich-objects/search/SearchCategoryRichObject/SearchCategoryRichObject'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostsInfiniteScroll/FullSimplePost/FullSimplePost'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'

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
      ...FullSimplePostViewerFragment
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
        node {
          ...FullSimplePostFragment
        }
      }
      ...PostInfiniteScrollFragment
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
            <Heading color='gray.00' fontSize='2xl'>
              {queryData.category.title}
            </Heading>
            <SearchButton />
          </HStack>
        </Stack>
        <GlobalVideoManagerProvider>
          <PostInfiniteScroll
            query={data.posts}
            hasNext={hasNext}
            loadNext={loadNext}
            isLoadingNext={isLoadingNext}
          >
            {({ index }) => (
              <FullSimplePost
                query={data.posts.edges[index].node}
                viewerQuery={queryData.viewer}
              />
            )}
          </PostInfiniteScroll>
        </GlobalVideoManagerProvider>
      </Stack>
    </>
  )
}
