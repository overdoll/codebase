import React, { Suspense, useEffect } from 'react'
import type { ResultPublicClubQuery as ResultPublicClubQueryType } from '@//:artifacts/ResultPublicClubQuery.graphql'
import { useRouter } from 'next/router'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import LoadPublicClub from './LoadPublicClub/LoadPublicClub'
import SuspensePublicClub from './SuspensePublicClub/SuspensePublicClub'
import ResultPublicClub from './ResultPublicClub/ResultPublicClub'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'

interface Props {
  params: useQueryLoaderHookType<ResultPublicClubQueryType>
}

// we dispose of the query if the user leaves the page
// and if the query ref is somehow null, we manually load the query on mount
export default function DisposePublicClub (props: Props): JSX.Element {
  const { params: [queryRef, loadQuery, disposeQuery] } = props

  const { query: { slug } } = useRouter()

  const onLoadQuery = (): void => {
    loadQuery({ slug: slug as string })
  }

  useEffect(() => {
    return () => {
      disposeQuery()
    }
  }, [])

  if (queryRef == null) {
    return <LoadPublicClub loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspensePublicClub />}>
        <ResultPublicClub query={queryRef} />
      </Suspense>
    </PageErrorBoundary>
  )
}
