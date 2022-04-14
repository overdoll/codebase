import RootSearch from './RootSearch/RootSearch'
import SearchQuery from '@//:artifacts/SearchQuery.graphql'
import { decodeRouterArguments } from '@//:modules/content/Posts/components/PostNavigation/PostsSearch'

RootSearch.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  return {
    ...translation.messages
  }
}

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
