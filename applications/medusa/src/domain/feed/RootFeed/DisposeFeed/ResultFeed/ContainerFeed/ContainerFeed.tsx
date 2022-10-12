import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerFeedViewerFragment$key } from '@//:artifacts/ContainerFeedViewerFragment.graphql'
import { ContentContainer } from '@//:modules/content/PageLayout'
import ScrollPostsFeed from './ScrollPostsFeed/ScrollPostsFeed'
import { Stack } from '@chakra-ui/react'
import HeaderFeed from './HeaderFeed/HeaderFeed'
import dynamic from 'next/dynamic'

const LazyBanner = dynamic(
  async () => {
    return await import('./CompleteFeedBanner/CompleteFeedBanner')
  },
  {
    ssr: false
  }
)

interface Props {
  viewerQuery: ContainerFeedViewerFragment$key
}

const ViewerFragment = graphql`
  fragment ContainerFeedViewerFragment on Account {
    clubMembershipsCount
    curationProfile {
      audience {
        completed
      }
    }
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
      {(viewerData.clubMembershipsCount < 1 && !viewerData.curationProfile.audience.completed) && (
        <LazyBanner />
      )}
      <Stack spacing={4}>
        <HeaderFeed viewerQuery={viewerData} />
        <ScrollPostsFeed accountQuery={viewerData} />
      </Stack>
    </ContentContainer>
  )
}
