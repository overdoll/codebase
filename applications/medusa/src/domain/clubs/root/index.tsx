import RootMyClubs from './RootMyClubs/RootMyClubs'
import MyClubsQuery from '@//:artifacts/MyClubsQuery.graphql'

RootMyClubs.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )
  return {
    ...translation.messages
  }
}

RootMyClubs.getRelayPreloadProps = () => ({
  queries: {
    clubsQuery: {
      params: MyClubsQuery.params,
      variables: {}
    }
  }
})

export default RootMyClubs
