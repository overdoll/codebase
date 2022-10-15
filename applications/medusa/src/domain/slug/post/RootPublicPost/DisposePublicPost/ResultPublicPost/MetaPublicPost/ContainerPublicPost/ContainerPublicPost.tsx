import { graphql, useFragment } from 'react-relay/hooks'
import type { ContainerPublicPostFragment$key } from '@//:artifacts/ContainerPublicPostFragment.graphql'
import type { ContainerPublicPostViewerFragment$key } from '@//:artifacts/ContainerPublicPostViewerFragment.graphql'
import React, { Suspense } from 'react'
import BannerPublicPost from './BannerPublicPost/BannerPublicPost'
import DescriptionPublicPost from './DescriptionPublicPost/DescriptionPublicPost'
import { BannerContainer, CinematicContainer, ContentContainer } from '@//:modules/content/PageLayout'
import CinematicPublicPost from './CinematicPublicPost/CinematicPublicPost'
import { Stack } from '@chakra-ui/react'
import PageHeader from '@//:modules/content/PageLayout/Display/components/PageHeader/PageHeader'
import { Trans } from '@lingui/macro'
import { MagicWand } from '@//:assets/icons'
import PrepareGridSuggestedPosts from './PrepareGridSuggestedPosts/PrepareGridSuggestedPosts'
import dynamic from 'next/dynamic'

const LazyBanner = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/JoinBrowseBanner/JoinBrowseBanner')
  },
  { suspense: true }
)

const LazyModal = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/JoinBrowseModal/JoinBrowseModal')
  },
  { suspense: true }
)

interface Props {
  postQuery: ContainerPublicPostFragment$key
  viewerQuery: ContainerPublicPostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment ContainerPublicPostFragment on Post {
    ...BannerPublicPostFragment
    ...CinematicPublicPostFragment
    ...DescriptionPublicPostFragment
    ...PrepareGridSuggestedPostsFragment
  }
`

const ViewerFragment = graphql`
  fragment ContainerPublicPostViewerFragment on Account {
    ...BannerPublicPostViewerFragment
    ...DescriptionPublicPostViewerFragment
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
      <Suspense fallback={<></>}>
        {viewerData == null && (
          <>
            <LazyBanner />
            <LazyModal />
          </>
        )}
      </Suspense>
      <BannerContainer>
        <BannerPublicPost postQuery={postData} viewerQuery={viewerData} />
      </BannerContainer>
      <CinematicContainer>
        <CinematicPublicPost postQuery={postData} />
      </CinematicContainer>
      <ContentContainer pt={2}>
        <Stack spacing={16}>
          <DescriptionPublicPost postQuery={postData} viewerQuery={viewerData} />
          <Stack spacing={4}>
            <PageHeader icon={MagicWand} title={<Trans>Similar content</Trans>} />
            <PrepareGridSuggestedPosts postQuery={postData} />
          </Stack>
        </Stack>
      </ContentContainer>
    </>
  )
}
