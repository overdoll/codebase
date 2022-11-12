import RootClubPayment from './RootClubPayment/RootClubPayment'
import ClubPaymentQuery from '@//:artifacts/ClubPaymentQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'
import ClubRedirect from '@//:modules/redirects/club'

RootClubPayment.getRelayPreloadProps = (ctx) => {
  const { query: { reference } } = ctx

  return {
    queries: {
      clubPaymentQuery: {
        params: ClubPaymentQuery.params,
        variables: {
          reference: reference
        }
      }
    }
  }
}

RootClubPayment.getLayout = (page) => {
  return (
    <ClubLayout>
      {page}
    </ClubLayout>
  )
}

RootClubPayment.getMiddleware = (ctx, data) => {
  return ClubRedirect(data)
}

export default RootClubPayment
