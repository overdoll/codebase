import RootPublicClubPosts from './RootPublicClubPosts/RootPublicClubPosts'
import ResultPublicClubPostsQuery from '@//:artifacts/ResultPublicClubPostsQuery.graphql'
import getPostSeed from '@//:modules/content/HookedComponents/Post/support/getPostSeed'
import PublicClubLayout from '../../components/PublicClubLayout/PublicClubLayout'

RootPublicClubPosts.getTranslationProps = async (ctx) => ({
  translations: await import(`../../__locale__/${ctx.locale as string}/index`)
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
          sortBy: 'NEW',
          ...getPostSeed(ctx)
        },
        options: {
          fetchPolicy: 'store-or-network'
        }
      }
    }
  }
}

RootPublicClubPosts.getLayout = (page) => {
  return (
    <PublicClubLayout>
      {page}
    </PublicClubLayout>
  )
}

export default RootPublicClubPosts
