import RootCreateClub from './RootCreateClub/RootCreateClub'
import CreateClubQuery from '@//:artifacts/CreateClubQuery.graphql'

RootCreateClub.getRelayPreloadProps = () => ({
  queries: {
    createClubQuery: {
      params: CreateClubQuery.params,
      variables: {}
    }
  }
})

export default RootCreateClub
