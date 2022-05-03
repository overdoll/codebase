import { graphql } from 'react-relay/hooks'
import type { StaffPayoutPaymentsListFragment$key } from '@//:artifacts/StaffPayoutPaymentsListFragment.graphql'
import { Trans } from '@lingui/macro'
import { EmptyBoundary, EmptyPayments } from '@//:modules/content/Placeholder'
import {
  Table,
  TableBody,
  TableBodyRowLink,
  TableBodyRowLoadMore,
  TableHeader,
  TableHeaderColumnText,
  TableHeaderRow
} from '@//:modules/content/ThemeComponents/Table/Table'
import StaffClubPaymentCard
  from '../../../../../club/RootStaffClub/StaffClub/StaffClubPayments/StaffClubPaymentsList/StaffClubPaymentCard/StaffClubPaymentCard'
import { usePaginationFragment } from 'react-relay'
import { StaffPayoutQuery } from '@//:artifacts/StaffPayoutQuery.graphql'

interface Props {
  query: StaffPayoutPaymentsListFragment$key
}

const Fragment = graphql`
  fragment StaffPayoutPaymentsListFragment on ClubPayout
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "StaffPayoutPaymentsPaginationQuery" ) {
    payments (first: $first, after: $after)
    @connection(key: "StaffPayoutPayments_payments") {
      edges {
        node {
          reference
          ...StaffClubPaymentCardFragment
        }
      }
    }
  }
`

export default function StaffPayoutPaymentsList ({ query }: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<StaffPayoutQuery, any>(
    Fragment,
    query
  )

  return (
    <EmptyBoundary
      fallback={<EmptyPayments />}
      condition={data.payments.edges.length < 1}
    >
      <Table>
        <TableHeader>
          <TableHeaderRow columns={8}>
            <TableHeaderColumnText column={2}>
              <Trans>
                Status
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={2}>
              <Trans>
                Amount
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={2}>
              <Trans>
                Settlement Date
              </Trans>
            </TableHeaderColumnText>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {data.payments.edges.map((item, index) => (
            <TableBodyRowLink
              key={index}
              href={{
                pathname: '/club/billing/payment/[reference]',
                query: { reference: item.node.reference }
              }}
            >
              <StaffClubPaymentCard query={item.node} />
            </TableBodyRowLink>
          ))}
          <TableBodyRowLoadMore
            hasNext={hasNext}
            onLoadNext={() => loadNext(5)}
            isLoadingNext={isLoadingNext}
          />
        </TableBody>
      </Table>
    </EmptyBoundary>
  )
}
