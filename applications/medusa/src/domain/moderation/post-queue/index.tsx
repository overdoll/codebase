import RootPostModerationQueue from './RootPostModerationQueue/RootPostModerationQueue'
import PostModerationQueueQuery from '@//:artifacts/PostModerationQueueQuery.graphql'
import ModerationLayout from '../../../common/components/Layouts/ModerationLayout/ModerationLayout'

RootPostModerationQueue.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

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
