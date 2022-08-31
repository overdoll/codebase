import { graphql } from 'react-relay/hooks'
import { ClubTransactionMetricsFragment$key } from '@//:artifacts/ClubTransactionMetricsFragment.graphql'
import { Box, Stack } from '@chakra-ui/react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { LoadMoreStackTile } from '@//:modules/content/ContentSelection'
import { usePaginationFragment } from 'react-relay'
import { ClubRevenueQuery } from '@//:artifacts/ClubRevenueQuery.graphql'
import ClubTransactionMetric from './ClubTransactionMetric/ClubTransactionMetric'

interface Props {
  query: ClubTransactionMetricsFragment$key
}

const Fragment = graphql`
  fragment ClubTransactionMetricsFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 1}
    after: {type: String}
  )
  @refetchable(queryName: "ClubTransactionMetricsPaginationQuery" ) {
    transactionMetrics (first: $first, after: $after)
    @connection (key: "ClubTransactionMetrics_transactionMetrics") {
      edges {
        node {
          ...ClubTransactionMetricFragment
        }
      }
    }
  }
`

export default function ClubTransactionMetrics ({ query }: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ClubRevenueQuery, any>(
    Fragment, query
  )

  if (data.transactionMetrics.edges.length < 1) {
    return <></>
  }

  return (
    <Box>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Transaction Metrics
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          <Trans>
            Transaction metrics help you maintain a good refund and chargeback ratio to keep your club in good standing.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <Stack spacing={2}>
        {data.transactionMetrics.edges.map((item, index) => (
          <ClubTransactionMetric key={index} query={item.node} />
        ))}
        <LoadMoreStackTile
          hasNext={hasNext}
          text={(
            <Trans>
              Show Older Metrics
            </Trans>)}
          onLoadNext={() => loadNext(2)}
          isLoadingNext={isLoadingNext}
        />
      </Stack>
    </Box>
  )
}
