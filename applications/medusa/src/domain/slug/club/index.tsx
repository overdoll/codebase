import RootPublicClub from './RootPublicClub/RootPublicClub'
import ResultPublicClubQuery from '@//:artifacts/ResultPublicClubQuery.graphql'
import getPostSeed from '@//:modules/content/Posts/support/getPostSeed'

RootPublicClub.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootPublicClub.getRelayPreloadProps = (ctx) => {
  return ({
    queries: {
      publicClubQuery: {
        params: ResultPublicClubQuery.params,
        variables: {
          slug: ctx.query.slug,
          ...getPostSeed(ctx)
        }
      }
    }
  })
}

RootPublicClub.getMiddleware = (ctx, data) => {
  if (data.publicClubQuery.response.data?.club == null) {
    return {
      notFound: true
    }
  }

  const foundClubSlug = data.publicClubQuery.response.data.club.slug

  if (foundClubSlug !== ctx.query.slug) {
    return {
      redirect: {
        permanent: true,
        destination: `/${foundClubSlug as string}`
      }
    }
  }

  return {}
}

export default RootPublicClub
