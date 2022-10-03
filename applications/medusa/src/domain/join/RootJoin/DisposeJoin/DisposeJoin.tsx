import React, { Suspense, useEffect } from 'react'
import type { ResultJoinQuery as ResultJoinQueryType } from '@//:artifacts/ResultJoinQuery.graphql'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'
import { useCookies } from 'react-cookie'
import { useUpdateEffect } from 'usehooks-ts'
import LoadJoin from './LoadJoin/LoadJoin'
import ResultJoin from './ResultJoin/ResultJoin'
import SuspenseJoin from './SuspenseJoin/SuspenseJoin'

interface Props {
  params: useQueryLoaderHookType<ResultJoinQueryType>
}

export default function DisposeJoin (props: Props): JSX.Element {
  const { params: [queryRef, loadQuery, disposeQuery] } = props

  const [cookies] = useCookies<string>(['token'])

  const onLoadQuery = (): void => {
    const cookieToken = cookies.token != null ? cookies.token.split(';')[0] : ''
    loadQuery({ token: cookieToken }, { fetchPolicy: 'network-only' })
  }

  useEffect(() => {
    return () => {
      disposeQuery()
    }
  }, [])

  // if token cookie changes or is set we run the query
  useUpdateEffect(() => {
    onLoadQuery()
  }, [cookies.token])

  if (queryRef == null) {
    return <LoadJoin loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspenseJoin />}>
        <ResultJoin query={queryRef} loadQuery={onLoadQuery} />
      </Suspense>
    </PageErrorBoundary>
  )
}
