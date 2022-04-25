import RootPayoutsSettings from './RootPayoutsSettings/RootPayoutsSettings'
import PayoutsSettingsQuery from '@//:artifacts/PayoutsSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootPayoutsSettings.getRelayPreloadProps = () => {
  return {
    queries: {
      payoutsSettingsQuery: {
        params: PayoutsSettingsQuery.params,
        variables: {}
      }
    }
  }
}

RootPayoutsSettings.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootPayoutsSettings
