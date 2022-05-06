import RootStaffPayout from './RootStaffPayout/RootStaffPayout'
import StaffPayoutQuery from '@//:artifacts/StaffPayoutQuery.graphql'
import StaffLayout from '../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffPayout.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffPayoutQuery: {
        params: StaffPayoutQuery.params,
        variables: {
          reference: ctx.query.reference
        }
      }
    }
  }
}

RootStaffPayout.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffPayout
