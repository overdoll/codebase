import { graphql } from 'react-relay/hooks'
import { StaffClubPayoutsListFragment$key } from '@//:artifacts/StaffClubPayoutsListFragment.graphql'
import { Trans } from '@lingui/macro'
import { usePaginationFragment } from 'react-relay'
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
import { StaffClubQuery } from '@//:artifacts/StaffClubQuery.graphql'
import StaffClubPayoutCard from './StaffClubPayoutCard/StaffClubPayoutCard'

interface Props {
  query: StaffClubPayoutsListFragment$key
}

const Fragment = graphql`
  fragment StaffClubPayoutsListFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "StaffClubPayoutsPaginationQuery" ) {
    payouts (first: $first, after: $after)
    @connection(key: "StaffClubPayouts_payouts") {
      edges {
        node {
          reference
          ...StaffClubPayoutCardFragment
        }
      }
    }
  }
`

export default function StaffClubPayoutsList ({ query }: Props): JSX.Element {
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
                Deposit Date
              </Trans>
            </TableHeaderColumnText>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {data.payouts.edges.map((item, index) => (
            <TableBodyRowLink
              key={index}
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
