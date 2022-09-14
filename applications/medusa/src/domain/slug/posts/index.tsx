import RootPublicClubPosts from './RootPublicClubPosts/RootPublicClubPosts'
import ResultPublicClubPostsQuery from '@//:artifacts/ResultPublicClubPostsQuery.graphql'
import decodeSearchArguments from '../../../common/components/PageHeader/SearchButton/support/decodeSearchArguments'
import getPostSeed from '@//:modules/content/Posts/support/getPostSeed'

RootPublicClubPosts.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootPublicClubPosts.getRelayPreloadProps = (ctx) => {
  const { query } = ctx

  return {
    queries: {
      publicClubPosts: {
        params: ResultPublicClubPostsQuery.params,
        variables: {
          slug: query.slug,
          ...decodeSearchArguments(query),
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
