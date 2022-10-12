import RootDiscoverClubs from './RootDiscoverClubs/RootDiscoverClubs'
import DiscoverClubsQuery from '@//:artifacts/DiscoverClubsQuery.graphql'

RootDiscoverClubs.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootDiscoverClubs.getRelayPreloadProps = () => ({
  queries: {
    discoverClubsQuery: {
      params: DiscoverClubsQuery.params,
      variables: {}
    }
  }
})

export default RootDiscoverClubs
