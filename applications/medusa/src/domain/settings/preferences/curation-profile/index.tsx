import RootCurationProfileSetup from './RootCurationProfileSetup/RootCurationProfileSetup'
import CurationProfileSetupQuery from '@//:artifacts/CurationProfileSetupQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootCurationProfileSetup.getRelayPreloadProps = () => {
  return {
    queries: {
      curationQuery: {
        params: CurationProfileSetupQuery.params,
        variables: {}
      }
    }
  }
}

RootCurationProfileSetup.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootCurationProfileSetup
