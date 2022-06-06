import RootSearch from './RootSearch/RootSearch'
import SearchQuery from '@//:artifacts/SearchQuery.graphql'
import { decodeRouterArguments } from '@//:modules/content/Posts/components/PostNavigation/PostsSearch'

RootSearch.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

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
