import { graphql } from 'react-relay/hooks'
import { StaffClubPaymentsListFragment$key } from '@//:artifacts/StaffClubPaymentsListFragment.graphql'
import { Trans } from '@lingui/macro'
import { usePaginationFragment } from 'react-relay'
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
import { StaffClubQuery } from '@//:artifacts/StaffClubQuery.graphql'
import StaffClubPaymentCard from './StaffClubPaymentCard/StaffClubPaymentCard'

interface Props {
  query: StaffClubPaymentsListFragment$key
}

const Fragment = graphql`
  fragment StaffClubPaymentsListFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "StaffClubPaymentsPaginationQuery" ) {
    payments (first: $first, after: $after)
    @connection(key: "StaffClubPayments_payments") {
      edges {
        node {
          reference
          ...StaffClubPaymentCardFragment
        }
      }
    }
  }
`

export default function StaffClubPaymentsList ({ query }: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<StaffClubQuery, any>(
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
                Deposit Date
              </Trans>
            </TableHeaderColumnText>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {data.payments.edges.map((item, index) => (
            <TableBodyRowLink
              key={index}
              href={{
                pathname: '/staff/billing/payment/[reference]',
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
