import RootCreateClub from './RootCreateClub/RootCreateClub'
import CreateClubQuery from '@//:artifacts/CreateClubQuery.graphql'

RootCreateClub.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootCreateClub.getRelayPreloadProps = () => ({
  queries: {
    createClubQuery: {
      params: CreateClubQuery.params,
      variables: {}
    }
  }
})

export default RootCreateClub
