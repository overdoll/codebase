import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerPublicClubFragment$key } from '@//:artifacts/ContainerPublicClubFragment.graphql'
import { ContainerPublicClubViewerFragment$key } from '@//:artifacts/ContainerPublicClubViewerFragment.graphql'
import { BannerContainer, ContentContainer } from '@//:modules/content/PageLayout'
import BannerPublicClub from './BannerPublicClub/BannerPublicClub'
import HeaderPublicClub from './HeaderPublicClub/HeaderPublicClub'
import { Stack } from '@chakra-ui/react'
import PrepareClubPosts from './PrepareClubPosts/PrepareClubPosts'
import dynamic from 'next/dynamic'
import SupportPublicClub from './SupportPublicClub/SupportPublicClub'

const LazyModal = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/JoinBrowseModal/JoinBrowseModal')
  },
  { ssr: false }
)

const LazyBanner = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/JoinBrowseBanner/JoinBrowseBanner')
  },
  { ssr: false }
)

interface Props {
  clubQuery: ContainerPublicClubFragment$key
  viewerQuery: ContainerPublicClubViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ContainerPublicClubFragment on Club {
    name
    ...BannerPublicClubFragment
    ...HeaderPublicClubFragment
    ...PrepareClubPostsFragment
    ...SupportPublicClubFragment
  }
`

const ViewerFragment = graphql`
  fragment ContainerPublicClubViewerFragment on Account {
    ...BannerPublicClubViewerFragment
    ...HeaderPublicClubViewerFragment
    ...SupportPublicClubViewerFragment
  }
`

export default function ContainerPublicClub (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      {viewerData == null && (
        <>
          <LazyModal />
          <LazyBanner />
        </>
      )}
      <BannerContainer pt={2}>
        <BannerPublicClub clubQuery={clubData} viewerQuery={viewerData} />
      </BannerContainer>
      <ContentContainer>
        <Stack spacing={6}>
          <HeaderPublicClub clubQuery={clubData} viewerQuery={viewerData} />
          <SupportPublicClub clubQuery={clubData} viewerQuery={viewerData} />
          <PrepareClubPosts clubQuery={clubData} />
        </Stack>
      </ContentContainer>
    </>
  )
}
