import { Suspense } from 'react'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { SearchSeriesQuery as SearchSeriesQueryType } from '@//:artifacts/SearchSeriesQuery.graphql'
import SearchSeriesQuery from '@//:artifacts/SearchSeriesQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'
import SearchSeries from './SearchSeries/SearchSeries'
import useSearchSortArguments
  from '../../../../common/components/PageHeader/SearchButton/support/useSearchSortArguments'
import { PageWrapper } from '@//:modules/content/PageLayout'

interface Props {
  queryRefs: {
    searchSeriesQuery: PreloadedQuery<SearchSeriesQueryType>
  }
}

const RootSearchSeries: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader<SearchSeriesQueryType>(
    SearchSeriesQuery,
    props.queryRefs.searchSeriesQuery
  )

  const {
    query: {
      seriesSlug
    }
  } = useRouter()

  useSearchSortArguments((params) => loadQuery(params))

  return (
    <>
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({
          seriesSlug: seriesSlug as string,
          sortBy: 'ALGORITHM'
        })}
        >
          <Suspense fallback={<SkeletonStack />}>
            <SearchSeries query={queryRef as PreloadedQuery<SearchSeriesQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootSearchSeries
