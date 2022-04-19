import RootClubsFeed from './RootClubsFeed/RootClubsFeed'
import ClubsFeedQuery from '@//:artifacts/ClubsFeedQuery.graphql'

RootClubsFeed.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )
  return {
    ...translation.messages
  }
}

RootClubsFeed.getRelayPreloadProps = () => ({
  queries: {
    clubsFeedQuery: {
      params: ClubsFeedQuery.params,
      variables: {}
    }
  }
})

export default RootClubsFeed
