import RootPublicPost from './RootPublicPost/RootPublicPost'
import PublicPostQuery from '@//:artifacts/PublicPostQuery.graphql'

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
