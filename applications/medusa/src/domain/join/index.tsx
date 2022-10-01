import RootJoin from './RootJoin/RootJoin'
import ResultJoinQuery from '@//:artifacts/ResultJoinQuery.graphql'

RootJoin.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootJoin.getRelayPreloadProps = (ctx) => {
  let tokenCookie = ctx.cookies.get('token')

  if (tokenCookie != null) {
    tokenCookie = tokenCookie.split(';')[0]
  }
  return {
    queries: {
      joinQuery: {
        params: ResultJoinQuery.params,
        variables: {
          token: tokenCookie ?? ''
        }
      }
    }
  }
}
export default RootJoin
