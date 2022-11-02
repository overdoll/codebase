import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import { ResultBrowseCharactersQuery } from '@//:artifacts/ResultBrowseCharactersQuery.graphql'
import React, { Suspense, useEffect } from 'react'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'
import SuspenseBrowseCharacters from './SuspenseBrowseCharacters/SuspenseBrowseCharacters'
import ResultBrowseCharacters from './ResultBrowseCharacters/ResultBrowseCharacters'
import LoadBrowseCharacters from './LoadBrowseCharacters/LoadBrowseCharacters'

interface Props {
  params: useQueryLoaderHookType<ResultBrowseCharactersQuery>
}

export default function DisposeBrowseCharacters (props: Props): JSX.Element {
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
    return <LoadBrowseCharacters loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspenseBrowseCharacters />}>
        <ResultBrowseCharacters query={queryRef} />
      </Suspense>
    </PageErrorBoundary>
  )
}
