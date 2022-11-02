import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import { ResultBrowseCategoriesQuery } from '@//:artifacts/ResultBrowseCategoriesQuery.graphql'
import React, { Suspense, useEffect } from 'react'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'
import SuspenseBrowseCategories from './SuspenseBrowseCategories/SuspenseBrowseCategories'
import ResultBrowseCategories from './ResultBrowseCategories/ResultBrowseCategories'
import LoadBrowseCategories from './LoadBrowseCategories/LoadBrowseCategories'

interface Props {
  params: useQueryLoaderHookType<ResultBrowseCategoriesQuery>
}

export default function DisposeBrowseCategories (props: Props): JSX.Element {
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
    return <LoadBrowseCategories loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspenseBrowseCategories />}>
        <ResultBrowseCategories query={queryRef} />
      </Suspense>
    </PageErrorBoundary>
  )
}
