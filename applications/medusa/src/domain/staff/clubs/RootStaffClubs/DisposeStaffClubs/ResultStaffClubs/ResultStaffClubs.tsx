import { graphql, usePaginationFragment } from 'react-relay'
import { ResultStaffClubsFragment$key } from '@//:artifacts/ResultStaffClubsFragment.graphql'
import { DisposeStaffClubsQuery } from '@//:artifacts/DisposeStaffClubsQuery.graphql'
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
import { Trans } from '@lingui/macro'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

interface Props {
  query: ResultStaffClubsFragment$key
}

const Fragment = graphql`
  fragment ResultStaffClubsFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
    name: {type: String}
  )
  @refetchable(queryName: "ResultStaffClubsPaginationFragment" )
  {
    clubs (
      first: $first,
      after: $after,
      name: $name
    ) @connection(key: "ResultStaffClubsConnection_clubs")
    {
      edges {
        node {
          id
          name
          reference
          slug
        }
      }
    }
  }
`

export default function ResultStaffClubs (props: Props): JSX.Element {
  const { query } = props

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<DisposeStaffClubsQuery, any>(
    Fragment,
    query
  )

  return (
    <Table>
      <TableHeader>
        <TableHeaderRow columns={7}>
          <TableHeaderColumnText column={2}>
            <Trans>
              Name
            </Trans>
          </TableHeaderColumnText>
          <TableHeaderColumnText column={4}>
            <Trans>
              Reference
            </Trans>
          </TableHeaderColumnText>
          <TableHeaderColumnText column={1}>
            <></>
          </TableHeaderColumnText>
        </TableHeaderRow>
      </TableHeader>
      <EmptyBoundary
        fallback={(
          <SmallBackgroundBox>
            <Trans>
              No clubs
            </Trans>
          </SmallBackgroundBox>)}
        condition={data.clubs.edges.length < 1}
      >
        <TableBody>
          {data.clubs.edges.map((item) => (
            <TableBodyRowBackground key={item.node.id}>
              <TableBodyRow columns={7}>
                <TableBodyColumn column={2}>
                  {item.node.name}
                </TableBodyColumn>
                <TableBodyColumn column={4}>
                  {item.node.reference}
                </TableBodyColumn>
                <TableBodyColumn column={1}>
                  <LinkButton
                    size='sm'
                    variant='link'
                    href={`/staff/club/${item.node.slug as string}`}
                  >
                    <Trans>
                      View
                    </Trans>
                  </LinkButton>
                </TableBodyColumn>
              </TableBodyRow>
            </TableBodyRowBackground>))}
          <TableBodyRowLoadMore
            hasNext={hasNext}
            onLoadNext={() => loadNext(5)}
            isLoadingNext={isLoadingNext}
          />
        </TableBody>
      </EmptyBoundary>
    </Table>
  )
}
