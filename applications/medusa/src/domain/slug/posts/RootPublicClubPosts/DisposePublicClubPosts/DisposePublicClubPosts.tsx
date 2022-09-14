import { Suspense, useEffect } from 'react'
import type {
  ResultPublicClubPostsQuery as ResultPublicClubPostsQueryType
} from '@//:artifacts/ResultPublicClubPostsQuery.graphql'
import { useRouter } from 'next/router'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import QueryErrorBoundary
  from '../../../../../modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import useSearchSortArguments from '@//:common/components/PageHeader/SearchButton/support/useSearchSortArguments'
import LoadPublicClubPosts from './LoadPublicClubPosts/LoadPublicClubPosts'
import SuspensePublicClubPosts from './SuspensePublicClubPosts/SuspensePublicClubPosts'
import ResultPublicClubPosts from './ResultPublicClubPosts/ResultPublicClubPosts'

interface Props {
  params: useQueryLoaderHookType<ResultPublicClubPostsQueryType>
}

// we dispose of the query if the user leaves the page
// and if the query ref is somehow null, we manually load the query on mount
export default function DisposePublicClubPosts (props: Props): JSX.Element {
  const { params: [queryRef, loadQuery, disposeQuery] } = props

  const { query: { slug } } = useRouter()

  const onLoadQuery = (): void => {
    loadQuery({
      sortBy: 'ALGORITHM',
      slug: slug as string
    })
  }

  useEffect(() => {
    return () => {
      disposeQuery()
    }
  }, [])

  useSearchSortArguments((params) => loadQuery({
    ...params,
    slug: slug as string
  }))

  if (queryRef == null) {
    return <LoadPublicClubPosts loadQuery={onLoadQuery} />
  }

  return (
    <QueryErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={<SuspensePublicClubPosts />}>
        <ResultPublicClubPosts query={queryRef} />
      </Suspense>
    </QueryErrorBoundary>
  )
}
