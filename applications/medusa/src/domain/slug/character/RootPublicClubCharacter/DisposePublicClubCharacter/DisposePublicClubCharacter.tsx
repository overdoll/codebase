import React, { Suspense, useEffect } from 'react'
import type {
  ResultPublicClubCharacterQuery as ResultPublicClubCharacterQueryType
} from '@//:artifacts/ResultPublicClubCharacterQuery.graphql'
import { useRouter } from 'next/router'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import QueryErrorBoundary
  from '../../../../../modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import useSearchSortArguments from '@//:common/components/PageHeader/SearchButton/support/useSearchSortArguments'
import LoadPublicClubCharacter from './LoadPublicClubCharacter/LoadPublicClubCharacter'
import ResultPublicClubCharacter from './ResultPublicClubCharacter/ResultPublicClubCharacter'
import SuspensePublicClubCharacter from './SuspensePublicClubCharacter/SuspensePublicClubCharacter'

interface Props {
  params: useQueryLoaderHookType<ResultPublicClubCharacterQueryType>
}

export default function DisposePublicClubCharacter (props: Props): JSX.Element {
  const { params: [queryRef, loadQuery, disposeQuery] } = props

  const {
    query: {
      slug,
      characterSlug
    }
  } = useRouter()

  useSearchSortArguments((params) => loadQuery(params))

  const onLoadQuery = (): void => {
    loadQuery({
      clubSlug: slug as string,
      characterSlug: characterSlug as string,
      sortBy: 'ALGORITHM'
    })
  }

  useEffect(() => {
    return () => {
      disposeQuery()
    }
  }, [])

  if (queryRef == null) {
    return <LoadPublicClubCharacter loadQuery={onLoadQuery} />
  }

  return (
    <QueryErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspensePublicClubCharacter />}>
        <ResultPublicClubCharacter query={queryRef} />
      </Suspense>
    </QueryErrorBoundary>
  )
}
