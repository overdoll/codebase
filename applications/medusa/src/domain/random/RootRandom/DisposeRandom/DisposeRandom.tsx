import React, { Suspense, useEffect } from 'react'
import type { ResultRandomQuery as ResultRandomQueryType } from '@//:artifacts/ResultRandomQuery.graphql'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'
import SkeletonPost from '../../../../modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import ResultRandom from './ResultRandom/ResultRandom'
import LoadRandom from './LoadRandom/LoadRandom'
import { useQueryParam } from 'use-query-params'
import { useUpdateEffect } from 'usehooks-ts'

interface Props {
  params: useQueryLoaderHookType<ResultRandomQueryType>
}

export default function DisposeRandom (props: Props): JSX.Element {
  const { params: [queryRef, loadQuery, disposeQuery] } = props

  const [postSeed] = useQueryParam<string | null | undefined>('seed')

  const onLoadQuery = (): void => {
    loadQuery({
      seed: postSeed
    })
  }

  useUpdateEffect(() => {
    if (postSeed == null) return
    loadQuery({
      seed: postSeed
    })
    window.scrollTo(0, 0)
  }, [postSeed])

  useEffect(() => {
    return () => {
      disposeQuery()
    }
  }, [])

  if (queryRef == null) {
    return <LoadRandom loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SkeletonPost />}>
        <ResultRandom query={queryRef} />
      </Suspense>
    </PageErrorBoundary>
  )
}
