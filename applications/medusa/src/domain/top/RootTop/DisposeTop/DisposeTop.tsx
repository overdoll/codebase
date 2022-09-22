import React, { Suspense, useEffect } from 'react'
import type { ResultTopQuery as ResultTopQueryType } from '@//:artifacts/ResultTopQuery.graphql'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'
import ResultTop from './ResultTop/ResultTop'
import SuspenseTop from './SuspenseTop/SuspenseTop'
import LoadTop from './LoadTop/LoadTop'

interface Props {
  params: useQueryLoaderHookType<ResultTopQueryType>
}

export default function DisposeTop (props: Props): JSX.Element {
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
    return <LoadTop loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspenseTop />}>
        <ResultTop query={queryRef} />
      </Suspense>
    </PageErrorBoundary>
  )
}
