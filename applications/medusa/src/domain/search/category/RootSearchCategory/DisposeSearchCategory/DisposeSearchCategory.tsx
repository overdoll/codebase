import React, { Suspense, useEffect } from 'react'
import type {
  ResultSearchCategoryQuery as ResultSearchCategoryQueryType
} from '@//:artifacts/ResultSearchCategoryQuery.graphql'
import { useRouter } from 'next/router'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import useSearchSortArguments from '@//:common/components/PageHeader/SearchButton/support/useSearchSortArguments'
import LoadSearchCategory from './LoadSearchCategory/LoadSearchCategory'
import SuspenseSearchCategory from './SuspenseSearchCategory/SuspenseSearchCategory'
import ResultSearchCategory from './ResultSearchCategory/ResultSearchCategory'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'

interface Props {
  params: useQueryLoaderHookType<ResultSearchCategoryQueryType>
}

export default function DisposeSearchCategory (props: Props): JSX.Element {
  const { params: [queryRef, loadQuery, disposeQuery] } = props

  const {
    query: {
      categorySlug
    }
  } = useRouter()

  const onLoadQuery = (): void => {
    loadQuery({
      categorySlug: categorySlug as string,
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
    return <LoadSearchCategory loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspenseSearchCategory />}>
        <ResultSearchCategory query={queryRef} />
      </Suspense>
    </PageErrorBoundary>
  )
}
