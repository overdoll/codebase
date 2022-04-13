import RootSubscriptionsSettings from './RootSubscriptionsSettings/RootSubscriptionsSettings'
import SubscriptionsSettingsQuery from '@//:artifacts/SubscriptionsSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootSubscriptionsSettings.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

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
