import RootDiscoverClubs from './RootDiscoverClubs/RootDiscoverClubs'
import DiscoverClubsQuery from '@//:artifacts/DiscoverClubsQuery.graphql'

RootDiscoverClubs.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )
  return {
    ...translation.messages
  }
}

RootDiscoverClubs.getRelayPreloadProps = () => ({
  queries: {
    discoverClubsQuery: {
      params: DiscoverClubsQuery.params,
      variables: {}
    }
  }
})

export default RootDiscoverClubs
