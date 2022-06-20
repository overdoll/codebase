import RootPublicClubPosts from './RootPublicClubPosts/RootPublicClubPosts'
import PublicClubPostsQuery from '@//:artifacts/PublicClubPostsQuery.graphql'
import { decodeRouterArguments } from '@//:modules/content/Posts/components/PostNavigation/PostsSearch'

RootPublicClubPosts.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootPublicClubPosts.getRelayPreloadProps = (ctx) => {
  const { query } = ctx

  return {
    queries: {
      publicClubPosts: {
        params: PublicClubPostsQuery.params,
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
