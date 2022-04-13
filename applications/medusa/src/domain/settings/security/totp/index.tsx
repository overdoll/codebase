import RootMultiFactorTotpSetup from './RootMultiFactorTotpSetup/RootMultiFactorTotpSetup'
import MultiFactorTotpHeaderQuery from '@//:artifacts/MultiFactorTotpHeaderQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootMultiFactorTotpSetup.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

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
