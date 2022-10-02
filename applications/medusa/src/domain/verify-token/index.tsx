import RootVerifyToken from './RootVerifyToken/RootVerifyToken'
import ResultVerifyTokenQuery from '@//:artifacts/ResultVerifyTokenQuery.graphql'

RootVerifyToken.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

RootVerifyToken.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      verifyTokenQuery: {
        params: ResultVerifyTokenQuery.params,
        variables: {
          token: ctx.query.token ?? '',
          secret: ctx.query.secret ?? ''
        },
        options: {
          fetchPolicy: 'store-or-network'
        }
      }
    }
  }
}
export default RootVerifyToken
