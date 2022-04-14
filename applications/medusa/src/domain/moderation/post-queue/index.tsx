import RootPostModerationQueue from './RootPostModerationQueue/RootPostModerationQueue'
import PostModerationQueueQuery from '@//:artifacts/PostModerationQueueQuery.graphql'

RootPostModerationQueue.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )
  return {
    ...translation.messages
  }
}

RootPostModerationQueue.getRelayPreloadProps = () => ({
  queries: {
    postModerationQueueQuery: {
      params: PostModerationQueueQuery.params,
      variables: {}
    }
  }
})

export default RootPostModerationQueue
