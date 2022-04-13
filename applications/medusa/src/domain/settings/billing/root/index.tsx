import RootBillingSettings from './RootBillingSettings/RootBillingSettings'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootBillingSettings.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

RootBillingSettings.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootBillingSettings
