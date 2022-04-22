import RootPublicClubPosts from './RootPublicClubPosts/RootPublicClubPosts'
import PublicPostQuery from '@//:artifacts/PublicPostQuery.graphql'
import { decodeRouterArguments } from '@//:modules/content/Posts/components/PostNavigation/PostsSearch'

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
