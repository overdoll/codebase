import RootClubsFeed from './RootClubsFeed/RootClubsFeed'
import ResultClubsFeedQuery from '@//:artifacts/ResultClubsFeedQuery.graphql'
import ClubsLayout from '@//:common/components/Layouts/ClubsLayout/ClubsLayout'

RootClubsFeed.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootClubsFeed.getRelayPreloadProps = () => ({
  queries: {
    clubsFeedQuery: {
      params: ResultClubsFeedQuery.params,
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
