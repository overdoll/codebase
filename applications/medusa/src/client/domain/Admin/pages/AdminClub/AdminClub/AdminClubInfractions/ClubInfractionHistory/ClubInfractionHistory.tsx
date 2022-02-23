import { graphql } from 'react-relay/hooks'
import { ClubInfractionHistoryFragment$key } from '@//:artifacts/ClubInfractionHistoryFragment.graphql'
import { Stack } from '@chakra-ui/react'
import {
  TableHeaderBackground,
  TableHeaderText,
  TableRow,
  TableRowBackground,
  TableRowColumnText
} from '@//:modules/content/ThemeComponents/TableRow/TableRow'
import { usePaginationFragment } from 'react-relay'
import { SessionsPaginationQuery } from '@//:artifacts/SessionsPaginationQuery.graphql'
import { LoadMoreStackTile } from '@//:modules/content/ContentSelection'
import useFormattedDate from '../../../../../helpers/useFormattedDate'
import { Trans } from '@lingui/macro'
import useDateDistance from '../../../../../helpers/useDateDistance'
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
        <TableHeaderBackground>
          <TableRow columns={8}>
            <TableHeaderText column={2}>
              <Trans>
                Issued
              </Trans>
            </TableHeaderText>
            <TableHeaderText column={4}>
              <Trans>
                Rule
              </Trans>
            </TableHeaderText>
            <TableHeaderText column={2}>
              <Trans>
                Duration
              </Trans>
            </TableHeaderText>
          </TableRow>
        </TableHeaderBackground>
        <Stack spacing={2}>
          {data.infractionHistory.edges.map((item, index) => (
            <TableRowBackground key={index}>
              <TableRow columns={8}>
                <TableRowColumnText column={2}>
                  {useFormattedDate(item.node.issuedAt)}
                </TableRowColumnText>
                <TableRowColumnText column={4}>
                  {item.node.rule.title}
                </TableRowColumnText>
                <TableRowColumnText column={2}>
                  {useDateDistance(item.node.issuedAt, item.node.expiresAt)}
                </TableRowColumnText>
              </TableRow>
            </TableRowBackground>))}
          <LoadMoreStackTile
            hasNext={hasNext}
            onLoadNext={() => loadNext(5)}
            isLoadingNext={isLoadingNext}
          />
        </Stack>
      </Stack>
    </EmptyBoundary>
  )
}
