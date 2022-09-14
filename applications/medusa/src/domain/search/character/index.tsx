import RootSearchCharacter from './RootSearchCharacter/RootSearchCharacter'
import ResultSearchCharacterQuery from '@//:artifacts/ResultSearchCharacterQuery.graphql'
import decodeSearchArguments from '../../../common/components/PageHeader/SearchButton/support/decodeSearchArguments'
import getPostSeed from '@//:modules/content/Posts/support/getPostSeed'

RootSearchCharacter.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootSearchCharacter.getRelayPreloadProps = (ctx) => {
  const { query } = ctx

  const {
    seriesSlug,
    characterSlug
  } = query

  return {
    queries: {
      searchCharacterQuery: {
        params: ResultSearchCharacterQuery.params,
        variables: {
          seriesSlug,
          characterSlug,
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

RootSearchCharacter.getMiddleware = (ctx, data) => {
  if (data.searchCharacterQuery.response.data.character == null) {
    return {
      notFound: true
    }
  }

  const foundCharacterSlug = data.searchCharacterQuery.response.data.character.slug
  const foundCharacterSeriesSlug = data.searchCharacterQuery.response.data?.character?.series?.slug

  if (foundCharacterSlug !== ctx.query.characterSlug || ctx.query.seriesSlug !== foundCharacterSeriesSlug) {
    return {
      redirect: {
        permanent: true,
        destination: `/search/series/${foundCharacterSeriesSlug as string}/${foundCharacterSlug as string}`
      }
    }
  }

  return {}
}

export default RootSearchCharacter
