import RootCurationSettings from './RootCurationSettings/RootCurationSettings'
import CurationSettingsQuery from '@//:artifacts/CurationSettingsQuery.graphql'
import SettingsLayout from '../../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootCurationSettings.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

RootCurationSettings.getRelayPreloadProps = () => {
  return {
    queries: {
      curationQuery: {
        params: CurationSettingsQuery.params,
        variables: {}
      }
    }
  }
}

RootCurationSettings.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootCurationSettings
