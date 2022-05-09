import RootDeleteAccountSettings from './RootDeleteAccountSettings/RootDeleteAccountSettings'
import DeleteAccountSettingsQuery from '@//:artifacts/DeleteAccountSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootDeleteAccountSettings.getRelayPreloadProps = () => {
  return {
    queries: {
      deleteAccountSettingsQuery: {
        params: DeleteAccountSettingsQuery.params,
        variables: {}
      }
    }
  }
}

RootDeleteAccountSettings.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootDeleteAccountSettings
