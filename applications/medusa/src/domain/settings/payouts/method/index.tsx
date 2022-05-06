import RootPayoutMethodSettings from './RootPayoutMethodSettings/RootPayoutMethodSettings'
import PayoutMethodSettingsQuery from '@//:artifacts/PayoutMethodSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootPayoutMethodSettings.getRelayPreloadProps = () => {
  return {
    queries: {
      payoutMethodSettingsQuery: {
        params: PayoutMethodSettingsQuery.params,
        variables: {}
      }
    }
  }
}

RootPayoutMethodSettings.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootPayoutMethodSettings
