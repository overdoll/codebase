import VerifyToken from './VerifyToken/VerifyToken'
import VerifyTokenQuery from '@//:artifacts/VerifyTokenQuery.graphql'

VerifyToken.getTranslationProps = async (ctx) => ({
  translations: await import(`./__locale__/${ctx.locale as string}/index`)
})

VerifyToken.getRelayPreloadProps = (ctx) => {
  return {
    queries: {
      verifyTokenQuery: {
        params: VerifyTokenQuery.params,
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
export default VerifyToken
