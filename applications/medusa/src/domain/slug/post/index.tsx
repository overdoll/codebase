import RootPublicPost from './RootPublicPost/RootPublicPost'
import ResultPublicPostQuery from '@//:artifacts/ResultPublicPostQuery.graphql'

RootPublicPost.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootPublicPost.getRelayPreloadProps = (ctx) => ({
  queries: {
    publicPostQuery: {
      params: ResultPublicPostQuery.params,
      variables: {
        reference: ctx.query.reference
      }
    }
  }
})

RootPublicPost.getMiddleware = (ctx, data) => {
  if (data.publicPostQuery.response.data.post == null) {
    return {
      notFound: true
    }
  }

  const foundClubSlug = data.publicPostQuery.response.data.post.club.slug
  const foundPostReference = data.publicPostQuery.response.data.post.reference

  if (foundClubSlug !== ctx.query.slug) {
    return {
      redirect: {
        permanent: true,
        destination: `/${foundClubSlug as string}/post/${foundPostReference as string}`
      }
    }
  }

  return {}
}

export default RootPublicPost
