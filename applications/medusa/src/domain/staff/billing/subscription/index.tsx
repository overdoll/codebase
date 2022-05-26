import RootStaffAccountClubSupporterSubscription
  from './RootStaffAccountClubSupporterSubscription/RootStaffAccountClubSupporterSubscription'
import StaffAccountClubSupporterSubscriptionQuery
  from '@//:artifacts/StaffAccountClubSupporterSubscriptionQuery.graphql'
import StaffLayout from '../../../../common/components/Layouts/StaffLayout/StaffLayout'

RootStaffAccountClubSupporterSubscription.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

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
