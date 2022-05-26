import RootMultiFactorTotpSetup from './RootMultiFactorTotpSetup/RootMultiFactorTotpSetup'
import MultiFactorTotpHeaderQuery from '@//:artifacts/MultiFactorTotpHeaderQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootMultiFactorTotpSetup.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootMultiFactorTotpSetup.getRelayPreloadProps = () => {
  return {
    queries: {
      totpQuery: {
        params: MultiFactorTotpHeaderQuery.params,
        variables: {}
      }
    }
  }
}

RootMultiFactorTotpSetup.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootMultiFactorTotpSetup
