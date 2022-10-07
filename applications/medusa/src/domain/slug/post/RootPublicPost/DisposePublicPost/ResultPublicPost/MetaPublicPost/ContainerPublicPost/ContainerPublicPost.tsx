import { graphql, useFragment } from 'react-relay/hooks'
import type { ContainerPublicPostFragment$key } from '@//:artifacts/ContainerPublicPostFragment.graphql'
import type { ContainerPublicPostViewerFragment$key } from '@//:artifacts/ContainerPublicPostViewerFragment.graphql'
import React, { useEffect, useMemo, useState } from 'react'
import BannerPublicPost from './BannerPublicPost/BannerPublicPost'
import DescriptionPublicPost from './DescriptionPublicPost/DescriptionPublicPost'
import { BannerContainer, CinematicContainer, ContentContainer } from '@//:modules/content/PageLayout'
import CinematicPublicPost from './CinematicPublicPost/CinematicPublicPost'
import { Center, Spinner, Stack } from '@chakra-ui/react'
import PageHeader from '@//:modules/content/PageLayout/Display/components/PageHeader/PageHeader'
import { Trans } from '@lingui/macro'
import { MagicWand } from '@//:assets/icons'
import HomeRedirectPrompt from '@//:common/components/HomeRedirectPrompt/HomeRedirectPrompt'
import PrepareGridSuggestedPosts from './PrepareGridSuggestedPosts/PrepareGridSuggestedPosts'
import PrepareSuggestedPosts from './PrepareSuggestedPosts/PrepareSuggestedPosts'
import posthog from 'posthog-js'

interface Props {
  postQuery: ContainerPublicPostFragment$key
  viewerQuery: ContainerPublicPostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment ContainerPublicPostFragment on Post {
    reference
    ...BannerPublicPostFragment
    ...CinematicPublicPostFragment
    ...DescriptionPublicPostFragment
    ...PrepareSuggestedPostsFragment
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

  const [canFlag, setCanFlag] = useState(false)

  const memoSuggestedPosts = useMemo(() => {
    if (!canFlag) {
      return (
        <Center>
          <Spinner />
        </Center>
      )
    }

    if (posthog.getFeatureFlag('post-suggested') === 'grid') {
      return <PrepareGridSuggestedPosts postQuery={postData} />
    }

    return <PrepareSuggestedPosts postQuery={postData} />
  }, [canFlag, postData.reference])

  useEffect(() => {
    posthog.onFeatureFlags(() => {
      setCanFlag(true)
    })
  }, [])

  return (
    <>
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
            <HomeRedirectPrompt />
            <PageHeader icon={MagicWand} title={<Trans>Similar content</Trans>} />
            {memoSuggestedPosts}
          </Stack>
        </Stack>
      </ContentContainer>
    </>
  )
}
