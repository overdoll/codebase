import { Helmet } from 'react-helmet-async'
import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import type { SearchQuery as SearchQueryType } from '@//:artifacts/SearchQuery.graphql'
import SearchQuery from '@//:artifacts/SearchQuery.graphql'
import { PageWrapper } from '@//:modules/content/PageLayout'
import Search from './Search/Search'
import SkeletonPost from '@//:modules/content/Placeholder/Skeleton/SkeletonPost/SkeletonPost'
import useSearchButtonQueryArguments
  from '../../components/FloatingGeneralSearchButton/helpers/useSearchButtonQueryArguments'

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

  const loadQueryWithParams = useSearchButtonQueryArguments({
    queryLoader: loadQuery,
    extraParams: {}
  })

  return (
    <>
      <Helmet title='search' />
      <PageWrapper fillPage>
        <QueryErrorBoundary loadQuery={loadQueryWithParams}>
          <Suspense fallback={<SkeletonPost />}>
            <Search query={queryRef as PreloadedQuery<SearchQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
