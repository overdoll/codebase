import { graphql } from 'react-relay/hooks'
import type {
  StaffDepositRequestPayoutsListFragment$key
} from '@//:artifacts/StaffDepositRequestPayoutsListFragment.graphql'
import { Trans } from '@lingui/macro'
import { EmptyBoundary, EmptyPayouts } from '@//:modules/content/Placeholder'
import {
  Table,
  TableBody,
  TableBodyRowLink,
  TableBodyRowLoadMore,
  TableHeader,
  TableHeaderColumnText,
  TableHeaderRow
} from '@//:modules/content/ThemeComponents/Table/Table'
import { usePaginationFragment } from 'react-relay'
import { StaffDepositRequestQuery } from '@//:artifacts/StaffDepositRequestQuery.graphql'
import StaffClubPayoutCard
  from '../../../../../club/RootStaffClub/StaffClub/StaffClubPayouts/StaffClubPayoutsList/StaffClubPayoutCard/StaffClubPayoutCard'

interface Props {
  query: StaffDepositRequestPayoutsListFragment$key
}

const Fragment = graphql`
  fragment StaffDepositRequestPayoutsListFragment on DepositRequest
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "StaffDepositRequestPayoutsPaginationQuery" ) {
    payouts (first: $first, after: $after)
    @connection(key: "StaffDepositRequestPayouts_payouts") {
      edges {
        node {
          id
          reference
          ...StaffClubPayoutCardFragment
        }
      }
    }
  }
`

export default function StaffDepositRequestPayoutsList ({ query }: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<StaffDepositRequestQuery, any>(
    Fragment,
    query
  )

  return (
    <EmptyBoundary
      fallback={<EmptyPayouts />}
      condition={data.payouts.edges.length < 1}
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
          {data.payouts.edges.map((item) => (
            <TableBodyRowLink
              key={item.node.id}
              href={{
                pathname: '/staff/billing/payout/[reference]',
                query: { reference: item.node.reference }
              }}
            >
              <StaffClubPayoutCard query={item.node} />
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
