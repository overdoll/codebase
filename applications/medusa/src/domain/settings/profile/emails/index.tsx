import RootEmailsSettings from './RootEmailsSettings/RootEmailsSettings'
import EmailsSettingsQuery from '@//:artifacts/EmailsSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootEmailsSettings.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootEmailsSettings.getRelayPreloadProps = () => {
  return {
    queries: {
      emailsSettingsQuery: {
        params: EmailsSettingsQuery.params,
        variables: {}
      }
    }
  }
}

RootEmailsSettings.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootEmailsSettings
