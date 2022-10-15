import RootLikes from './RootLikes/RootLikes'
import ResultLikesQuery from '@//:artifacts/ResultLikesQuery.graphql'

RootLikes.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootLikes.getRelayPreloadProps = () => {
  return ({
    queries: {
      likesQuery: {
        params: ResultLikesQuery.params,
        variables: {}
      }
    }
  })
}

export default RootLikes
