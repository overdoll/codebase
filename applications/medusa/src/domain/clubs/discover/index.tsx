import RootDiscoverClubs from './RootDiscoverClubs/RootDiscoverClubs'
import DiscoverClubsQuery from '@//:artifacts/DiscoverClubsQuery.graphql'

RootDiscoverClubs.getRelayPreloadProps = () => ({
  queries: {
    discoverClubsQuery: {
      params: DiscoverClubsQuery.params,
      variables: {}
    }
  }
})

export default RootDiscoverClubs
