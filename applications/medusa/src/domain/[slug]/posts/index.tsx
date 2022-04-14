import RootPublicClubPosts from './RootPublicClubPosts/RootPublicClubPosts'
import PublicPostQuery from '@//:artifacts/PublicPostQuery.graphql'

RootPublicClubPosts.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )
  return {
    ...translation.messages
  }
}

RootPublicClubPosts.getRelayPreloadProps = () => ({
  queries: {
    publicClubPosts: {
      params: PublicPostQuery.params,
      variables: {}
    }
  }
})

export default RootPublicClubPosts
