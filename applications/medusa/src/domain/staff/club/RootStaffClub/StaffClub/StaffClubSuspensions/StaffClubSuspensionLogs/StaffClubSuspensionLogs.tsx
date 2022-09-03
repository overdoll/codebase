import { graphql } from 'react-relay/hooks'
import { StaffClubSuspensionLogsFragment$key } from '@//:artifacts/StaffClubSuspensionLogsFragment.graphql'
import { Trans } from '@lingui/macro'
import { usePaginationFragment } from 'react-relay'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import {
  Table,
  TableBody,
  TableBodyRowBackground,
  TableBodyRowLoadMore,
  TableHeader,
  TableHeaderColumnText,
  TableHeaderRow
} from '@//:modules/content/ThemeComponents/Table/Table'
import { StaffClubQuery } from '@//:artifacts/StaffClubQuery.graphql'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import StaffClubSuspensionLog from './StaffClubSuspensionLog/StaffClubSuspensionLog'

interface Props {
  query: StaffClubSuspensionLogsFragment$key
}

const Fragment = graphql`
  fragment StaffClubSuspensionLogsFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "StaffClubSuspensionLogsPaginationQuery" ) {
    suspensionLogs (first: $first, after: $after)
    @connection(key: "StaffClubSuspensionLogs_suspensionLogs") {
      edges {
        node {
          ...on ClubIssuedSuspensionLog {
            id
          }
          ...on ClubRemovedSuspensionLog {
            id
          }
          ...StaffClubSuspensionLogFragment
        }
      }
    }
  }
`

export default function StaffClubSuspensionLogs ({ query }: Props): JSX.Element {
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
      fallback={(
        <SmallBackgroundBox>
          <Trans>
            No suspension logs found
          </Trans>
        </SmallBackgroundBox>)}
      condition={data.suspensionLogs.edges.length < 1}
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
                Staff
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={2}>
              <Trans>
                Reason
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={2}>
              <Trans>
                Expires
              </Trans>
            </TableHeaderColumnText>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {data.suspensionLogs.edges.map((item) => (
            <TableBodyRowBackground
              key={item.node.id}
            >
              <StaffClubSuspensionLog query={item.node} />
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
