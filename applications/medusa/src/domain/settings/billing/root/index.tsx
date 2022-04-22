import RootBillingSettings from './RootBillingSettings/RootBillingSettings'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootBillingSettings.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootBillingSettings
