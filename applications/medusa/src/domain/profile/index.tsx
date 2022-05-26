import RootProfile from './RootProfile/RootProfile'
import ProfileQuery from '@//:artifacts/ProfileQuery.graphql'

RootProfile.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootProfile.getRelayPreloadProps = (ctx) => ({
  queries: {
    profileQuery: {
      params: ProfileQuery.params,
      variables: {
        username: ctx.query.username
      }
    }
  }
})

export default RootProfile
