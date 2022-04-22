import VerifyToken from './VerifyToken/VerifyToken'
import VerifyTokenQuery from '@//:artifacts/VerifyTokenQuery.graphql'

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
