import RootSecuritySettings from './RootSecuritySettings/RootSecuritySettings'
import MultiFactorSettingsQuery from '@//:artifacts/MultiFactorSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootSecuritySettings.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootSecuritySettings.getRelayPreloadProps = () => {
  return {
    queries: {
      multiFactorSettingsQuery: {
        params: MultiFactorSettingsQuery.params,
        variables: {}
      }
    }
  }
}

RootSecuritySettings.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootSecuritySettings
