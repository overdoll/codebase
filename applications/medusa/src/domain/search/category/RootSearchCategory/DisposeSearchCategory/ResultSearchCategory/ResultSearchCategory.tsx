import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultSearchCategoryQuery } from '@//:artifacts/ResultSearchCategoryQuery.graphql'
import { graphql } from 'react-relay'
import EmptySearchCategory from './EmptySearchCategory/EmptySearchCategory'
import MetaSearchCategory from './MetaSearchCategory/MetaSearchCategory'

interface Props {
  query: PreloadedQuery<ResultSearchCategoryQuery>
}

const Query = graphql`
  query ResultSearchCategoryQuery(
    $sortBy: PostsSort!,
    $categorySlug: String!,
    $seed: String
  ) @preloadable {
    category(slug: $categorySlug) {
      ...MetaSearchCategoryFragment
    }
    viewer {
      ...MetaSearchCategoryViewerFragment
    }
  }
`

export default function ResultSearchCategory (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultSearchCategoryQuery>(
    Query,
    query
  )

  if (queryData?.category == null) {
    return <EmptySearchCategory />
  }

  return (
    <MetaSearchCategory categoryQuery={queryData.category} viewerQuery={queryData.viewer} />
  )
}
