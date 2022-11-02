import RootBrowseSeries from './RootBrowseSeries/RootBrowseSeries'
import ResultBrowseSeriesQuery from '@//:artifacts/ResultBrowseSeriesQuery.graphql'

RootBrowseSeries.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootBrowseSeries.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      browseSeriesQuery: {
        params: ResultBrowseSeriesQuery.params,
        variables: {}
      }
    }
  }
}

export default RootBrowseSeries
