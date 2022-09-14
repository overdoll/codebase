import { graphql, useFragment } from 'react-relay/hooks'
import type { ContainerPublicPostFragment$key } from '@//:artifacts/ContainerPublicPostFragment.graphql'
import type { ContainerPublicPostViewerFragment$key } from '@//:artifacts/ContainerPublicPostViewerFragment.graphql'
import React from 'react'
import BannerPublicPost from './BannerPublicPost/BannerPublicPost'
import DescriptionPublicPost from './DescriptionPublicPost/DescriptionPublicPost'
import { BannerContainer, CinematicContainer, ContentContainer } from '@//:modules/content/PageLayout'
import CinematicPublicPost from './CinematicPublicPost/CinematicPublicPost'
import SuggestedPublicPost from './SuggestedPublicPost/SuggestedPublicPost'
import { Stack } from '@chakra-ui/react'

interface Props {
  postQuery: ContainerPublicPostFragment$key
  viewerQuery: ContainerPublicPostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment ContainerPublicPostFragment on Post {
    ...BannerPublicPostFragment
    ...CinematicPublicPostFragment
    ...DescriptionPublicPostFragment
    ...SuggestedPublicPostFragment
  }
`

const ViewerFragment = graphql`
  fragment ContainerPublicPostViewerFragment on Account {
    ...BannerPublicPostViewerFragment
    ...CinematicPublicPostViewerFragment
    ...DescriptionPublicPostViewerFragment
    ...SuggestedPublicPostViewerFragment
  }
`

// Handle the layout of the page here and choose which components get a layout container
// so the user has a consistent experience
export default function ContainerPublicPost (props: Props): JSX.Element {
  const {
    postQuery,
    viewerQuery
  } = props

  const postData = useFragment(PostFragment, postQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <BannerContainer>
        <BannerPublicPost postQuery={postData} viewerQuery={viewerData} />
      </BannerContainer>
      <CinematicContainer>
        <CinematicPublicPost postQuery={postData} viewerQuery={viewerData} />
      </CinematicContainer>
      <ContentContainer>
        <Stack pt={2} spacing={8}>
          <DescriptionPublicPost postQuery={postData} viewerQuery={viewerData} />
          <SuggestedPublicPost postQuery={postData} viewerQuery={viewerData} />
        </Stack>
      </ContentContainer>
    </>
  )
}
