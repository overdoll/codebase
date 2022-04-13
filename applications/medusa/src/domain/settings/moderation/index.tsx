import RootModeration from './RootModeration/RootModeration'
import QueueSettingsQuery from '@//:artifacts/QueueSettingsQuery.graphql'
import SettingsLayout from '../../../common/components/Layouts/SettingsLayout/SettingsLayout'

RootModeration.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

RootModeration.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      queueQuery: {
        params: QueueSettingsQuery.params,
        variables: {}
      }
    }
  }
}

RootModeration.getLayout = (page) => {
  return (
    <SettingsLayout>
      {page}
    </SettingsLayout>
  )
}

export default RootModeration
