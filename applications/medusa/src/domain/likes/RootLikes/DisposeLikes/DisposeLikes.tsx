import React, { Suspense, useEffect } from 'react'
import type { ResultLikesQuery as ResultLikesQueryType } from '@//:artifacts/ResultLikesQuery.graphql'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'
import ResultLikes from './ResultLikes/ResultLikes'
import LoadLikes from './LoadLikes/LoadLikes'
import SuspenseLikes from './SuspenseLikes/SuspenseLikes'

interface Props {
  params: useQueryLoaderHookType<ResultLikesQueryType>
}

export default function DisposeLikes (props: Props): JSX.Element {
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
    return <LoadLikes loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspenseLikes />}>
        <ResultLikes query={queryRef} />
      </Suspense>
    </PageErrorBoundary>
  )
}
