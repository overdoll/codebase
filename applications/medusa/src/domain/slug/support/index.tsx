import RootSupportClub from './RootSupportClub/RootSupportClub'
import ResultSupportClubQueryGraphql from '@//:artifacts/ResultSupportClubQuery.graphql'

RootSupportClub.getTranslationProps = async (ctx) => ({
  translations: {}
})

RootSupportClub.getRelayPreloadProps = (ctx) => {
  return ({
    queries: {
      supportClubQuery: {
        params: ResultSupportClubQueryGraphql.params,
        variables: {
          slug: ctx.query.slug
        }
      }
    }
  })
}

RootSupportClub.getMiddleware = (ctx, data) => {
  if (data.supportClubQuery.response.data?.club == null) {
    return {
      notFound: true
    }
  }

  const foundClubSlug = data.supportClubQuery.response.data.club.slug

  if (foundClubSlug !== ctx.query.slug) {
    return {
      redirect: {
        permanent: true,
        destination: `/${foundClubSlug as string}/support`
      }
    }
  }

  return {}
}

export default RootSupportClub
