import { graphql, useFragment } from 'react-relay/hooks'
import { Trans } from '@lingui/macro'
import {
  Table,
  TableBody,
  TableBodyRowLink,
  TableBodyRowLoadMore,
  TableHeader,
  TableHeaderColumnText,
  TableHeaderRow
} from '@//:modules/content/ThemeComponents/Table/Table'
import { EmptyBoundary, EmptyTransactions } from '@//:modules/content/Placeholder'
import { StaffTransactionsListFragment$key } from '@//:artifacts/StaffTransactionsListFragment.graphql'
import StaffTransactionCard from './StaffTransactionCard/StaffTransactionCard'
import { LoadMoreFn } from 'react-relay/relay-hooks/useLoadMoreFunction'

interface Props {
  query: StaffTransactionsListFragment$key
  hasNext: boolean
  loadNext: LoadMoreFn<any>
  isLoadingNext: boolean
}

const Fragment = graphql`
  fragment StaffTransactionsListFragment on AccountTransactionConnection {
    edges {
      node {
        id
        reference
        ...StaffTransactionCardFragment
      }
    }
  }
`

export default function StaffTransactionsList ({
  query,
  hasNext,
  loadNext,
  isLoadingNext
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <EmptyBoundary
      fallback={<EmptyTransactions />}
      condition={data.edges.length < 1}
    >
      <Table>
        <TableHeader>
          <TableHeaderRow columns={8}>
            <TableHeaderColumnText column={2}>
              <Trans>
                Type
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={2}>
              <Trans>
                Price
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={2}>
              <Trans>
                Club
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={2}>
              <Trans>
                Date
              </Trans>
            </TableHeaderColumnText>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {data.edges.map((item) => (
            <TableBodyRowLink
              key={item.node.id}
              href={{
                pathname: '/staff/billing/transaction/[reference]',
                query: {
                  reference: item.node.reference
                }
              }}
            >
              <StaffTransactionCard query={item.node} />
            </TableBodyRowLink>
          ))}
          <TableBodyRowLoadMore
            hasNext={hasNext}
            onLoadNext={loadNext}
            isLoadingNext={isLoadingNext}
          />
        </TableBody>
      </Table>
    </EmptyBoundary>
  )
}
