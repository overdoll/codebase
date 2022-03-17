import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { SubscriptionSettingsQuery } from '@//:artifacts/SubscriptionSettingsQuery.graphql'
import SubscriptionPreview from './SubscriptionPreview/SubscriptionPreview'
import { usePaginationFragment } from 'react-relay'
import { LoadMoreStackTile, StackTile } from '@//:modules/content/ContentSelection'
import { Stack } from '@chakra-ui/react'
import { EmptySubscriptions } from '@//:modules/content/Placeholder'

interface Props {
  query: PreloadedQuery<SubscriptionSettingsQuery>
}

const Query = graphql`
  query SubscriptionSettingsQuery {
    viewer @required(action: THROW) {
      ...SubscriptionSettingsFragment
    }
  }
`

const Fragment = graphql`
  fragment SubscriptionSettingsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 7}
    after: {type: String}
  )
  @refetchable(queryName: "ClubSupporterSubscriptionsPaginationQuery" ) {
    clubSupporterSubscriptions (first: $first, after: $after)
    @connection (key: "SubscriptionSettings_clubSupporterSubscriptions") {
      edges {
        node {
          ...SubscriptionPreviewFragment
        }
      }
    }
  }
`
export default function SubscriptionSettings (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<SubscriptionSettingsQuery>(
    Query,
    props.query
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<SubscriptionSettingsQuery, any>(
    Fragment,
    queryData.viewer
  )

  if (data.clubSupporterSubscriptions.edges.length < 1) {
    return (
      <EmptySubscriptions />
    )
  }

  return (
    <Stack spacing={2}>
      {data.clubSupporterSubscriptions.edges.map((item, index) => (
        <StackTile key={index}>
          <SubscriptionPreview query={item.node} />
        </StackTile>
      ))}
      <LoadMoreStackTile
        hasNext={hasNext}
        onLoadNext={() => loadNext(3)}
        isLoadingNext={isLoadingNext}
      />
    </Stack>
  )
}
