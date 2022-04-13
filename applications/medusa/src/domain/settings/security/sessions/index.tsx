import RootSessionsSettings from './RootSessionsSettings/RootSessionsSettings'
import SessionsSettingsQuery from '@//:artifacts/SessionsSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootSessionsSettings.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

RootSessionsSettings.getRelayPreloadProps = () => {
  return {
    queries: {
      sessionsQuery: {
        params: SessionsSettingsQuery.params,
        variables: {}
      }
    }
  }
}

RootSessionsSettings.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootSessionsSettings
