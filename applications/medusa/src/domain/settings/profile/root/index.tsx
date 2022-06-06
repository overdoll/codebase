import RootProfileSettings from './RootProfileSettings/RootProfileSettings'
import ProfileSettingsQuery from '@//:artifacts/ProfileSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootProfileSettings.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootProfileSettings.getRelayPreloadProps = () => {
  return {
    queries: {
      profileSettingsQuery: {
        params: ProfileSettingsQuery.params,
        variables: {}
      }
    }
  }
}

RootProfileSettings.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootProfileSettings
