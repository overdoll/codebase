import RootUsernameSettings from './RootUsernameSettings/RootUsernameSettings'
import UsernameSettingsQuery from '@//:artifacts/UsernameSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootUsernameSettings.getRelayPreloadProps = () => {
  return {
    queries: {
      usernameSettingsQuery: {
        params: UsernameSettingsQuery.params,
        variables: {}
      }
    }
  }
}

RootUsernameSettings.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootUsernameSettings
