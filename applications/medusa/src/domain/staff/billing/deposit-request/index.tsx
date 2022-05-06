import RootStaffDepositRequest from './RootStaffDepositRequest/RootStaffDepositRequest'
import StaffDepositRequestQuery from '@//:artifacts/StaffDepositRequestQuery.graphql'
import StaffLayout from '../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffDepositRequest.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffDepositRequestQuery: {
        params: StaffDepositRequestQuery.params,
        variables: {
          reference: ctx.query.reference
        }
      }
    }
  }
}

RootStaffDepositRequest.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffDepositRequest
