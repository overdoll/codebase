import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AdminCreateSeriesQuery } from '@//:artifacts/AdminCreateSeriesQuery.graphql'
import CreateSeriesForm from './CreateSeriesForm/CreateSeriesForm'

interface Props {
  query: PreloadedQuery<AdminCreateSeriesQuery>
}

const Query = graphql`
  query AdminCreateSeriesQuery($first: Int, $after: String) {
    series (first: $first, after: $after)
    @connection(key: "AdminSeriesConnection_series") {
      __id
      edges {
        __typename
      }
    }
  }
`

export default function AdminCreateSeries (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<AdminCreateSeriesQuery>(
    Query,
    props.query
  )

  return (
    <CreateSeriesForm connectionId={queryData?.series.__id} />
  )
}
