import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultBrowseQuery } from '@//:artifacts/ResultBrowseQuery.graphql'
import { graphql } from 'react-relay'
import MetaBrowse from './MetaBrowse/MetaBrowse'

interface Props {
  query: PreloadedQuery<ResultBrowseQuery>
}

const Query = graphql`
  query ResultBrowseQuery($seed: String) @preloadable {
    ...MetaBrowseFragment
  }
`

export default function ResultBrowse (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultBrowseQuery>(
    Query,
    query
  )

  return (
    <MetaBrowse rootQuery={queryData} />
  )
}
