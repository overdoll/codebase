import RootStaffAccountClubSupporterSubscription from './RootStaffAccountClubSupporterSubscription/RootStaffAccountClubSupporterSubscription'
import StaffAccountClubSupporterSubscriptionQuery from '@//:artifacts/StaffAccountClubSupporterSubscriptionQuery.graphql'
import StaffLayout from '../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffAccountClubSupporterSubscription.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      staffSubscriptionQuery: {
        params: StaffAccountClubSupporterSubscriptionQuery.params,
        variables: {
          reference: ctx.query.reference
        }
      }
    }
  }
}

RootStaffAccountClubSupporterSubscription.getLayout = (page) => {
  return (
    <StaffLayout>
      {page}
    </StaffLayout>
  )
}

export default RootStaffAccountClubSupporterSubscription
