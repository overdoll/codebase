import { graphql, PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import { useEffect } from 'react'
import { TestPaymentFlowTransactionQuery } from '@//:artifacts/TestPaymentFlowTransactionQuery.graphql'

const TestPaymentFlowTransactionGQL = graphql`
  query TestPaymentFlowTransactionQuery($token: String!) {
    ccbillTransactionDetails(token: $token) {
      id
      approved
      declineError
      declineText
      linkedAccountClubSupporterSubscription {
        id
      }
    }
  }
`

interface Props {
  token: string
  preloadedQuery: PreloadedQuery<TestPaymentFlowTransactionQuery>
}

export default function TestPaymentFlowTransaction ({
  token,
  preloadedQuery
}: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    TestPaymentFlowTransactionGQL,
    preloadedQuery
  )

  const data = usePreloadedQuery(TestPaymentFlowTransactionGQL, queryRef as PreloadedQuery<TestPaymentFlowTransactionQuery>)

  if (data == null) {
    return (
      <div>
        no token found or invalid token
      </div>
    )
  }

  useEffect(() => {
    loadQuery({ token })
  }, [token])

  return (
    <div>
      <div>
        {((data.ccbillTransactionDetails?.approved) === true) ? 'approved' : 'declined'}
      </div>
      {((data.ccbillTransactionDetails?.approved) === false) && (
        <>
          <div> error: {data.ccbillTransactionDetails?.declineError} </div>
          <div> text: {data.ccbillTransactionDetails?.declineText} </div>
        </>
      )}
    </div>
  )
}
