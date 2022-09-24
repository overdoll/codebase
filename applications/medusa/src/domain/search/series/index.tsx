import RootSearchSeries from './RootSearchSeries/RootSearchSeries'
import ResultSearchSeriesQuery from '@//:artifacts/ResultSearchSeriesQuery.graphql'
import getPostSeed from '@//:modules/content/HookedComponents/Post/support/getPostSeed'

RootSearchSeries.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootSearchSeries.getCookieProps = () => {
  return {
    cookies: {
      postSeed: Date.now().toString()
    }
  }
}

RootSearchSeries.getRelayPreloadProps = (ctx) => {
  const { query } = ctx

  const {
    seriesSlug
  } = query

  return {
    queries: {
      searchSeriesQuery: {
        params: ResultSearchSeriesQuery.params,
        variables: {
          seriesSlug,
          sortBy: 'ALGORITHM',
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
