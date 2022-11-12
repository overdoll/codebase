import RootClubPayment from './RootClubPayment/RootClubPayment'
import ClubPaymentQuery from '@//:artifacts/ClubPaymentQuery.graphql'
import ClubLayout from '../../../../common/components/Layouts/ClubLayout/ClubLayout'

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

export default RootClubPayment
