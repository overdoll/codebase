import RootClubsFeed from './RootClubsFeed/RootClubsFeed'
import ClubsFeedQuery from '@//:artifacts/ClubsFeedQuery.graphql'
import ClubsLayout from '@//:common/components/Layouts/ClubsLayout/ClubsLayout'

RootClubsFeed.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootClubsFeed.getRelayPreloadProps = () => ({
  queries: {
    clubsFeedQuery: {
      params: ClubsFeedQuery.params,
      variables: {}
    }
  }
})

RootClubsFeed.getLayout = (page) => {
  return (
    <ClubsLayout>
      {page}
    </ClubsLayout>
  )
}

export default RootClubsFeed
