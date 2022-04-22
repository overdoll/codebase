import RootStaffAccount from './RootStaffAccount/RootStaffAccount'
import StaffAccountQuery from '@//:artifacts/StaffAccountQuery.graphql'
import StaffLayout from '../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffAccount.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffAccountQuery: {
        params: StaffAccountQuery.params,
        variables: {
          username: ctx.query.username
        }
      }
    }
  }
}

RootStaffAccount.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffAccount
