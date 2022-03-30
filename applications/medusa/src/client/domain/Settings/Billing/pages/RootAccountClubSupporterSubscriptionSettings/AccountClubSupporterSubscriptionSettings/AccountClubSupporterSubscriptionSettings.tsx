import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, useFragment, usePreloadedQuery } from 'react-relay/hooks'
import type {
  AccountClubSupporterSubscriptionSettingsQuery
} from '@//:artifacts/AccountClubSupporterSubscriptionSettingsQuery.graphql'
import type {
  AccountClubSupporterSubscriptionSettingsFragment$key
} from '@//:artifacts/AccountClubSupporterSubscriptionSettingsFragment.graphql'
import { NotFoundSubscription } from '@//:modules/content/Placeholder'
import AccountActiveClubSupporterSubscriptionSettings
  from './AccountActiveClubSupporterSubscriptionSettings/AccountActiveClubSupporterSubscriptionSettings'
import AccountCancelledClubSupporterSubscriptionSettings
  from './AccountCancelledClubSupporterSubscriptionSettings/AccountCancelledClubSupporterSubscriptionSettings'

interface Props {
  query: PreloadedQuery<AccountClubSupporterSubscriptionSettingsQuery>
}

const Query = graphql`
  query AccountClubSupporterSubscriptionSettingsQuery($reference: String!) {
    accountClubSupporterSubscription(reference: $reference) {
      ... on AccountActiveClubSupporterSubscription {
        ...AccountActiveClubSupporterSubscriptionSettingsFragment
      }
      ... on AccountCancelledClubSupporterSubscription {
        ...AccountCancelledClubSupporterSubscriptionSettingsFragment
      }
      ... on AccountExpiredClubSupporterSubscription {
        __typename
      }
      __typename
    }
    viewer {
      ...AccountClubSupporterSubscriptionSettingsFragment
    }
  }
`

const Fragment = graphql`
  fragment AccountClubSupporterSubscriptionSettingsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  ){
    clubSupporterSubscriptions (first: $first, after: $after, status: [ACTIVE, CANCELLED])
    @connection (key: "ClubSupporterSubscriptions_clubSupporterSubscriptions") {
      __id
      edges {
        __typename
      }
    }
  }
`

export default function AccountClubSupporterSubscriptionSettings (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<AccountClubSupporterSubscriptionSettingsQuery>(
    Query,
    props.query
  )
  const data = useFragment<AccountClubSupporterSubscriptionSettingsFragment$key>(Fragment, queryData.viewer)

  if (queryData.accountClubSupporterSubscription == null) {
    return (<NotFoundSubscription />)
  }

  switch (queryData.accountClubSupporterSubscription.__typename) {
    case 'AccountActiveClubSupporterSubscription':
      return (
        <AccountActiveClubSupporterSubscriptionSettings
          query={queryData.accountClubSupporterSubscription}
          connectionId={data?.clubSupporterSubscriptions.__id as string}
        />
      )
    case 'AccountCancelledClubSupporterSubscription':
      return (
        <AccountCancelledClubSupporterSubscriptionSettings
          query={queryData.accountClubSupporterSubscription}
        />
      )
    case 'AccountExpiredClubSupporterSubscription':
      return (<NotFoundSubscription />)
    default:
      return <></>
  }
}
