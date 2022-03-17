import { graphql } from 'react-relay/hooks'
import type {
  ClubSupporterSubscriptionsSettingsFragment$key
} from '@//:artifacts/ClubSupporterSubscriptionsSettingsFragment.graphql'
import AccountActiveClubSupporterSubscriptionPreview
  from './AccountActiveClubSupporterSubscriptionPreview/AccountActiveClubSupporterSubscriptionPreview'
import { usePaginationFragment } from 'react-relay'
import { LoadMoreStackTile, StackTile } from '@//:modules/content/ContentSelection'
import { Stack } from '@chakra-ui/react'
import { EmptyBoundary, EmptySubscriptions } from '@//:modules/content/Placeholder'
import type { SubscriptionsSettingsQuery } from '@//:artifacts/SubscriptionsSettingsQuery.graphql'
import AccountCancelledClubSupporterSubscriptionPreview
  from './AccountCancelledClubSupporterSubscriptionPreview/AccountCancelledClubSupporterSubscriptionPreview'

interface Props {
  query: ClubSupporterSubscriptionsSettingsFragment$key
}

const Fragment = graphql`
  fragment ClubSupporterSubscriptionsSettingsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "ClubSupporterSubscriptionsPaginationQuery" ) {
    clubSupporterSubscriptions (first: $first, after: $after)
    @connection (key: "ClubSupporterSubscriptions_clubSupporterSubscriptions") {
      edges {
        node {
          __typename
          ...on AccountActiveClubSupporterSubscription {
            ...AccountActiveClubSupporterSubscriptionPreviewFragment
          }
          ...on AccountCancelledClubSupporterSubscription {
            ...AccountCancelledClubSupporterSubscriptionPreviewFragment
          }
        }
      }
    }
  }
`
export default function ClubSupporterSubscriptionsSettings ({ query }: Props): JSX.Element {
  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<SubscriptionsSettingsQuery, any>(
    Fragment,
    query
  )

  const AccountSupporterSubscriptionPreview = ({ node }: { node: any }): JSX.Element => {
    switch (node.__typename) {
      case 'AccountActiveClubSupporterSubscription':
        return <AccountActiveClubSupporterSubscriptionPreview query={node} />
      case 'AccountCancelledClubSupporterSubscription':
        return <AccountCancelledClubSupporterSubscriptionPreview query={node} />
      default:
        return <></>
    }
  }

  return (
    <EmptyBoundary
      fallback={<EmptySubscriptions />}
      condition={data.clubSupporterSubscriptions.edges.length < 1}
    >
      <Stack spacing={2}>
        {data.clubSupporterSubscriptions.edges.map((item, index) => (
          <StackTile key={index}>
            <AccountSupporterSubscriptionPreview node={item.node} />
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
