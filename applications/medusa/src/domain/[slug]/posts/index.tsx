import RootPublicClubPosts from './RootPublicClubPosts/RootPublicClubPosts'
import PublicPostQuery from '@//:artifacts/PublicPostQuery.graphql'

RootPublicClubPosts.getRelayPreloadProps = () => ({
  queries: {
    publicClubPosts: {
      params: PublicPostQuery.params,
      variables: {}
    }
  }
})

export default RootPublicClubPosts
