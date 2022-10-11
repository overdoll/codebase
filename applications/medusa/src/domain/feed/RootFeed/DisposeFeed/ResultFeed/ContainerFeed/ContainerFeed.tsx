import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerFeedViewerFragment$key } from '@//:artifacts/ContainerFeedViewerFragment.graphql'
import { ContentContainer } from '@//:modules/content/PageLayout'
import ScrollPostsFeed from './ScrollPostsFeed/ScrollPostsFeed'
import CompleteFeedBanner from './CompleteFeedBanner/CompleteFeedBanner'
import { Stack } from '@chakra-ui/react'
import HeaderFeed from './HeaderFeed/HeaderFeed'

interface Props {
  viewerQuery: ContainerFeedViewerFragment$key
}

const ViewerFragment = graphql`
  fragment ContainerFeedViewerFragment on Account {
    ...HeaderFeedViewerFragment
    ...ScrollPostsFeedFragment
  }
`

export default function ContainerFeed (props: Props): JSX.Element {
  const {
    viewerQuery
  } = props

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <ContentContainer pt={2}>
      <CompleteFeedBanner />
      <Stack spacing={4}>
        <HeaderFeed viewerQuery={viewerData} />
        <ScrollPostsFeed accountQuery={viewerData} />
      </Stack>
    </ContentContainer>
  )
}
