import RootUsernameSettings from './RootUsernameSettings/RootUsernameSettings'
import UsernameSettingsQuery from '@//:artifacts/UsernameSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootUsernameSettings.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

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
