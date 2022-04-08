import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffCreateCancellationReasonQuery } from '@//:artifacts/StaffCreateCancellationReasonQuery.graphql'
import CreateCancellationReasonForm from './CreateCancellationReasonForm/CreateCancellationReasonForm'

interface Props {
  query: PreloadedQuery<StaffCreateCancellationReasonQuery>
}

const Query = graphql`
  query StaffCreateCancellationReasonQuery($first: Int, $after: String) {
    cancellationReasons (first: $first, after: $after)
    @connection(key: "StaffCancellationReasonsConnection_cancellationReasons") {
      __id
      edges {
        __typename
      }
    }
  }
`

export default function StaffCreateCancellationReason (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffCreateCancellationReasonQuery>(
    Query,
    props.query
  )

  return (
    <CreateCancellationReasonForm connectionId={queryData?.cancellationReasons.__id} />
  )
}
