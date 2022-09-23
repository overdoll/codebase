import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultTopQuery } from '@//:artifacts/ResultTopQuery.graphql'
import { graphql } from 'react-relay'
import MetaTop from './MetaTop/MetaTop'

interface Props {
  query: PreloadedQuery<ResultTopQuery>
}

const Query = graphql`
  query ResultTopQuery @preloadable {
    ...MetaTopFragment
  }
`

export default function ResultTop (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultTopQuery>(
    Query,
    query
  )

  return (
    <MetaTop rootQuery={queryData} />
  )
}
