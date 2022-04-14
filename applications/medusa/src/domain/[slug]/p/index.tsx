import RootPublicPost from './RootPublicPost/RootPublicPost'
import PublicPostQuery from '@//:artifacts/PublicPostQuery.graphql'

RootPublicPost.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )
  return {
    ...translation.messages
  }
}

RootPublicPost.getRelayPreloadProps = () => ({
  queries: {
    publicPostQuery: {
      params: PublicPostQuery.params,
      variables: {}
    }
  }
})

export default RootPublicPost
