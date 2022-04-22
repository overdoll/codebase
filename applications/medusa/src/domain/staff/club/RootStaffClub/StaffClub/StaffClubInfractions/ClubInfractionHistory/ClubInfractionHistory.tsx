import { graphql } from 'react-relay/hooks'
import { ClubInfractionHistoryFragment$key } from '@//:artifacts/ClubInfractionHistoryFragment.graphql'
import { Stack } from '@chakra-ui/react'
import {
  Table,
  TableBody,
  TableBodyColumn,
  TableBodyRow,
  TableBodyRowBackground,
  TableBodyRowLoadMore,
  TableHeader,
  TableHeaderColumnText,
  TableHeaderRow
} from '@//:modules/content/ThemeComponents/Table/Table'
import { usePaginationFragment } from 'react-relay'
import { SessionsPaginationQuery } from '@//:artifacts/SessionsPaginationQuery.graphql'
import { Trans } from '@lingui/macro'
import useDateDistance from '../../../../../../../common/support/useDateDistance'
import useFormattedDate from '../../../../../../../common/support/useFormattedDate'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'

interface Props {
  query: ClubInfractionHistoryFragment$key
}

const Fragment = graphql`
  fragment ClubInfractionHistoryFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String}
  )
  @refetchable(queryName: "ClubInfractionHistoryPaginationQuery" ) {
    infractionHistory (first: $first, after: $after)
    @connection(key: "ClubInfractionHistory_infractionHistory") {
      edges {
        node {
          id
          issuedAt
          expiresAt
          rule {
            title
          }
        }
      }
    }
  }
`

export default function ClubInfractionHistory ({ query }: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<SessionsPaginationQuery, any>(
    Fragment,
    query
  )

  return (
    <EmptyBoundary
      fallback={<SmallBackgroundBox><Trans>No infractions found</Trans></SmallBackgroundBox>}
      condition={data.infractionHistory.edges.length < 1}
    >
      <Stack spacing={1}>
        <Table>
          <TableHeader>
            <TableHeaderRow columns={8}>
              <TableHeaderColumnText column={2}>
                <Trans>
                  Issued
                </Trans>
              </TableHeaderColumnText>
              <TableHeaderColumnText column={4}>
                <Trans>
                  Rule
                </Trans>
              </TableHeaderColumnText>
              <TableHeaderColumnText column={2}>
                <Trans>
                  Duration
                </Trans>
              </TableHeaderColumnText>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {data.infractionHistory.edges.map((item, index) => (
              <TableBodyRowBackground key={index}>
                <TableBodyRow columns={8}>
                  <TableBodyColumn column={2}>
                    {useFormattedDate(item.node.issuedAt)}
                  </TableBodyColumn>
                  <TableBodyColumn column={4}>
                    {item.node.rule.title}
                  </TableBodyColumn>
                  <TableBodyColumn column={2}>
                    {useDateDistance(item.node.issuedAt, item.node.expiresAt)}
                  </TableBodyColumn>
                </TableBodyRow>
              </TableBodyRowBackground>))}
            <TableBodyRowLoadMore
              hasNext={hasNext}
              onLoadNext={() => loadNext(5)}
              isLoadingNext={isLoadingNext}
            />
          </TableBody>
        </Table>
      </Stack>
    </EmptyBoundary>
  )
}
