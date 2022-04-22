import RootClubsFeed from './RootClubsFeed/RootClubsFeed'
import ClubsFeedQuery from '@//:artifacts/ClubsFeedQuery.graphql'

RootClubsFeed.getRelayPreloadProps = () => ({
  queries: {
    clubsFeedQuery: {
      params: ClubsFeedQuery.params,
      variables: {}
    }
  }
})

export default RootClubsFeed
