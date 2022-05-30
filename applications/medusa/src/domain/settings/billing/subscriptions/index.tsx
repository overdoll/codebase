import RootSubscriptionsSettings from './RootSubscriptionsSettings/RootSubscriptionsSettings'
import SubscriptionsSettingsQuery from '@//:artifacts/SubscriptionsSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootSubscriptionsSettings.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootSubscriptionsSettings.getRelayPreloadProps = () => {
  return {
    queries: {
      subscriptionsQuery: {
        params: SubscriptionsSettingsQuery.params,
        variables: {}
      }
    }
  }
}

RootSubscriptionsSettings.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootSubscriptionsSettings
