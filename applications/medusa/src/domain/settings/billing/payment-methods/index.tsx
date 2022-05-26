import RootSavedPaymentMethodsSettings from './RootSavedPaymentMethodsSettings/RootSavedPaymentMethodsSettings'
import SavedPaymentMethodsSettingsQuery from '@//:artifacts/SavedPaymentMethodsSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootSavedPaymentMethodsSettings.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

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
