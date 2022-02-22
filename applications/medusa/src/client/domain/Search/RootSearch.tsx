import { Helmet } from 'react-helmet-async'
import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { SearchQuery as SearchQueryType } from '@//:artifacts/SearchQuery.graphql'
import SearchQuery from '@//:artifacts/SearchQuery.graphql'
import { PageWrapper } from '@//:modules/content/PageLayout'
import Search from './Search/Search'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import useGeneralSearchArguments from '../../components/PostsSearch/helpers/useGeneralSearchArguments'
import { PostOrderButton, PostSearchButton } from '../../components/PostsSearch'
import PageFixedHeader from '../../components/PageFixedHeader/PageFixedHeader'

interface Props {
  prepared: {
    query: PreloadedQuery<SearchQueryType>
  }
}

export default function RootSearch (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    SearchQuery,
    props.prepared.query
  )

  useGeneralSearchArguments((params) => loadQuery(params))

  return (
    <>
      <Helmet title='search' />
      <PageFixedHeader>
        <PostOrderButton />
        <PostSearchButton routeTo='/search' />
      </PageFixedHeader>
      <PageWrapper fillPage>
        <QueryErrorBoundary loadQuery={() => loadQuery({
          sortBy: 'TOP'
        })}
        >
          <Suspense fallback={<SkeletonPost />}>
            <Search query={queryRef as PreloadedQuery<SearchQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
