import RootAccountDetailsSettings from './RootAccountDetailsSettings/RootAccountDetailsSettings'
import AccountDetailsSettingsQuery from '@//:artifacts/AccountDetailsSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootAccountDetailsSettings.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootAccountDetailsSettings.getRelayPreloadProps = () => {
  return {
    queries: {
      accountDetailsSettingsQuery: {
        params: AccountDetailsSettingsQuery.params,
        variables: {}
      }
    }
  }
}

RootAccountDetailsSettings.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootAccountDetailsSettings
