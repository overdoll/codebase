import { Helmet } from 'react-helmet-async'
import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import type { PostsSort, SearchQuery as SearchQueryType } from '@//:artifacts/SearchQuery.graphql'
import SearchQuery from '@//:artifacts/SearchQuery.graphql'
import { PageWrapper } from '@//:modules/content/PageLayout'
import Search from './Search/Search'
import { useQueryParam } from 'use-query-params'
import { useUpdateEffect } from 'usehooks-ts'
import SkeletonPost from '@//:modules/content/Placeholder/Skeleton/SkeletonPost/SkeletonPost'

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

  const [series] = useQueryParam<string[] | null | undefined>('series')
  const [categories] = useQueryParam<string[] | null | undefined>('categories')
  const [characters] = useQueryParam<string[] | null | undefined>('characters')
  const [sort] = useQueryParam<string | null | undefined>('sort')

  const reloadQuery = (): void => {
    loadQuery({
      sortBy: sort as PostsSort,
      categorySlugs: categories,
      seriesSlugs: series,
      characterSlugs: characters
    })
  }

  useUpdateEffect(() => {
    if (series == null && categories == null && characters == null && sort == null) return
    reloadQuery()
  }, [series, categories, characters, sort])

  return (
    <>
      <Helmet title='search' />
      <PageWrapper fillPage>
        <QueryErrorBoundary loadQuery={reloadQuery}>
          <Suspense fallback={<SkeletonPost />}>
            <Search query={queryRef as PreloadedQuery<SearchQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
