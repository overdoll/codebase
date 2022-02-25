import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AdminCreateAudienceQuery } from '@//:artifacts/AdminCreateAudienceQuery.graphql'
import CreateAudienceForm from './CreateAudienceForm/CreateAudienceForm'

interface Props {
  query: PreloadedQuery<AdminCreateAudienceQuery>
}

const Query = graphql`
  query AdminCreateAudienceQuery($first: Int, $after: String) {
    audiences (first: $first, after: $after)
    @connection(key: "AdminAudiencesConnection_audiences") {
      __id
      edges {
        __typename
      }
    }
  }
`

export default function AdminCreateAudience (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<AdminCreateAudienceQuery>(
    Query,
    props.query
  )

  return (
    <CreateAudienceForm connectionId={queryData?.audiences.__id} />
  )
}
