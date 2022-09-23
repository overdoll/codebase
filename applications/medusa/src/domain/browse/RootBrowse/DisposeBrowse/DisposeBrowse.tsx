import React, { Suspense, useEffect } from 'react'
import type { ResultBrowseQuery as ResultBrowseQueryType } from '@//:artifacts/ResultBrowseQuery.graphql'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import LoadBrowse from './LoadBrowse/LoadBrowse'
import SuspenseBrowse from './SuspenseBrowse/SuspenseBrowse'
import ResultBrowse from './ResultBrowse/ResultBrowse'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'

interface Props {
  params: useQueryLoaderHookType<ResultBrowseQueryType>
}

export default function DisposeBrowse (props: Props): JSX.Element {
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
    return <LoadBrowse loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspenseBrowse />}>
        <ResultBrowse query={queryRef} />
      </Suspense>
    </PageErrorBoundary>
  )
}
