import RootPublicPost from './RootPublicPost/RootPublicPost'
import PublicPostQuery from '@//:artifacts/PublicPostQuery.graphql'

RootPublicPost.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootPublicPost.getRelayPreloadProps = (ctx) => ({
  queries: {
    publicPostQuery: {
      params: PublicPostQuery.params,
      variables: {
        reference: ctx.query.reference
      }
    }
  }
})

export default RootPublicPost
