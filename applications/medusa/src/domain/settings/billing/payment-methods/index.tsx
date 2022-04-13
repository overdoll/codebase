import RootSavedPaymentMethodsSettings from './RootSavedPaymentMethodsSettings/RootSavedPaymentMethodsSettings'
import SavedPaymentMethodsSettingsQuery from '@//:artifacts/SavedPaymentMethodsSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootSavedPaymentMethodsSettings.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

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
