import RootStaffAccountTransaction from './RootStaffAccountTransaction/RootStaffAccountTransaction'
import StaffAccountTransactionQuery from '@//:artifacts/StaffAccountTransactionQuery.graphql'
import StaffLayout from '../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffAccountTransaction.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffTransactionQuery: {
        params: StaffAccountTransactionQuery.params,
        variables: {
          reference: ctx.query.reference
        }
      }
    }
  }
}

RootStaffAccountTransaction.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffAccountTransaction
