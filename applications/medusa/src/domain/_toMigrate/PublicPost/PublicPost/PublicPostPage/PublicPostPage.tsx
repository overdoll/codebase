import { Trans } from '@lingui/macro'
import { graphql, useFragment } from 'react-relay/hooks'
import type { PublicPostPageFragment$key } from '@//:artifacts/PublicPostPageFragment.graphql'
import type { PublicPostPageViewerFragment$key } from '@//:artifacts/PublicPostPageViewerFragment.graphql'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import { HStack, Stack } from '@chakra-ui/react'
import ClubSuspendedStaffAlert
  from '../../../PublicClub/PublicClub/ClubSuspendedStaffAlert/ClubSuspendedStaffAlert'
import PageFixedHeader from '@//:modules/content/PageLayout/Wrappers/PageFixedHeader/PageFixedHeader'
import FixedHeaderWrapper from '@//:modules/content/PageLayout/Wrappers/PageFixedHeader/FixedHeaderWrapper/FixedHeaderWrapper'
import LockedAccountTrigger from '../../../../home/Home/LockedAccount/LockedAccountTrigger/LockedAccountTrigger'
import PostSearchButton from '@//:modules/content/Posts/components/PostNavigation/PostsSearch/components/PostSearchButton/PostSearchButton'
import { ObserverManagerProvider } from '@//:modules/content/Posts/support/ObserverManager/ObserverManager'
import { PostVideoManagerProvider } from '@//:modules/content/Posts'
import FullDetailedPost from './FullDetailedPost/FullDetailedPost'
import { FlowBuilderFloatingFooter } from '@//:modules/content/PageLayout'
import PageFilledWrapper from '@//:modules/content/PageLayout/Wrappers/PageFilledWrapper/PageFilledWrapper'

interface Props {
  query: PublicPostPageFragment$key
  viewerQuery: PublicPostPageViewerFragment$key | null
}

const Fragment = graphql`
  fragment PublicPostPageFragment on Post {
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
    <PageFilledWrapper>
      <PageFixedHeader>
        <FixedHeaderWrapper>
          <HStack spacing={2} justify='flex-end'>
            <LockedAccountTrigger />
            <PostSearchButton routeTo='/search' />
          </HStack>
        </FixedHeaderWrapper>
      </PageFixedHeader>
      <ClubSuspendedStaffAlert query={data.club} />
      {(!['PUBLISHED', 'ARCHIVED'].includes(data.state)) && (
        <Alert mb={2} status='warning'>
          <HStack>
            <AlertIcon />
            <AlertDescription>
              <Trans>
                This post is not published. Only you can see it
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
                This post is archived. Only you can see it
              </Trans>
            </AlertDescription>
          </HStack>
        </Alert>
      )}
      <Stack spacing={4}>
        <ObserverManagerProvider>
          <PostVideoManagerProvider>
            <FullDetailedPost query={data} viewerQuery={viewerData} />
          </PostVideoManagerProvider>
        </ObserverManagerProvider>
        <FlowBuilderFloatingFooter />
      </Stack>
    </PageFilledWrapper>
  )
}
