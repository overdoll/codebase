import { ReactNode } from 'react'
import { Box, Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { graphql, useFragment } from 'react-relay'
import { PostSupporterContentLockedFragment$key } from '@//:artifacts/PostSupporterContentLockedFragment.graphql'
import {
  PostSupporterContentLockedViewerFragment$key
} from '@//:artifacts/PostSupporterContentLockedViewerFragment.graphql'

import PostSupporterContentLockedButton from './PostSupporterContentLockedButton/PostSupporterContentLockedButton'

interface Props {
  children: ReactNode
  clubQuery: PostSupporterContentLockedFragment$key
  viewerQuery: PostSupporterContentLockedViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment PostSupporterContentLockedFragment on Club {
    ...PostSupporterContentLockedButtonFragment
  }
`

const ViewerFragment = graphql`
  fragment PostSupporterContentLockedViewerFragment on Account {
    ...PostSupporterContentLockedButtonViewerFragment
  }
`

export default function PostSupporterContentLocked ({
  children,
  clubQuery,
  viewerQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <Box w='100%' h='100%' position='relative'>
      {children}
      <Stack
        bg='dimmers.400'
        h='100%'
        w='100%'
        top={0}
        right={0}
        position='absolute'
        align='center'
        justify='center'
        px={8}
        spacing={4}
        pointerEvents='none'
      >
        <Heading fontSize='lg' color='gray.00' textAlign='center'>
          <Trans>
            This content can only be seen if you are a supporter of the club
          </Trans>
        </Heading>
        <PostSupporterContentLockedButton pointerEvents='auto' clubQuery={clubData} viewerQuery={viewerData} />
      </Stack>
    </Box>
  )
}
