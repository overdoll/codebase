import React, { Suspense, useEffect } from 'react'
import type { ResultClubsFeedQuery as ResultClubsFeedQueryType } from '@//:artifacts/ResultClubsFeedQuery.graphql'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'
import LoadClubsFeed from './LoadClubsFeed/LoadClubsFeed'
import ResultClubsFeed from './ResultClubsFeed/ResultClubsFeed'
import SuspenseClubsFeed from './SuspenseClubsFeed/SuspenseClubsFeed'

interface Props {
  params: useQueryLoaderHookType<ResultClubsFeedQueryType>
}

export default function DisposeClubsFeed (props: Props): JSX.Element {
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
    return <LoadClubsFeed loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspenseClubsFeed />}>
        <ResultClubsFeed query={queryRef} />
      </Suspense>
    </PageErrorBoundary>
  )
}
