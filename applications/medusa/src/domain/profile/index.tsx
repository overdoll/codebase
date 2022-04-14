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

RootProfile.getRelayPreloadProps = () => ({
  queries: {
    profileQuery: {
      params: ProfileQuery.params,
      variables: {}
    }
  }
})

export default RootProfile
