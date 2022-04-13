import RootRecoveryCodesSetup from './RootRecoveryCodesSetup/RootRecoveryCodesSetup'
import RecoveryCodesSetupQuery from '@//:artifacts/RecoveryCodesSetupQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootRecoveryCodesSetup.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

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
