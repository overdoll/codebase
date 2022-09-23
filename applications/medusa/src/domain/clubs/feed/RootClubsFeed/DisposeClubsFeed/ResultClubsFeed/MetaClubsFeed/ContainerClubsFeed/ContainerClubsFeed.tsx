import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerClubsFeedFragment$key } from '@//:artifacts/ContainerClubsFeedFragment.graphql'
import { ContainerClubsFeedViewerFragment$key } from '@//:artifacts/ContainerClubsFeedViewerFragment.graphql'
import { BannerContainer, ContentContainer } from '@//:modules/content/PageLayout'
import BannerClubsFeed from './BannerClubsFeed/BannerClubsFeed'
import { Stack } from '@chakra-ui/react'
import HeaderClubsFeed from './HeaderClubsFeed/HeaderClubsFeed'
import ScrollClubsFeed from './ScrollClubsFeed/ScrollClubsFeed'

interface Props {
  rootQuery: ContainerClubsFeedFragment$key
  viewerQuery: ContainerClubsFeedViewerFragment$key | null
}

const RootFragment = graphql`
  fragment ContainerClubsFeedFragment on Query {
    ...HeaderClubsFeedFragment
  }
`

const ViewerFragment = graphql`
  fragment ContainerClubsFeedViewerFragment on Account {
    ...BannerClubsFeedViewerFragment
    ...ScrollClubsFeedFragment
  }
`

export default function ContainerClubsFeed (props: Props): JSX.Element {
  const {
    rootQuery,
    viewerQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <BannerContainer>
        <BannerClubsFeed viewerQuery={viewerData} />
      </BannerContainer>
      <ContentContainer>
        <Stack spacing={8}>
          <HeaderClubsFeed rootQuery={rootData} />
          <ScrollClubsFeed viewerQuery={viewerData} />
        </Stack>
      </ContentContainer>
    </>
  )
}
