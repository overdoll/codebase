import RootStaffViewRule from './RootStaffViewRule/RootStaffViewRule'
import StaffViewRuleQuery from '@//:artifacts/StaffViewRuleQuery.graphql'
import StaffLayout from '../../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffViewRule.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

RootStaffViewRule.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffViewRuleQuery: {
        params: StaffViewRuleQuery.params,
        variables: {
          reference: ctx.query.reference
        }
      }
    }
  }
}

RootStaffViewRule.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffViewRule
