import React, { Suspense, useEffect } from 'react'
import type { ResultHomeQuery as ResultHomeQueryType } from '@//:artifacts/ResultHomeQuery.graphql'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'
import SuspenseHome from './SuspenseHome/SuspenseHome'
import LoadHome from './LoadHome/LoadHome'
import ResultHome from './ResultHome/ResultHome'

interface Props {
  params: useQueryLoaderHookType<ResultHomeQueryType>
}

export default function DisposeHome (props: Props): JSX.Element {
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
    return <LoadHome loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspenseHome />}>
        <ResultHome query={queryRef} />
      </Suspense>
    </PageErrorBoundary>
  )
}
