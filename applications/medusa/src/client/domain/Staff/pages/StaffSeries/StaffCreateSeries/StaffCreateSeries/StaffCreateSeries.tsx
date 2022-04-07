import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffCreateSeriesQuery } from '@//:artifacts/StaffCreateSeriesQuery.graphql'
import CreateSeriesForm from './CreateSeriesForm/CreateSeriesForm'

interface Props {
  query: PreloadedQuery<StaffCreateSeriesQuery>
}

const Query = graphql`
  query StaffCreateSeriesQuery($first: Int, $after: String) {
    series (first: $first, after: $after)
    @connection(key: "StaffSeriesConnection_series") {
      __id
      edges {
        __typename
      }
    }
  }
`

export default function StaffCreateSeries (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffCreateSeriesQuery>(
    Query,
    props.query
  )

  return (
    <CreateSeriesForm connectionId={queryData?.series.__id} />
  )
}
