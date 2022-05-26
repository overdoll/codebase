import RootPublicClub from './RootPublicClub/RootPublicClub'
import PublicClubQuery from '@//:artifacts/PublicClubQuery.graphql'

RootPublicClub.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootPublicClub.getRelayPreloadProps = (ctx) => ({
  queries: {
    publicClubQuery: {
      params: PublicClubQuery.params,
      variables: {
        slug: ctx.query.slug
      }
    }
  }
})

export default RootPublicClub
