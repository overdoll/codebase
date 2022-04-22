import RootSearch from './RootSearch/RootSearch'
import SearchQuery from '@//:artifacts/SearchQuery.graphql'
import { decodeRouterArguments } from '@//:modules/content/Posts/components/PostNavigation/PostsSearch'

RootSearch.getRelayPreloadProps = (ctx) => {
  const { query } = ctx

  return {
    queries: {
      searchQuery: {
        params: SearchQuery.params,
        variables: {
          ...decodeRouterArguments(query)
        },
        options: {
          fetchPolicy: 'store-or-network'
        }
      }
    }
  }
}
export default RootSearch
