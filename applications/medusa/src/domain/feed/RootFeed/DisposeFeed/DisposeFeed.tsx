import React, { Suspense, useEffect } from 'react'
import type { ResultFeedQuery as ResultFeedQueryType } from '@//:artifacts/ResultFeedQuery.graphql'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'
import LoadFeed from './LoadFeed/LoadFeed'
import SuspenseFeed from './SuspenseFeed/SuspenseFeed'
import ResultFeed from './ResultFeed/ResultFeed'

interface Props {
  params: useQueryLoaderHookType<ResultFeedQueryType>
}

export default function DisposeFeed (props: Props): JSX.Element {
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
    return <LoadFeed loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspenseFeed />}>
        <ResultFeed query={queryRef} />
      </Suspense>
    </PageErrorBoundary>
  )
}
