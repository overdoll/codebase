import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerPublicClubFragment$key } from '@//:artifacts/ContainerPublicClubFragment.graphql'
import { ContainerPublicClubViewerFragment$key } from '@//:artifacts/ContainerPublicClubViewerFragment.graphql'
import { BannerContainer, ContentContainer } from '@//:modules/content/PageLayout'
import BannerPublicClub from './BannerPublicClub/BannerPublicClub'
import HeaderPublicClub from './HeaderPublicClub/HeaderPublicClub'
import ButtonsPublicClub from './ButtonsPublicClub/ButtonsPublicClub'
import { Stack } from '@chakra-ui/react'
import PrepareClubPosts from './PrepareClubPosts/PrepareClubPosts'
import dynamic from 'next/dynamic'

const LazyModal = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/JoinBrowseModal/JoinBrowseModal')
  },
  { ssr: false }
)

interface Props {
  clubQuery: ContainerPublicClubFragment$key
  viewerQuery: ContainerPublicClubViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ContainerPublicClubFragment on Club {
    id
    ...BannerPublicClubFragment
    ...HeaderPublicClubFragment
    ...ButtonsPublicClubFragment
    ...PrepareClubPostsFragment
  }
`

const ViewerFragment = graphql`
  fragment ContainerPublicClubViewerFragment on Account {
    ...BannerPublicClubViewerFragment
    ...HeaderPublicClubViewerFragment
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
        <LazyModal />
      )}
      <BannerContainer pt={2}>
        <BannerPublicClub clubQuery={clubData} viewerQuery={viewerData} />
      </BannerContainer>
      <ContentContainer>
        <Stack spacing={4}>
          <HeaderPublicClub clubQuery={clubData} viewerQuery={viewerData} />
          <Stack spacing={2}>
            <ButtonsPublicClub clubQuery={clubData} />
            <PrepareClubPosts clubQuery={clubData} />
          </Stack>
        </Stack>
      </ContentContainer>
    </>
  )
}
