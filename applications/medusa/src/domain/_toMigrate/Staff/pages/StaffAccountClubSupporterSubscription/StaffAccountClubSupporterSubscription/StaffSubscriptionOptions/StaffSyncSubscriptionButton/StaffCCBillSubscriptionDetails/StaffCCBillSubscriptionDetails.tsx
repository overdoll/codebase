import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { StaffCCBillSubscriptionDetailsQuery } from '@//:artifacts/StaffCCBillSubscriptionDetailsQuery.graphql'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { EmptyGeneralSearch } from '@//:modules/content/Placeholder'
import { Box } from '@chakra-ui/react'

type Props = ComponentSearchArguments<any>

const Query = graphql`
  query StaffCCBillSubscriptionDetailsQuery($id: String!) {
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

export default function StaffCCBillSubscriptionDetails ({
  searchArguments
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<StaffCCBillSubscriptionDetailsQuery>(
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
