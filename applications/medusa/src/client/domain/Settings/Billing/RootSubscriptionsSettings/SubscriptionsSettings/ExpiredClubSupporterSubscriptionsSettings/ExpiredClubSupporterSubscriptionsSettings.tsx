import { graphql } from 'react-relay/hooks'
import type {
  ExpiredClubSupporterSubscriptionsSettingsFragment$key
} from '@//:artifacts/ExpiredClubSupporterSubscriptionsSettingsFragment.graphql'
import { usePaginationFragment } from 'react-relay'
import { LoadMoreStackTile, StackTile } from '@//:modules/content/ContentSelection'
import { Stack } from '@chakra-ui/react'
import { EmptyBoundary, EmptySubscriptions } from '@//:modules/content/Placeholder'
import type { SubscriptionsSettingsQuery } from '@//:artifacts/SubscriptionsSettingsQuery.graphql'
import ExpiredAccountClubSupporterSubscriptionPreview
  from './ExpiredAccountClubSupporterSubscriptionPreview/ExpiredAccountClubSupporterSubscriptionPreview'

interface Props {
  query: ExpiredClubSupporterSubscriptionsSettingsFragment$key
}

const Fragment = graphql`
  fragment ExpiredClubSupporterSubscriptionsSettingsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "ExpiredClubSupporterSubscriptionsPaginationQuery" ) {
    expiredClubSupporterSubscriptions (first: $first, after: $after)
    @connection (key: "ExpiredClubSupporterSubscriptions_expiredClubSupporterSubscriptions") {
      edges {
        node {
          ...ExpiredAccountClubSupporterSubscriptionPreviewFragment
        }
      }
    }
  }
`
export default function ExpiredClubSupporterSubscriptionsSettings ({ query }: Props): JSX.Element {
  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<SubscriptionsSettingsQuery, any>(
    Fragment,
    query
  )

  return (
    <EmptyBoundary
      fallback={<EmptySubscriptions />}
      condition={data.expiredClubSupporterSubscriptions.edges.length < 1}
    >
      <Stack spacing={2}>
        {data.expiredClubSupporterSubscriptions.edges.map((item, index) => (
          <StackTile key={index}>
            <ExpiredAccountClubSupporterSubscriptionPreview query={item.node} />
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
