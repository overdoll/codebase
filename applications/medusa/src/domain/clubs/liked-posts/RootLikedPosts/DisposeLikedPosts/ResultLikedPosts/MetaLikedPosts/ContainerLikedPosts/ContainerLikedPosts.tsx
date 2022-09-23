import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerLikedPostsViewerFragment$key } from '@//:artifacts/ContainerLikedPostsViewerFragment.graphql'
import { BannerContainer, ContentContainer } from '@//:modules/content/PageLayout'
import { Stack } from '@chakra-ui/react'
import BannerLikedPosts from './BannerLikedPosts/BannerLikedPosts'
import HeaderLikedPosts from './HeaderLikedPosts/HeaderLikedPosts'
import ScrollLikedPosts from './ScrollLikedPosts/ScrollLikedPosts'

interface Props {
  viewerQuery: ContainerLikedPostsViewerFragment$key | null
}

const ViewerFragment = graphql`
  fragment ContainerLikedPostsViewerFragment on Account {
    ...BannerLikedPostsViewerFragment
    ...ScrollLikedPostsFragment
  }
`

export default function ContainerLikedPosts (props: Props): JSX.Element {
  const {
    viewerQuery
  } = props

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <BannerContainer>
        <BannerLikedPosts viewerQuery={viewerData} />
      </BannerContainer>
      <ContentContainer>
        <Stack spacing={8}>
          <HeaderLikedPosts />
          <ScrollLikedPosts viewerQuery={viewerData} />
        </Stack>
      </ContentContainer>
    </>
  )
}
