import RootPublicClub from './RootPublicClub/RootPublicClub'
import PublicClubQuery from '@//:artifacts/PublicClubQuery.graphql'

RootPublicClub.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )
  return {
    ...translation.messages
  }
}

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
