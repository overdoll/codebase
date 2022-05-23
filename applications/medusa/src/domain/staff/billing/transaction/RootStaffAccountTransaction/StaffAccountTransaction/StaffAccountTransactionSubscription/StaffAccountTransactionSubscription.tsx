import { graphql, useFragment } from 'react-relay/hooks'
import type {
  StaffAccountTransactionSubscriptionFragment$key
} from '@//:artifacts/StaffAccountTransactionSubscriptionFragment.graphql'
import StaffAccountClubSupporterSubscriptionPreview
  from '../../../../../account/RootStaffAccount/StaffAccount/StaffClubSupporterSubscriptions/StaffAccountClubSupporterSubscriptionPreview/StaffAccountClubSupporterSubscriptionPreview'
import { TableBodyRowLink } from '@//:modules/content/ThemeComponents/Table/Table'

interface Props {
  query: StaffAccountTransactionSubscriptionFragment$key
}

const Fragment = graphql`
  fragment StaffAccountTransactionSubscriptionFragment on AccountTransaction {
    clubSupporterSubscription @required(action: THROW) {
      ... on IAccountClubSupporterSubscription {
        reference
      }
      ...StaffAccountClubSupporterSubscriptionPreviewFragment
    }
  }
`

export default function StaffAccountTransactionSubscription ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TableBodyRowLink href={{
      pathname: '/staff/billing/subscription/[reference]',
      query: {
        reference: data?.clubSupporterSubscription?.reference
      }
    }}
    >
      <StaffAccountClubSupporterSubscriptionPreview query={data.clubSupporterSubscription} />
    </TableBodyRowLink>
  )
}
