import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AdminCreateRuleQuery } from '@//:artifacts/AdminCreateRuleQuery.graphql'
import CreateRuleForm from './CreateRuleForm/CreateRuleForm'

interface Props {
  query: PreloadedQuery<AdminCreateRuleQuery>
}

const Query = graphql`
  query AdminCreateRuleQuery($first: Int, $after: String) {
    rules (first: $first, after: $after)
    @connection(key: "AdminRulesConnection_rules") {
      __id
      edges {
        __typename
      }
    }
  }
`

export default function AdminCreateRule (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<AdminCreateRuleQuery>(
    Query,
    props.query
  )

  return (
    <CreateRuleForm connectionId={queryData?.rules.__id} />
  )
}
