import JoinRootWrap from './Join/JoinRootWrap'
import JoinRootData from '@//:artifacts/JoinRootQuery.graphql'

JoinRootWrap.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

JoinRootWrap.getRelayPreloadProps = (ctx) => {
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
export default JoinRootWrap
