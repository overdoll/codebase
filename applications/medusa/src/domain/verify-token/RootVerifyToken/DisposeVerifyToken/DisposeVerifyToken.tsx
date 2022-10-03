import React, { Suspense, useEffect } from 'react'
import type { ResultVerifyTokenQuery as ResultVerifyTokenQueryType } from '@//:artifacts/ResultVerifyTokenQuery.graphql'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'
import { useUpdateEffect } from 'usehooks-ts'
import LoadVerifyToken from './LoadVerifyToken/LoadVerifyToken'
import SuspenseVerifyToken from './SuspenseVerifyToken/SuspenseVerifyToken'
import { useQueryParam } from 'use-query-params'
import ResultVerifyToken from './ResultVerifyToken/ResultVerifyToken'
import { FixedContainer } from '@//:modules/content/PageLayout'

interface Props {
  params: useQueryLoaderHookType<ResultVerifyTokenQueryType>
}

export default function DisposeVerifyToken (props: Props): JSX.Element {
  const { params: [queryRef, loadQuery, disposeQuery] } = props

  const [queryToken] = useQueryParam<string>('token')
  const [querySecret] = useQueryParam<string>('secret')

  const onLoadQuery = (): void => {
    loadQuery({
      token: queryToken,
      secret: querySecret
    }, { fetchPolicy: 'network-only' })
  }

  useEffect(() => {
    return () => {
      disposeQuery()
    }
  }, [])

  useUpdateEffect(() => {
    onLoadQuery()
  }, [queryToken, querySecret])

  if (queryRef == null) {
    return <LoadVerifyToken loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspenseVerifyToken />}>
        <FixedContainer>
          <ResultVerifyToken query={queryRef} />
        </FixedContainer>
      </Suspense>
    </PageErrorBoundary>
  )
}
