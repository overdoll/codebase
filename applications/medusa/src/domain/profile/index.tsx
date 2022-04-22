import RootProfile from './RootProfile/RootProfile'
import ProfileQuery from '@//:artifacts/ProfileQuery.graphql'

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
