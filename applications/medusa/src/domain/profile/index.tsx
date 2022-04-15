import RootProfile from './RootProfile/RootProfile'
import ProfileQuery from '@//:artifacts/ProfileQuery.graphql'

RootProfile.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )
  return {
    ...translation.messages
  }
}

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
