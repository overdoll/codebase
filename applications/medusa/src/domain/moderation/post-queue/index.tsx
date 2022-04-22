import RootPostModerationQueue from './RootPostModerationQueue/RootPostModerationQueue'
import PostModerationQueueQuery from '@//:artifacts/PostModerationQueueQuery.graphql'
import ModerationLayout from '../../../common/components/Layouts/ModerationLayout/ModerationLayout'

RootPostModerationQueue.getRelayPreloadProps = () => ({
  queries: {
    postModerationQueueQuery: {
      params: PostModerationQueueQuery.params,
      variables: {}
    }
  }
})

RootPostModerationQueue.getLayout = (page) => {
  return (
    <ModerationLayout>
      {page}
    </ModerationLayout>
  )
}

export default RootPostModerationQueue
