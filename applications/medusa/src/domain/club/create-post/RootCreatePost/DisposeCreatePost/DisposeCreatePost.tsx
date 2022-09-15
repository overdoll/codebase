import React, { Suspense, useEffect } from 'react'
import type { ResultCreatePostQuery as ResultCreatePostQueryType } from '@//:artifacts/ResultCreatePostQuery.graphql'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'
import LoadCreatePost from './LoadCreatePost/LoadCreatePost'
import SuspenseCreatePost from './SuspenseCreatePost/SuspenseCreatePost'
import { useRouter } from 'next/router'
import { useQueryParam } from 'use-query-params'
import ResultCreatePost from './ResultCreatePost/ResultCreatePost'

interface Props {
  params: useQueryLoaderHookType<ResultCreatePostQueryType>
}

export default function DisposeCreatePost (props: Props): JSX.Element {
  const { params: [queryRef, loadQuery, disposeQuery] } = props

  const { query: { slug } } = useRouter()

  const [postReference] = useQueryParam<string | null | undefined>('post')

  const onLoadQuery = (): void => {
    loadQuery({
      reference: postReference ?? '',
      slug: slug as string
    })
  }

  useEffect(() => {
    return () => {
      disposeQuery()
    }
  }, [])

  useEffect(() => {
    if (slug == null) return
    loadQuery({
      reference: postReference ?? '',
      slug: slug as string
    })
  }, [postReference, slug])

  if (queryRef == null) {
    return <LoadCreatePost loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspenseCreatePost />}>
        <ResultCreatePost query={queryRef} />
      </Suspense>
    </PageErrorBoundary>
  )
}
