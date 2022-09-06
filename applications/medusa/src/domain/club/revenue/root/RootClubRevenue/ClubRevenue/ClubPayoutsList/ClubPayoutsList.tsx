import { graphql } from 'react-relay/hooks'
import { ClubPayoutsListFragment$key } from '@//:artifacts/ClubPayoutsListFragment.graphql'
import { Box, Stack } from '@chakra-ui/react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import ClubPayoutCard from './ClubPayoutCard/ClubPayoutCard'
import { LoadMoreStackTile } from '@//:modules/content/ContentSelection'
import { usePaginationFragment } from 'react-relay'
import { ClubRevenueQuery } from '@//:artifacts/ClubRevenueQuery.graphql'
import { EmptyBoundary, EmptyPayouts } from '@//:modules/content/Placeholder'

interface Props {
  query: ClubPayoutsListFragment$key
}

const Fragment = graphql`
  fragment ClubPayoutsListFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 2}
    after: {type: String}
  )
  @refetchable(queryName: "ClubPayoutsPaginationQuery" ) {
    payouts (first: $first, after: $after)
    @connection (key: "ClubPayouts_payouts") {
      edges {
        node {
          id
          ...ClubPayoutCardFragment
        }
      }
    }
  }
`

export default function ClubPayoutsList ({ query }: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ClubRevenueQuery, any>(
    Fragment, query
  )

  return (
    <Box>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Payouts
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          <Trans>
            Payouts are generated on the first of every month, and initiated on the 15th of the same month if the
            balance threshold of $100 or more is fulfilled.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <EmptyBoundary
        fallback={<EmptyPayouts />}
        condition={data.payouts.edges.length < 1}
      >
        <Stack spacing={2}>
          {data.payouts.edges.map((item) => <ClubPayoutCard key={item.node.id} query={item.node} />)}
          <LoadMoreStackTile
            text={(
              <Trans>
                Show Older Payouts
              </Trans>
            )}
            hasNext={hasNext}
            onLoadNext={() => loadNext(5)}
            isLoadingNext={isLoadingNext}
          />
        </Stack>
      </EmptyBoundary>
    </Box>
  )
}
