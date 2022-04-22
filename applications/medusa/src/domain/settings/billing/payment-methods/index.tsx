import RootSavedPaymentMethodsSettings from './RootSavedPaymentMethodsSettings/RootSavedPaymentMethodsSettings'
import SavedPaymentMethodsSettingsQuery from '@//:artifacts/SavedPaymentMethodsSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootSavedPaymentMethodsSettings.getRelayPreloadProps = () => {
  return {
    queries: {
      paymentMethodsQuery: {
        params: SavedPaymentMethodsSettingsQuery.params,
        variables: {}
      }
    }
  }
}

RootSavedPaymentMethodsSettings.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootSavedPaymentMethodsSettings
