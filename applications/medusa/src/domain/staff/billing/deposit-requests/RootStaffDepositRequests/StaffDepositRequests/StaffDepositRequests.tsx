import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffDepositRequestsQuery } from '@//:artifacts/StaffDepositRequestsQuery.graphql'
import { usePaginationFragment } from 'react-relay'
import {
  Table,
  TableBody,
  TableBodyRowLink,
  TableBodyRowLoadMore,
  TableHeader,
  TableHeaderColumnText,
  TableHeaderRow
} from '@//:modules/content/ThemeComponents/Table/Table'
import { Trans } from '@lingui/macro'
import StaffDepositRequestCard from './StaffDepositRequestCard/StaffDepositRequestCard'
import { Stack } from '@chakra-ui/react'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'

interface Props {
  query: PreloadedQuery<StaffDepositRequestsQuery>
}

const Query = graphql`
  query StaffDepositRequestsQuery {
    ...StaffDepositRequestsFragment
  }
`

const Fragment = graphql`
  fragment StaffDepositRequestsFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "DepositRequestsPaginationQuery" ) {
    depositRequests (first: $first, after: $after)
    @connection(key: "DepositRequestsFragment_depositRequests") {
      edges {
        node {
          reference
          ...StaffDepositRequestCardFragment
        }
      }
    }
  }
`

export default function StaffDepositRequests ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffDepositRequestsQuery>(
    Query,
    query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<StaffDepositRequestsQuery, any>(
    Fragment,
    queryData
  )

  return (
    <Stack spacing={2}>
      <Alert colorScheme='teal' status='info'>
        <AlertIcon />
        <AlertDescription
          align='center'
          lineHeight={5}
          fontSize='sm'
        >
          <Trans>
            You should wait at least 2 days for a deposit request to have all payouts processed correctly.
          </Trans>
        </AlertDescription>
      </Alert>
      <Table>
        <TableHeader>
          <TableHeaderRow columns={5}>
            <TableHeaderColumnText column={2}>
              <Trans>
                Total
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={1}>
              <Trans>
                Method
              </Trans>
            </TableHeaderColumnText>
            <TableHeaderColumnText column={2}>
              <Trans>
                Due Date
              </Trans>
            </TableHeaderColumnText>
          </TableHeaderRow>
        </TableHeader>
        <EmptyBoundary
          fallback={(
            <SmallBackgroundBox>
              <Trans>
                No deposit requests
              </Trans>
            </SmallBackgroundBox>)}
          condition={data.depositRequests.edges.length < 1}
        >
          <TableBody>
            {data.depositRequests.edges.map((item, index) => (
              <TableBodyRowLink
                key={index}
                href={{
                  pathname: '/staff/billing/deposit-requests/[reference]',
                  query: { reference: item.node.reference }
                }}
              >
                <StaffDepositRequestCard query={item.node} />
              </TableBodyRowLink>
            ))}
            <TableBodyRowLoadMore
              hasNext={hasNext}
              onLoadNext={() => loadNext(5)}
              isLoadingNext={isLoadingNext}
            />
          </TableBody>
        </EmptyBoundary>
      </Table>
    </Stack>
  )
}
