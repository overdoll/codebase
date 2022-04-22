import RootPublicClub from './RootPublicClub/RootPublicClub'
import PublicClubQuery from '@//:artifacts/PublicClubQuery.graphql'

RootPublicClub.getRelayPreloadProps = (ctx) => ({
  queries: {
    publicClubQuery: {
      params: PublicClubQuery.params,
      variables: {
        slug: ctx.query.slug
      }
    }
  }
})

export default RootPublicClub
