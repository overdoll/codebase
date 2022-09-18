import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerHomeFragment$key } from '@//:artifacts/ContainerHomeFragment.graphql'
import { ContainerHomeViewerFragment$key } from '@//:artifacts/ContainerHomeViewerFragment.graphql'
import { BannerContainer, ContentContainer } from '@//:modules/content/PageLayout'
import BannerHome from './BannerHome/BannerHome'
import TilesHome from './TilesHome/TilesHome'
import PostsHome from './PostsHome/PostsHome'
import { Stack } from '@chakra-ui/react'

interface Props {
  rootQuery: ContainerHomeFragment$key
  viewerQuery: ContainerHomeViewerFragment$key | null
}

const RootFragment = graphql`
  fragment ContainerHomeFragment on Query {
    ...PostsHomeFragment
  }
`

const ViewerFragment = graphql`
  fragment ContainerHomeViewerFragment on Account {
    ...BannerHomeViewerFragment
  }
`

export default function ContainerHome (props: Props): JSX.Element {
  const {
    rootQuery,
    viewerQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <BannerContainer pt={2}>
        <BannerHome viewerQuery={viewerData} />
      </BannerContainer>
      <ContentContainer>
        <Stack spacing={4}>
          <TilesHome />
          <PostsHome rootQuery={rootData} />
        </Stack>
      </ContentContainer>
    </>
  )
}
