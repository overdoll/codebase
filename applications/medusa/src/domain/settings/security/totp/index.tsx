import RootMultiFactorTotpSetup from './RootMultiFactorTotpSetup/RootMultiFactorTotpSetup'
import MultiFactorTotpHeaderQuery from '@//:artifacts/MultiFactorTotpHeaderQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

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
