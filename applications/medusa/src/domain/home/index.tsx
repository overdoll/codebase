import Home from './RootHome/RootHome'
import HomeQuery from '@//:artifacts/HomeQuery.graphql'

Home.getRelayPreloadProps = () => ({
  queries: {
    homeQuery: {
      params: HomeQuery.params,
      variables: {}
    }
  }
})

export default Home
