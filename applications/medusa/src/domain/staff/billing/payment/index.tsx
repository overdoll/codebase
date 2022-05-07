import RootStaffPayment from './RootStaffPayment/RootStaffPayment'
import StaffPaymentQuery from '@//:artifacts/StaffPaymentQuery.graphql'
import StaffLayout from '../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffPayment.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffPaymentQuery: {
        params: StaffPaymentQuery.params,
        variables: {
          reference: ctx.query.reference
        }
      }
    }
  }
}

RootStaffPayment.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffPayment
