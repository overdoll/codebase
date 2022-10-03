import React, { ReactNode, Suspense, useEffect } from 'react'
import type { ResultRootQuery as ResultRootQueryType } from '@//:artifacts/ResultRootQuery.graphql'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'
import LoadRoot from './LoadRoot/LoadRoot'
import SuspenseRoot from './SuspenseRoot/SuspenseRoot'
import ResultRoot from './ResultRoot/ResultRoot'

interface Props {
  params: useQueryLoaderHookType<ResultRootQueryType>
  children: ReactNode
}

export default function DisposeRoot (props: Props): JSX.Element {
  const {
    params: [queryRef, loadQuery, disposeQuery],
    children
  } = props

  const onLoadQuery = (): void => {
    loadQuery({}, { fetchPolicy: 'network-only' })
  }

  useEffect(() => {
    return () => {
      disposeQuery()
    }
  }, [])

  if (queryRef == null) {
    return <LoadRoot loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspenseRoot />}>
        <ResultRoot
          query={queryRef}
          loadQuery={onLoadQuery}
        >
          {children}
        </ResultRoot>
      </Suspense>
    </PageErrorBoundary>
  )
}
