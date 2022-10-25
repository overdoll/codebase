import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { JoinBannerPublicClubFragment$key } from '@//:artifacts/JoinBannerPublicClubFragment.graphql'
import { JoinBannerPublicClubViewerFragment$key } from '@//:artifacts/JoinBannerPublicClubViewerFragment.graphql'
import { Flex, Stack } from '@chakra-ui/react'
import ClubHeaderBanner from './ClubHeaderBanner/ClubHeaderBanner'
import ClubJoinBanner from './ClubJoinBanner/ClubJoinBanner'

interface Props {
  clubQuery: JoinBannerPublicClubFragment$key
  viewerQuery: JoinBannerPublicClubViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment JoinBannerPublicClubFragment on Club {
    id
    ...ClubHeaderBannerFragment
    ...ClubJoinBannerFragment
  }
`

const ViewerFragment = graphql`
  fragment JoinBannerPublicClubViewerFragment on Account {
    ...ClubJoinBannerViewerFragment
  }
`

export default function JoinBannerPublicClub (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <Stack
      spacing={2}
      direction={{
        base: 'column',
        md: 'row'
      }}
    >
      <Flex
        h={{
          base: 150,
          md: 300
        }}
        w={{
          base: '100%',
          md: '50%'
        }}
      >
        <ClubHeaderBanner query={clubData} />
      </Flex>
      <Flex
        h={{
          base: '100%',
          md: 300
        }}
        w={{
          base: '100%',
          md: '50%'
        }}
      >
        <Stack py={4} spacing={6} w='100%' bg='dimmers.100' borderRadius='md' h='100%' align='center' justify='center'>
          <ClubJoinBanner clubQuery={clubData} viewerQuery={viewerData} />
        </Stack>
      </Flex>
    </Stack>
  )
}
