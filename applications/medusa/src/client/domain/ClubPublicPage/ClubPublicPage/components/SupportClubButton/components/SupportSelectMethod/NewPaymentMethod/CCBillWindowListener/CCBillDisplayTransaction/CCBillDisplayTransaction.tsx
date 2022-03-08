import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { CCBillDisplayTransactionQuery } from '@//:artifacts/CCBillDisplayTransactionQuery.graphql'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'

interface Props extends ComponentSearchArguments<any> {
}

const Query = graphql`
  query CCBillDisplayTransactionQuery($token: String!) {
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

export default function CCBillDisplayTransaction ({
  searchArguments
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<CCBillDisplayTransactionQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  if (queryData?.ccbillTransactionDetails == null) {
    return <>transaction not found</>
  }

  if (queryData.ccbillTransactionDetails.approved) {
    return (
      <>approved</>
    )
  }

  return (
    <>declined</>
  )
}
