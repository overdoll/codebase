import RootPublicClubPosts from './RootPublicClubPosts/RootPublicClubPosts'
import ResultPublicClubPostsQuery from '@//:artifacts/ResultPublicClubPostsQuery.graphql'
import getPostSeed from '@//:modules/content/HookedComponents/Post/support/getPostSeed'

RootPublicClubPosts.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootPublicClubPosts.getCookieProps = () => {
  return {
    cookies: {
      postSeed: Date.now().toString()
    }
  }
}

RootPublicClubPosts.getRelayPreloadProps = (ctx) => {
  const { query } = ctx

  return {
    queries: {
      publicClubPosts: {
        params: ResultPublicClubPostsQuery.params,
        variables: {
          slug: query.slug,
          sortBy: 'ALGORITHM',
          ...getPostSeed(ctx)
        },
        options: {
          fetchPolicy: 'store-or-network'
        }
      }
    }
  }
}

export default RootPublicClubPosts
