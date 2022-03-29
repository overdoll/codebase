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
import { AdminTransactionsListFragment$key } from '@//:artifacts/AdminTransactionsListFragment.graphql'
import AdminTransactionCard from './AdminTransactionCard/AdminTransactionCard'

interface Props {
  query: AdminTransactionsListFragment$key
  hasNext: boolean
  loadNext: () => {}
  isLoadingNext: boolean
}

const Fragment = graphql`
  fragment AdminTransactionsListFragment on AccountTransactionConnection {
    edges {
      node {
        reference
        ...AdminTransactionCardFragment
      }
    }
  }
`

export default function AdminTransactionsList ({
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
          {data.edges.map((item, index) => (
            <TableBodyRowLink key={index} to={`/admin/transaction/${item.node.reference}`}>
              <AdminTransactionCard query={item.node} />
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
