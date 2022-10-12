import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerLikesViewerFragment$key } from '@//:artifacts/ContainerLikesViewerFragment.graphql'
import { ContentContainer } from '@//:modules/content/PageLayout'
import ScrollPostsLikes from './ScrollPostsLikes/ScrollPostsLikes'
import { Stack } from '@chakra-ui/react'
import PageHeader from '@//:modules/content/PageLayout/Display/components/PageHeader/PageHeader'
import { HeartFull } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import dynamic from 'next/dynamic'

interface Props {
  viewerQuery: ContainerLikesViewerFragment$key
}

const LazyBanner = dynamic(
  async () => {
    return await import('./LockedLikesBanner/LockedLikesBanner')
  },
  {
    ssr: false
  }
)

const LazyShadow = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/SupporterUnlockShadow/SupporterUnlockShadow')
  },
  {
    ssr: false
  }
)

const ViewerFragment = graphql`
  fragment ContainerLikesViewerFragment on Account {
    hasClubSupporterSubscription
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
      {!viewerData.hasClubSupporterSubscription && (<LazyBanner />)}
      <Stack minH={900} spacing={4} position='relative'>
        <PageHeader icon={HeartFull} title={<Trans>Your liked posts</Trans>} />
        {!viewerData.hasClubSupporterSubscription && (<LazyShadow />)}
        <ScrollPostsLikes accountQuery={viewerData} />
      </Stack>
    </ContentContainer>
  )
}
