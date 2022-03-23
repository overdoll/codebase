import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AdminCreateCancellationReasonQuery } from '@//:artifacts/AdminCreateCancellationReasonQuery.graphql'
import CreateCancellationReasonForm from './CreateCancellationReasonForm/CreateCancellationReasonForm'

interface Props {
  query: PreloadedQuery<AdminCreateCancellationReasonQuery>
}

const Query = graphql`
  query AdminCreateCancellationReasonQuery($first: Int, $after: String) {
    cancellationReasons (first: $first, after: $after)
    @connection(key: "AdminCancellationReasonsConnection_cancellationReasons") {
      __id
      edges {
        __typename
      }
    }
  }
`

export default function AdminCreateCancellationReason (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<AdminCreateCancellationReasonQuery>(
    Query,
    props.query
  )

  return (
    <CreateCancellationReasonForm connectionId={queryData?.cancellationReasons.__id} />
  )
}
