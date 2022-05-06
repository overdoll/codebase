import RootStaffDepositRequests from './RootStaffDepositRequests/RootStaffDepositRequests'
import StaffDepositRequestsQuery from '@//:artifacts/StaffDepositRequestsQuery.graphql'
import StaffLayout from '../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffDepositRequests.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffDepositRequests: {
        params: StaffDepositRequestsQuery.params,
        variables: {
          reference: ctx.query.reference
        }
      }
    }
  }
}

RootStaffDepositRequests.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffDepositRequests
