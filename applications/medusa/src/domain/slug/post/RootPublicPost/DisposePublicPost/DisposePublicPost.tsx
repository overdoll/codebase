import { Suspense, useEffect } from 'react'
import type { ResultPublicPostQuery as ResultPublicPostQueryType } from '@//:artifacts/ResultPublicPostQuery.graphql'
import { useRouter } from 'next/router'
import ResultPublicPost from './ResultPublicPost/ResultPublicPost'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'
import SuspensePublicPost from './SuspensePublicPost/SuspensePublicPost'
import LoadPublicPost from './LoadPublicPost/LoadPublicPost'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'

interface Props {
  params: useQueryLoaderHookType<ResultPublicPostQueryType>
}

// we dispose of the query if the user leaves the page
// and if the query ref is somehow null, we manually load the query on mount
export default function DisposePublicPost (props: Props): JSX.Element {
  const { params: [queryRef, loadQuery, disposeQuery] } = props

  const { query: { reference } } = useRouter()

  const onLoadQuery = (): void => {
    loadQuery({ reference: reference as string ?? '' })
  }

  useEffect(() => {
    return () => {
      disposeQuery()
    }
  }, [])

  if (queryRef == null) {
    return <LoadPublicPost loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspensePublicPost />}>
        <ResultPublicPost query={queryRef} />
      </Suspense>
    </PageErrorBoundary>
  )
}
