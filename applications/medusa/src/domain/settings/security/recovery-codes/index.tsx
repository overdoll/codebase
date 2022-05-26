import RootRecoveryCodesSetup from './RootRecoveryCodesSetup/RootRecoveryCodesSetup'
import RecoveryCodesSetupQuery from '@//:artifacts/RecoveryCodesSetupQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootRecoveryCodesSetup.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootRecoveryCodesSetup.getRelayPreloadProps = () => {
  return {
    queries: {
      recoveryCodesQuery: {
        params: RecoveryCodesSetupQuery.params,
        variables: {}
      }
    }
  }
}

RootRecoveryCodesSetup.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootRecoveryCodesSetup
