import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { AdminCCBillSubscriptionDetailsQuery } from '@//:artifacts/AdminCCBillSubscriptionDetailsQuery.graphql'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { EmptyGeneralSearch } from '@//:modules/content/Placeholder'
import { Box } from '@chakra-ui/react'

type Props = ComponentSearchArguments<any>

const Query = graphql`
  query AdminCCBillSubscriptionDetailsQuery($id: String!) {
    ccbillSubscriptionDetails(ccbillSubscriptionId: $id) {
      id
      account {
        id
      }
      club {
        id
      }
      status
      isRecurring
      signupDate
      cancelDate
      expirationDate
      accountingCurrency
      accountingInitialPrice
      accountingRecurringPrice
      billedCurrency
      billedInitialPrice
      billedRecurringPrice
      subscriptionCurrency
      subscriptionInitialPrice
      subscriptionRecurringPrice
      refundsIssued
      chargebacksIssued
      updatedAt
    }
  }
`

export default function AdminCCBillSubscriptionDetails ({
  searchArguments
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<AdminCCBillSubscriptionDetailsQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  if (queryData.ccbillSubscriptionDetails == null) {
    return <EmptyGeneralSearch />
  }

  return (
    <Box>
      {JSON.stringify(queryData.ccbillSubscriptionDetails)}
    </Box>
  )
}
