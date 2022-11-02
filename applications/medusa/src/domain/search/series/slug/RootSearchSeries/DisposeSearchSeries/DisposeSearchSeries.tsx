import React, { Suspense, useEffect } from 'react'
import type {
  ResultSearchSeriesQuery as ResultSearchSeriesQueryType
} from '@//:artifacts/ResultSearchSeriesQuery.graphql'
import { useRouter } from 'next/router'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import useSearchSortArguments from '@//:common/components/PageHeader/SearchButton/support/useSearchSortArguments'
import SuspenseSearchSeries from './SuspenseSearchSeries/SuspenseSearchSeries'
import LoadSearchSeries from './LoadSearchSeries/LoadSearchSeries'
import ResultSearchSeries from './ResultSearchSeries/ResultSearchSeries'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'

interface Props {
  params: useQueryLoaderHookType<ResultSearchSeriesQueryType>
}

export default function DisposeSearchSeries (props: Props): JSX.Element {
  const { params: [queryRef, loadQuery, disposeQuery] } = props

  const {
    query: {
      seriesSlug
    }
  } = useRouter()

  const onLoadQuery = (): void => {
    loadQuery({
      seriesSlug: seriesSlug as string,
      sortBy: 'ALGORITHM'
    })
  }

  useSearchSortArguments((params) => loadQuery(params))

  useEffect(() => {
    return () => {
      disposeQuery()
    }
  }, [])

  if (queryRef == null) {
    return <LoadSearchSeries loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspenseSearchSeries />}>
        <ResultSearchSeries query={queryRef} />
      </Suspense>
    </PageErrorBoundary>
  )
}
