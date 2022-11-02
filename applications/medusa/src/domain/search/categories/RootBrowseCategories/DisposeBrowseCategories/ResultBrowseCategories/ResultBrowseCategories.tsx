import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ResultBrowseCategoriesQuery } from '@//:artifacts/ResultBrowseCategoriesQuery.graphql'
import { graphql } from 'react-relay'
import MetaBrowseCategories from './MetaBrowseCategories/MetaBrowseCategories'

interface Props {
  query: PreloadedQuery<ResultBrowseCategoriesQuery>
}

const Query = graphql`
  query ResultBrowseCategoriesQuery {
    ...MetaBrowseCategoriesFragment
  }
`

export default function ResultBrowseCategories (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultBrowseCategoriesQuery>(
    Query,
    query
  )

  return (
    <MetaBrowseCategories rootQuery={queryData} />
  )
}
