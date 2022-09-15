import React, { Suspense, useEffect } from 'react'
import type { ResultLikedPostsQuery as ResultLikedPostsQueryType } from '@//:artifacts/ResultLikedPostsQuery.graphql'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'
import SuspenseLikedPosts from './SuspenseLikedPosts/SuspenseLikedPosts'
import LoadLikedPosts from './LoadLikedPosts/LoadLikedPosts'
import ResultLikedPosts from './ResultLikedPosts/ResultLikedPosts'

interface Props {
  params: useQueryLoaderHookType<ResultLikedPostsQueryType>
}

export default function DisposeLikedPosts (props: Props): JSX.Element {
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
    return <LoadLikedPosts loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspenseLikedPosts />}>
        <ResultLikedPosts query={queryRef} />
      </Suspense>
    </PageErrorBoundary>
  )
}
