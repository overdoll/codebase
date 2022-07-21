import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffCreateTopicQuery } from '@//:artifacts/StaffCreateTopicQuery.graphql'
import CreateTopicForm from './CreateTopicForm/CreateTopicForm'

interface Props {
  query: PreloadedQuery<StaffCreateTopicQuery>
}

const Query = graphql`
  query StaffCreateTopicQuery($first: Int, $after: String) {
    topics (first: $first, after: $after)
    @connection(key: "StaffTopicsConnection_topics") {
      __id
      edges {
        __typename
      }
    }
  }
`

export default function StaffCreateTopic (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffCreateTopicQuery>(
    Query,
    props.query
  )

  return (
    <CreateTopicForm connectionId={queryData?.topics.__id} />
  )
}
