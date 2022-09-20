import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { JoinBannerPublicClubFragment$key } from '@//:artifacts/JoinBannerPublicClubFragment.graphql'
import { JoinBannerPublicClubViewerFragment$key } from '@//:artifacts/JoinBannerPublicClubViewerFragment.graphql'
import { Flex, HStack, Stack } from '@chakra-ui/react'
import ClubHeaderBanner from './ClubHeaderBanner/ClubHeaderBanner'
import ClubJoinBanner from './ClubJoinBanner/ClubJoinBanner'
import ClubFooterShareRedditButton from './ClubFooterShareRedditButton/ClubFooterShareRedditButton'
import ClubFooterShareDiscordButton from './ClubFooterShareDiscordButton/ClubFooterShareDiscordButton'
import ClubFooterShareTwitterButton from './ClubFooterShareTwitterButton/ClubFooterShareTwitterButton'
import ClubFooterShareLinkButton from './ClubFooterShareLinkButton/ClubFooterShareLinkButton'

interface Props {
  clubQuery: JoinBannerPublicClubFragment$key
  viewerQuery: JoinBannerPublicClubViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment JoinBannerPublicClubFragment on Club {
    ...ClubHeaderBannerFragment
    ...ClubJoinBannerFragment
    ...ClubFooterShareTwitterButtonFragment
    ...ClubFooterShareRedditButtonFragment
    ...ClubFooterShareDiscordButtonFragment
    ...ClubFooterShareLinkButtonFragment
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
        h={300}
        w={{
          base: '100%',
          md: '50%'
        }}
      >
        <ClubHeaderBanner query={clubData} />
      </Flex>
      <Flex
        h={300}
        w={{
          base: '100%',
          md: '50%'
        }}
      >
        <Stack spacing={6} w='100%' bg='dimmers.100' borderRadius='md' h='100%' align='center' justify='center'>
          <ClubJoinBanner clubQuery={clubData} viewerQuery={viewerData} />
          <Stack align='center' spacing={2}>
            <HStack spacing={2}>
              <ClubFooterShareDiscordButton query={clubData} />
              <ClubFooterShareTwitterButton query={clubData} />
              <ClubFooterShareRedditButton query={clubData} />
            </HStack>
            <ClubFooterShareLinkButton clubQuery={clubData} />
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  )
}
