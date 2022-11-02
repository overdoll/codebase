import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import { ResultBrowseSeriesQuery } from '@//:artifacts/ResultBrowseSeriesQuery.graphql'
import React, { Suspense, useEffect } from 'react'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'
import LoadBrowseSeries from './LoadBrowseSeries/LoadBrowseSeries'
import SuspenseBrowseSeries from './SuspenseBrowseSeries/SuspenseBrowseSeries'
import ResultBrowseSeries from './ResultBrowseSeries/ResultBrowseSeries'

interface Props {
  params: useQueryLoaderHookType<ResultBrowseSeriesQuery>
}

export default function DisposeBrowseSeries (props: Props): JSX.Element {
  const { params: [queryRef, loadQuery, disposeQuery] } = props

  const onLoadQuery = (): void => {
    loadQuery({})
  }

  useEffect(() => {
    return () => {
      disposeQuery()
    }
  }, [])

  if (queryRef == null) {
    return <LoadBrowseSeries loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspenseBrowseSeries />}>
        <ResultBrowseSeries query={queryRef} />
      </Suspense>
    </PageErrorBoundary>
  )
}
