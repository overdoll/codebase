import React, { Suspense, useEffect } from 'react'
import type {
  ResultSearchCharacterQuery as ResultSearchCharacterQueryType
} from '@//:artifacts/ResultSearchCharacterQuery.graphql'
import { useRouter } from 'next/router'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import QueryErrorBoundary
  from '../../../../../modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import useSearchSortArguments from '@//:common/components/PageHeader/SearchButton/support/useSearchSortArguments'
import LoadSearchCharacter from './LoadSearchCharacter/LoadSearchCharacter'
import SuspenseSearchCharacter from './SuspenseSearchCharacter/SuspenseSearchCharacter'
import ResultSearchCharacter from './ResultSearchCharacter/ResultSearchCharacter'

interface Props {
  params: useQueryLoaderHookType<ResultSearchCharacterQueryType>
}

export default function DisposeSearchCharacter (props: Props): JSX.Element {
  const { params: [queryRef, loadQuery, disposeQuery] } = props

  const {
    query: {
      seriesSlug,
      characterSlug
    }
  } = useRouter()

  const onLoadQuery = (): void => {
    loadQuery({
      seriesSlug: seriesSlug as string,
      characterSlug: characterSlug as string,
      sortBy: 'ALGORITHM'
    })
  }

  useSearchSortArguments((params) => loadQuery(params))

  useEffect(() => {
    return () => {
      disposeQuery()
    }
  }, [])

  if (queryRef == null) {
    return <LoadSearchCharacter loadQuery={onLoadQuery} />
  }

  return (
    <QueryErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspenseSearchCharacter />}>
        <ResultSearchCharacter query={queryRef} />
      </Suspense>
    </QueryErrorBoundary>
  )
}
