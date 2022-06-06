import RootBillingSettings from './RootBillingSettings/RootBillingSettings'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootBillingSettings.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootBillingSettings.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootBillingSettings
