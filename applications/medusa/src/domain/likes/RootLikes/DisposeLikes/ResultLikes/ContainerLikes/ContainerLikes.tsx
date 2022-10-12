import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerLikesViewerFragment$key } from '@//:artifacts/ContainerLikesViewerFragment.graphql'
import { ContentContainer } from '@//:modules/content/PageLayout'
import ScrollPostsLikes from './ScrollPostsLikes/ScrollPostsLikes'
import LockedLikesBanner from './LockedLikesBanner/LockedLikesBanner'
import { Stack } from '@chakra-ui/react'
import PageHeader from '@//:modules/content/PageLayout/Display/components/PageHeader/PageHeader'
import { HeartFull } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import PreviewUnlockShadow
  from '@//:modules/content/HookedComponents/Filters/components/PreviewUnlockShadow/PreviewUnlockShadow'

interface Props {
  viewerQuery: ContainerLikesViewerFragment$key
}

const ViewerFragment = graphql`
  fragment ContainerLikesViewerFragment on Account {
    ...ScrollPostsLikesFragment
  }
`

export default function ContainerLikes (props: Props): JSX.Element {
  const {
    viewerQuery
  } = props

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <ContentContainer pt={2}>
      <LockedLikesBanner />
      <Stack minH={1000} spacing={4} position='relative'>
        <PageHeader icon={HeartFull} title={<Trans>Your liked posts</Trans>} />
        <PreviewUnlockShadow />
        <ScrollPostsLikes accountQuery={viewerData} />
      </Stack>
    </ContentContainer>
  )
}
