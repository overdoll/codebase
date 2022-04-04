import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffCreateRuleQuery } from '@//:artifacts/StaffCreateRuleQuery.graphql'
import CreateRuleForm from './CreateRuleForm/CreateRuleForm'

interface Props {
  query: PreloadedQuery<StaffCreateRuleQuery>
}

const Query = graphql`
  query StaffCreateRuleQuery($first: Int, $after: String) {
    rules (first: $first, after: $after)
    @connection(key: "StaffRulesConnection_rules") {
      __id
      edges {
        __typename
      }
    }
  }
`

export default function StaffCreateRule (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffCreateRuleQuery>(
    Query,
    props.query
  )

  return (
    <CreateRuleForm connectionId={queryData?.rules.__id} />
  )
}
