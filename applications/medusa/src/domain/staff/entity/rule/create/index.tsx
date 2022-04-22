import RootStaffCreateRule from './RootStaffCreateRule/RootStaffCreateRule'
import StaffCreateRuleQuery from '@//:artifacts/StaffCreateRuleQuery.graphql'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffCreateRule.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffCreateRuleQuery: {
        params: StaffCreateRuleQuery.params,
        variables: {}
      }
    }
  }
}

RootStaffCreateRule.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffCreateRule
