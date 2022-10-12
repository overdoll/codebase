import React, { Suspense, useEffect } from 'react'
import type { ResultClubSupporterQuery as ResultClubSupporterQueryType } from '@//:artifacts/ResultClubSupporterQuery.graphql'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'
import LoadClubSupporter from './LoadClubSupporter/LoadClubSupporter'
import SuspenseClubSupporter from './SuspenseClubSupporter/SuspenseClubSupporter'
import ResultClubSupporter from './ResultClubSupporter/ResultClubSupporter'

interface Props {
  params: useQueryLoaderHookType<ResultClubSupporterQueryType>
}

export default function DisposeClubSupporter (props: Props): JSX.Element {
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
    return <LoadClubSupporter loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspenseClubSupporter />}>
        <ResultClubSupporter query={queryRef} />
      </Suspense>
    </PageErrorBoundary>
  )
}
