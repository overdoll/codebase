import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubJoinBannerFragment$key } from '@//:artifacts/ClubJoinBannerFragment.graphql'
import type { ClubJoinBannerViewerFragment$key } from '@//:artifacts/ClubJoinBannerViewerFragment.graphql'
import { Trans } from '@lingui/macro'
import { MagicBall } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'
import { Box, Heading, HStack, Stack } from '@chakra-ui/react'
import ClubJoinButton from '@//:modules/content/HookedComponents/Club/fragments/Interact/ClubJoinButton/ClubJoinButton'

interface Props {
  clubQuery: ClubJoinBannerFragment$key
  viewerQuery: ClubJoinBannerViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ClubJoinBannerFragment on Club {
    id
    name
    viewerMember {
      __typename
    }
    viewerIsOwner
    ...ClubJoinButtonFragment
  }
`

const ViewerFragment = graphql`
  fragment ClubJoinBannerViewerFragment on Account {
    ...ClubJoinButtonViewerFragment
  }
`

export default function ClubJoinBanner (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  if (clubData.viewerMember != null || clubData.viewerIsOwner) {
    return <></>
  }

  return (
    <Stack spacing={4}>
      <HStack spacing={2} align='center' justify='flex-start'>
        <Icon fill='whiteAlpha.900' icon={MagicBall} w={6} h={6} />
        <Box>
          <Heading fontSize='md' color='whiteAlpha.900'>
            <Trans>
              Join {clubData.name}
            </Trans>
          </Heading>
          <Heading fontSize='xs' color='whiteAlpha.500'>
            <Trans>
              See their newly posted content in your feed
            </Trans>
          </Heading>
        </Box>
      </HStack>
      <ClubJoinButton clubQuery={clubData} viewerQuery={viewerData} />
    </Stack>
  )
}
