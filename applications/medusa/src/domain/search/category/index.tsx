import RootSearchCategory from './RootSearchCategory/RootSearchCategory'
import SearchCategoryQuery from '@//:artifacts/SearchCategoryQuery.graphql'
import decodeSearchArguments from '../../../common/components/PageHeader/SearchButton/support/decodeSearchArguments'

RootSearchCategory.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootSearchCategory.getRelayPreloadProps = (ctx) => {
  const { query } = ctx

  const {
    categorySlug
  } = query

  return {
    queries: {
      searchCategoryQuery: {
        params: SearchCategoryQuery.params,
        variables: {
          categorySlug,
          ...decodeSearchArguments(query)
        },
        options: {
          fetchPolicy: 'store-or-network'
        }
      }
    }
  }
}
export default RootSearchCategory
