import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffCreateAudienceQuery } from '@//:artifacts/StaffCreateAudienceQuery.graphql'
import CreateAudienceForm from './CreateAudienceForm/CreateAudienceForm'

interface Props {
  query: PreloadedQuery<StaffCreateAudienceQuery>
}

const Query = graphql`
  query StaffCreateAudienceQuery($first: Int, $after: String) {
    audiences (first: $first, after: $after)
    @connection(key: "StaffAudiencesConnection_audiences") {
      __id
      edges {
        __typename
      }
    }
  }
`

export default function StaffCreateAudience (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffCreateAudienceQuery>(
    Query,
    props.query
  )

  return (
    <CreateAudienceForm connectionId={queryData?.audiences.__id} />
  )
}
