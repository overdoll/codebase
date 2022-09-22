import React, { Suspense, useEffect } from 'react'
import type { ResultNewQuery as ResultNewQueryType } from '@//:artifacts/ResultNewQuery.graphql'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'
import LoadNew from './LoadNew/LoadNew'
import SuspenseNew from './SuspenseNew/SuspenseNew'
import ResultNew from './ResultNew/ResultNew'

interface Props {
  params: useQueryLoaderHookType<ResultNewQueryType>
}

export default function DisposeNew (props: Props): JSX.Element {
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
    return <LoadNew loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspenseNew />}>
        <ResultNew query={queryRef} />
      </Suspense>
    </PageErrorBoundary>
  )
}
