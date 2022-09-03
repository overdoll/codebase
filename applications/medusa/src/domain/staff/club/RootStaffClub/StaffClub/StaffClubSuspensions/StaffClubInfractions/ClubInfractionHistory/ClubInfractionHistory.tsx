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
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'

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

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

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
            {data.infractionHistory.edges.map((item) => (
              <TableBodyRowBackground key={item.node.id}>
                <TableBodyRow columns={8}>
                  <TableBodyColumn column={2}>
                    {formatDistanceToNowStrict(new Date(item.node.issuedAt), {
                      locale,
                      addSuffix: true
                    })}
                  </TableBodyColumn>
                  <TableBodyColumn column={4}>
                    {item.node.rule.title}
                  </TableBodyColumn>
                  <TableBodyColumn column={2}>
                    {formatDistanceStrict(new Date(item.node.issuedAt), new Date(item.node.expiresAt), { locale })}
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
