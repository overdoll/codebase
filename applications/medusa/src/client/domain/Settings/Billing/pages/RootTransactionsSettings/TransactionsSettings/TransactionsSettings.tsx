import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { TransactionsSettingsQuery } from '@//:artifacts/TransactionsSettingsQuery.graphql'
import { usePaginationFragment } from 'react-relay'
import { LoadMoreStackTile, StackTile } from '@//:modules/content/ContentSelection'
import { Stack } from '@chakra-ui/react'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { EmptyBoundary, EmptyTransactions } from '@//:modules/content/Placeholder'
import TransactionSettingsCard from './TransactionSettingsCard/TransactionSettingsCard'

interface Props {
  query: PreloadedQuery<TransactionsSettingsQuery>
}

const Query = graphql`
  query TransactionsSettingsQuery {
    viewer @required(action: THROW) {
      ...TransactionsSettingsFragment
    }
  }
`

const Fragment = graphql`
  fragment TransactionsSettingsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "TransactionsSettingsPaginationQuery" ) {
    transactions (first: $first, after: $after)
    @connection (key: "TransactionsSettings_transactions") {
      __id
      edges {
        node {
          ...TransactionSettingsCardFragment
        }
      }
    }
  }
`
export default function TransactionsSettings (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<TransactionsSettingsQuery>(
    Query,
    props.query
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<TransactionsSettingsQuery, any>(
    Fragment,
    queryData.viewer
  )

  return (
    <EmptyBoundary
      fallback={<EmptyTransactions />}
      condition={data.transactions.edges.length < 1}
    >
      <Stack spacing={2}>
        {data.transactions.edges.map((item, index) => (
          <StackTile key={index}>
            <LargeBackgroundBox w='100%'>
              <TransactionSettingsCard query={item.node} />
            </LargeBackgroundBox>
          </StackTile>
        ))}
        <LoadMoreStackTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(3)}
          isLoadingNext={isLoadingNext}
        />
      </Stack>
    </EmptyBoundary>
  )
}
