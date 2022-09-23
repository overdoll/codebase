import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultNewQuery } from '@//:artifacts/ResultNewQuery.graphql'
import { graphql } from 'react-relay'
import MetaNew from './MetaNew/MetaNew'

interface Props {
  query: PreloadedQuery<ResultNewQuery>
}

const Query = graphql`
  query ResultNewQuery @preloadable {
    ...MetaNewFragment
  }
`

export default function ResultNew (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultNewQuery>(
    Query,
    query
  )

  return (
    <MetaNew rootQuery={queryData} />
  )
}
