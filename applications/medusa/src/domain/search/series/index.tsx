import RootSearchSeries from './RootSearchSeries/RootSearchSeries'
import SearchSeriesQuery from '@//:artifacts/SearchSeriesQuery.graphql'
import decodeSearchArguments from '../../../common/components/PageHeader/SearchButton/support/decodeSearchArguments'
import getPostSeed from '@//:modules/content/Posts/support/getPostSeed'

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
          ...decodeSearchArguments(query),
          ...getPostSeed(ctx)
        },
        options: {
          fetchPolicy: 'store-or-network'
        }
      }
    }
  }
}

RootSearchSeries.getMiddleware = (ctx, data) => {
  if (data.searchSeriesQuery.response.data.serial == null) {
    return {
      notFound: true
    }
  }

  const foundSeriesSlug = data.searchSeriesQuery.response.data.serial.slug

  if (foundSeriesSlug !== ctx.query.seriesSlug) {
    return {
      redirect: {
        permanent: true,
        destination: `/search/series/${foundSeriesSlug as string}`
      }
    }
  }

  return {}
}

export default RootSearchSeries
