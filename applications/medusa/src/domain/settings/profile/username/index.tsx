import RootUsernameSettings from './RootUsernameSettings/RootUsernameSettings'
import UsernameSettingsQuery from '@//:artifacts/UsernameSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootUsernameSettings.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

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
