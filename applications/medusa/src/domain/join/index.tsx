import RootJoin from './RootJoin/RootJoin'
import ResultJoinQuery from '@//:artifacts/ResultJoinQuery.graphql'

RootJoin.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootJoin.getRelayPreloadProps = (ctx) => {
  const tokenCookie = ctx.cookies.get('token') != null ? decodeURIComponent(ctx.cookies.get('token')) : null

  const formattedCookie = tokenCookie != null ? tokenCookie.split(';')[0] : ''

  // cookie empty sometimes for some reason, esp when refreshing the page
  return {
    queries: {
      joinQuery: {
        params: ResultJoinQuery.params,
        variables: {
          token: formattedCookie
        },
        options: {
          fetchPolicy: 'network-only'
        }
      }
    }
  }
}
export default RootJoin
