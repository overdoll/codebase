import RootAccountClubSupporterSubscriptionSettings
  from './RootAccountClubSupporterSubscriptionSettings/RootAccountClubSupporterSubscriptionSettings'
import AccountClubSupporterSubscriptionSettingsQuery
  from '@//:artifacts/AccountClubSupporterSubscriptionSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootAccountClubSupporterSubscriptionSettings.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootAccountClubSupporterSubscriptionSettings.getRelayPreloadProps = (context) => {
  return {
    queries: {
      subscriptionQuery: {
        params: AccountClubSupporterSubscriptionSettingsQuery.params,
        variables: {
          reference: context.query.reference
        }
      }
    }
  }
}

RootAccountClubSupporterSubscriptionSettings.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootAccountClubSupporterSubscriptionSettings
