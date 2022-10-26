import RootPublicClub from './RootPublicClub/RootPublicClub'
import ResultPublicClubQuery from '@//:artifacts/ResultPublicClubQuery.graphql'
import PublicClubLayout from '../../components/PublicClubLayout/PublicClubLayout'

RootPublicClub.getTranslationProps = async (ctx) => ({
  translations: await import(`../../__locale__/${ctx.locale as string}/index`)
})

RootPublicClub.getCookieProps = () => {
  return {
    cookies: {
      postSeed: Date.now().toString()
    }
  }
}

RootPublicClub.getRelayPreloadProps = (ctx) => {
  return ({
    queries: {
      publicClubQuery: {
        params: ResultPublicClubQuery.params,
        variables: {
          slug: ctx.query.slug
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

RootPublicClub.getLayout = (page) => {
  return (
    <PublicClubLayout>
      {page}
    </PublicClubLayout>
  )
}

export default RootPublicClub
