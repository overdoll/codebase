import Root from './Root/Root'
import RootQuery from '@//:artifacts/RootQuery.graphql'

Root.getRelayPreloadProps = () => ({
  queries: {
    rootQuery: {
      params: RootQuery.params,
      variables: {}
    }
  }
})

export default Root
