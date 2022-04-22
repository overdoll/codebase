import JoinRoot from './Join/JoinRoot'
import JoinRootData from '@//:artifacts/JoinRootQuery.graphql'

JoinRoot.getRelayPreloadProps = (ctx) => {
  let tokenCookie = ctx.cookies.get('token')

  if (tokenCookie != null) {
    tokenCookie = tokenCookie.split(';')[0]
  }
  return {
    queries: {
      joinQuery: {
        params: JoinRootData.params,
        variables: {
          token: tokenCookie ?? ''
        }
      }
    }
  }
}
export default JoinRoot
