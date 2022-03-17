import { graphql } from 'react-relay/hooks'
import { Trans } from '@lingui/macro'
import { usePaginationFragment } from 'react-relay'
import {
  Table,
  TableBody,
  TableBodyRowBackground,
  TableBodyRowLoadMore,
  TableHeader,
  TableHeaderColumnText,
  TableHeaderRow
} from '@//:modules/content/ThemeComponents/Table/Table'
import { EmptyBoundary, EmptyTransactions } from '@//:modules/content/Placeholder'
import AccountTransactionCard from './AccountTransactionCard/AccountTransactionCard'
import { AdminAccountQuery } from '@//:artifacts/AdminAccountQuery.graphql'

interface Props {
  query: any
}

const Fragment = graphql`
  fragment AdminTransactionsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "AdminTransactionsPaginationQuery" ) {
    transactions (first: $first, after: $after)
    @connection(key: "AdminTransactions_transactions") {
      edges {
        node {
          ...AccountTransactionCardFragment
        }
      }
    }
  }
`

export default function AdminTransactions ({
  query
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<AdminAccountQuery, any>(
    Fragment,
    query
  )

  return (
    <EmptyBoundary
      fallback={<EmptyTransactions />}
      condition={data.transactions.edges.length < 1}
    >
      <Table>
        <TableHeader>
          <TableHeaderRow columns={9}>
            <TableHeaderColumnText column={2}>
              <Trans>
                Type
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
            <TableHeaderColumnText column={3}>
              <Trans>
                Info
              </Trans>
            </TableHeaderColumnText>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {data.transactions.edges.map((item, index) => (
            <TableBodyRowBackground key={index}>
              <AccountTransactionCard query={item.node} />
            </TableBodyRowBackground>
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
