import RootPublicClubPosts from './RootPublicClubPosts/RootPublicClubPosts'
import PublicPostQuery from '@//:artifacts/PublicPostQuery.graphql'
import { decodeRouterArguments } from '@//:modules/content/Posts/components/PostNavigation/PostsSearch'

RootPublicClubPosts.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootPublicClubPosts.getRelayPreloadProps = (ctx) => {
  const { query } = ctx

  return {
    queries: {
      publicClubPosts: {
        params: PublicPostQuery.params,
        variables: {
          slug: query.slug,
          ...decodeRouterArguments(query)
        },
        options: {
          fetchPolicy: 'store-or-network'
        }
      }
    }
  }
}

export default RootPublicClubPosts
