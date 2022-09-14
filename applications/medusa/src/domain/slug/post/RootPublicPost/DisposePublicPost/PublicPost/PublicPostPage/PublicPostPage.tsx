import { Trans } from '@lingui/macro'
import { graphql, useFragment } from 'react-relay/hooks'
import type { PublicPostPageFragment$key } from '@//:artifacts/PublicPostPageFragment.graphql'
import type { PublicPostPageViewerFragment$key } from '@//:artifacts/PublicPostPageViewerFragment.graphql'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import { Box, HStack } from '@chakra-ui/react'
import ClubSuspendedStaffAlert
  from '../../../../../club/RootPublicClub/PublicClub/ClubSuspendedStaffAlert/ClubSuspendedStaffAlert'
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

      <FullDetailedPost key={data.id} query={data} viewerQuery={viewerData} />
    </Box>
  )
}
