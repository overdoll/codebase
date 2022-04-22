import RootSubscriptionsSettings from './RootSubscriptionsSettings/RootSubscriptionsSettings'
import SubscriptionsSettingsQuery from '@//:artifacts/SubscriptionsSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

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
