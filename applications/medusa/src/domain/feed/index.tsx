import RootFeed from './RootFeed/RootFeed'
import ResultFeedQuery from '@//:artifacts/ResultFeedQuery.graphql'

RootFeed.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootFeed.getRelayPreloadProps = () => {
  return ({
    queries: {
      feedQuery: {
        params: ResultFeedQuery.params,
        variables: {}
      }
    }
  })
}

export default RootFeed
