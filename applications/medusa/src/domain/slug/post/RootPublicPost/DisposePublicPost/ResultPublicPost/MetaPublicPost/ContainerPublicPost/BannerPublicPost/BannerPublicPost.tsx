import { graphql, useFragment } from 'react-relay/hooks'
import type { BannerPublicPostFragment$key } from '@//:artifacts/BannerPublicPostFragment.graphql'
import type { BannerPublicPostViewerFragment$key } from '@//:artifacts/BannerPublicPostViewerFragment.graphql'
import React from 'react'
import AccountInformationBanner from '@//:common/components/AccountInformationBanner/AccountInformationBanner'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import { Box, HStack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

interface Props {
  postQuery: BannerPublicPostFragment$key
  viewerQuery: BannerPublicPostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment BannerPublicPostFragment on Post {
    state
  }
`

const ViewerFragment = graphql`
  fragment BannerPublicPostViewerFragment on Account {
    ...AccountInformationBannerFragment
  }
`

// Show banners on the page first
export default function BannerPublicPost (props: Props): JSX.Element {
  const {
    postQuery,
    viewerQuery
  } = props

  const postData = useFragment(PostFragment, postQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <Box>
      <AccountInformationBanner query={viewerData} />
      {(!['PUBLISHED', 'ARCHIVED'].includes(postData.state)) && (
        <Alert mb={2} status='warning'>
          <HStack>
            <AlertIcon />
            <AlertDescription>
              <Trans>
                This post is not published. Only you can see it.
              </Trans>
            </AlertDescription>
          </HStack>
        </Alert>)}
      {postData.state === 'ARCHIVED' && (
        <Alert mb={2} status='info'>
          <HStack>
            <AlertIcon />
            <AlertDescription>
              <Trans>
                This post is archived. Only you can see it.
              </Trans>
            </AlertDescription>
          </HStack>
        </Alert>
      )}
    </Box>
  )
}
