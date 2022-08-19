import RootDiscoverClubs from './RootDiscoverClubs/RootDiscoverClubs'
import DiscoverClubsQuery from '@//:artifacts/DiscoverClubsQuery.graphql'
import ClubsLayout from '@//:common/components/Layouts/ClubsLayout/ClubsLayout'

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

RootDiscoverClubs.getLayout = (page) => {
  return (
    <ClubsLayout>
      {page}
    </ClubsLayout>
  )
}

export default RootDiscoverClubs
