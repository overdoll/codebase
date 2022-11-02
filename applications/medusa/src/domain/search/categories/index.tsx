import RootBrowseCategories from './RootBrowseCategories/RootBrowseCategories'
import ResultBrowseCategoriesQuery from '@//:artifacts/ResultBrowseCategoriesQuery.graphql'

RootBrowseCategories.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootBrowseCategories.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      browseCategoriesQuery: {
        params: ResultBrowseCategoriesQuery.params,
        variables: {}
      }
    }
  }
}

export default RootBrowseCategories
