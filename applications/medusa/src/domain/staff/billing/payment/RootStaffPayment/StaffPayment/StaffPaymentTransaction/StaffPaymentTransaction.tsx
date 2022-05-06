import { graphql, useFragment } from 'react-relay/hooks'
import type { StaffPaymentTransactionFragment$key } from '@//:artifacts/StaffPaymentTransactionFragment.graphql'
import StaffTransactionCard
  from '../../../../subscription/RootStaffAccountClubSupporterSubscription/StaffAccountClubSupporterSubscription/StaffSubscriptionTransactions/StaffTransactionsList/StaffTransactionCard/StaffTransactionCard'
import { TableBodyRowLink } from '@//:modules/content/ThemeComponents/Table/Table'

interface Props {
  query: StaffPaymentTransactionFragment$key
}

const Fragment = graphql`
  fragment StaffPaymentTransactionFragment on ClubPayment {
    accountTransaction {
      reference
      ...StaffTransactionCardFragment
    }
  }
`

export default function StaffPaymentTransaction ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TableBodyRowLink href={{
      pathname: '/staff/billing/transaction/[reference]',
      query: {
        reference: data.accountTransaction.reference
      }
    }}
    >
      <StaffTransactionCard query={data.accountTransaction} />
    </TableBodyRowLink>
  )
}
