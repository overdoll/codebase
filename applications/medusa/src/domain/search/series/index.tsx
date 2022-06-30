import RootSearchSeries from './RootSearchSeries/RootSearchSeries'
import SearchSeriesQuery from '@//:artifacts/SearchSeriesQuery.graphql'
import decodeSearchArguments from '../../../common/components/PageHeader/SearchButton/support/decodeSearchArguments'

RootSearchSeries.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootSearchSeries.getRelayPreloadProps = (ctx) => {
  const { query } = ctx

  const {
    seriesSlug
  } = query

  return {
    queries: {
      searchSeriesQuery: {
        params: SearchSeriesQuery.params,
        variables: {
          seriesSlug,
          ...decodeSearchArguments(query)
        },
        options: {
          fetchPolicy: 'store-or-network'
        }
      }
    }
  }
}
export default RootSearchSeries
