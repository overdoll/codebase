import RootModeration from './RootModeration/RootModeration'
import QueueSettingsQuery from '@//:artifacts/QueueSettingsQuery.graphql'
import SettingsLayout from '../../../common/components/Layouts/SettingsLayout/SettingsLayout'

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
