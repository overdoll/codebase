import { Trans } from '@lingui/macro'
import { graphql, useFragment } from 'react-relay/hooks'
import type { PublicPostPageFragment$key } from '@//:artifacts/PublicPostPageFragment.graphql'
import type { PublicPostPageViewerFragment$key } from '@//:artifacts/PublicPostPageViewerFragment.graphql'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import { Box, HStack } from '@chakra-ui/react'
import ClubSuspendedStaffAlert
  from '../../../../club/RootPublicClub/PublicClub/ClubSuspendedStaffAlert/ClubSuspendedStaffAlert'
import FullDetailedPost from './FullDetailedPost/FullDetailedPost'

interface Props {
  query: PublicPostPageFragment$key
  viewerQuery: PublicPostPageViewerFragment$key | null
}

const Fragment = graphql`
  fragment PublicPostPageFragment on Post {
    id
    state
    club {
      ...ClubSuspendedStaffAlertFragment
    }
    ...FullDetailedPostFragment
  }
`

const ViewerFragment = graphql`
  fragment PublicPostPageViewerFragment on Account {
    ...FullDetailedPostViewerFragment
  }
`

export default function PublicPostPage ({
  query,
  viewerQuery
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <Box>
      <ClubSuspendedStaffAlert query={data.club} />
      {(!['PUBLISHED', 'ARCHIVED'].includes(data.state)) && (
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
      {data.state === 'ARCHIVED' && (
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
      <FullDetailedPost key={data.id} query={data} viewerQuery={viewerData} />
    </Box>
  )
}
