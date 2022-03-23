import { graphql } from 'react-relay/hooks'
import type {
  ClubSupporterSubscriptionsSettingsFragment$key
} from '@//:artifacts/ClubSupporterSubscriptionsSettingsFragment.graphql'
import AccountActiveClubSupporterSubscriptionPreview
  from './AccountActiveClubSupporterSubscriptionPreview/AccountActiveClubSupporterSubscriptionPreview'
import { usePaginationFragment } from 'react-relay'
import { LoadMoreStackTile } from '@//:modules/content/ContentSelection'
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
    clubSupporterSubscriptions (first: $first, after: $after, status: [ACTIVE])
    @connection (key: "ClubSupporterSubscriptions_clubSupporterSubscriptions") {
      __id
      edges {
        node {
          __id
          __typename
          ...on IAccountClubSupporterSubscription {
            id
          }
          ...on AccountActiveClubSupporterSubscription {
            id
            ...AccountActiveClubSupporterSubscriptionPreviewFragment
          }
          ...on AccountCancelledClubSupporterSubscription {
            id
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
    if (node?.__typename == null) return <></>
    switch (node.__typename) {
      case 'AccountActiveClubSupporterSubscription':
        return (
          <AccountActiveClubSupporterSubscriptionPreview
            connectionId={data.clubSupporterSubscriptions.__id}
            query={node}
          />
        )
      case 'AccountCancelledClubSupporterSubscription':
        return (
          <AccountCancelledClubSupporterSubscriptionPreview
            query={node}
          />
        )
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
          <AccountSupporterSubscriptionPreview key={index} node={item.node} />

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
