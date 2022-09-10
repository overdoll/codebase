import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { SearchCategoryQuery } from '@//:artifacts/SearchCategoryQuery.graphql'
import { NotFoundCategory } from '@//:modules/content/Placeholder'
import { HStack, Stack } from '@chakra-ui/react'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import { usePaginationFragment } from 'react-relay'
import { Trans } from '@lingui/macro'
import SearchSummary from '../../../../../common/components/PageHeader/SearchSummary/SearchSummary'
import SearchButton from '../../../../../common/components/PageHeader/SearchButton/SearchButton'
import SearchCategoryRecommendations from './SearchCategoryRecommendations/SearchCategoryRecommendations'
import SearchCategoryRichObject
  from '../../../../../common/rich-objects/search/SearchCategoryRichObject/SearchCategoryRichObject'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/FullSimplePost/FullSimplePost'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'
import PlatformPromoteAlert from '@//:common/components/PlatformPromoteAlert/PlatformPromoteAlert'
import SearchCategoryCopyLinkButton from './SearchCategoryCopyLinkButton/SearchCategoryCopyLinkButton'
import SearchCategoryShareDiscordButton from './SearchCategoryShareDiscordButton/SearchCategoryShareDiscordButton'
import SearchCategoryShareRedditButton from './SearchCategoryShareRedditButton/SearchCategoryShareRedditButton'
import SearchCategoryShareTwitterButton from './SearchCategoryShareTwitterButton/SearchCategoryShareTwitterButton'

interface Props {
  query: PreloadedQuery<SearchCategoryQuery>
}

const Query = graphql`
  query SearchCategoryQuery(
    $sortBy: PostsSort!,
    $categorySlug: String!,
    $seed: String
  ) @preloadable {
    category(slug: $categorySlug) {
      title
      totalLikes
      totalPosts
      ...SearchCategoryFragment
      ...SearchCategoryRichObjectFragment
      ...SearchCategoryShareDiscordButtonFragment
      ...SearchCategoryShareRedditButtonFragment
      ...SearchCategoryShareTwitterButtonFragment
      ...SearchCategoryCopyLinkButtonFragment
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
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "SearchCategoryPostsPaginationQuery" ) {
    posts (
      first: $first,
      after: $after,
      sortBy: $sortBy,
      seed: $seed
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
            <HStack spacing={1}>
              <SearchCategoryCopyLinkButton query={queryData.category} />
              <SearchCategoryShareDiscordButton query={queryData.category} />
              <SearchCategoryShareRedditButton query={queryData.category} />
              <SearchCategoryShareTwitterButton query={queryData.category} />
            </HStack>
            <SearchButton />
          </HStack>
        </Stack>
        <GlobalVideoManagerProvider>
          <PostInfiniteScroll
            query={data.posts}
            hasNext={hasNext}
            loadNext={loadNext}
            isLoadingNext={isLoadingNext}
            endOfTree={<PlatformPromoteAlert />}
          >
            {({ index, key }) => (
              <FullSimplePost
                key={key}
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
