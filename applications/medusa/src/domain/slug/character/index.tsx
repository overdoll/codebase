import RootPublicClubCharacter from './RootPublicClubCharacter/RootPublicClubCharacter'
import ResultPublicClubCharacterQuery from '@//:artifacts/ResultPublicClubCharacterQuery.graphql'
import getPostSeed from '@//:modules/content/HookedComponents/Post/support/getPostSeed'

RootPublicClubCharacter.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootPublicClubCharacter.getCookieProps = () => {
  return {
    cookies: {
      postSeed: Date.now().toString()
    }
  }
}

RootPublicClubCharacter.getRelayPreloadProps = (ctx) => {
  const { query } = ctx

  const {
    slug,
    characterSlug
  } = query

  return {
    queries: {
      publicClubCharacterQuery: {
        params: ResultPublicClubCharacterQuery.params,
        variables: {
          clubSlug: slug,
          characterSlug,
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

RootPublicClubCharacter.getMiddleware = (ctx, data) => {
  if (data.publicClubCharacterQuery.response.data.character == null) {
    return {
      notFound: true
    }
  }

  const foundCharacterSlug = data.publicClubCharacterQuery.response.data.character.slug
  const foundCharacterClubSlug = data.publicClubCharacterQuery.response.data?.character?.club?.slug

  if (foundCharacterSlug !== ctx.query.characterSlug || ctx.query.slug !== foundCharacterClubSlug) {
    return {
      redirect: {
        permanent: true,
        destination: `/${foundCharacterClubSlug as string}/character/${foundCharacterSlug as string}`
      }
    }
  }

  return {}
}

export default RootPublicClubCharacter
