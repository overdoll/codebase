import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubSupportBannerFragment$key } from '@//:artifacts/ClubSupportBannerFragment.graphql'
import type { ClubSupportBannerViewerFragment$key } from '@//:artifacts/ClubSupportBannerViewerFragment.graphql'

import { Box, Heading, HStack, Stack } from '@chakra-ui/react'
import ClubSupportConditionWrapper from '../ClubWrappers/ClubSupportConditionWrapper/ClubSupportConditionWrapper'
import ClubSupporterSubscriptionPriceButton
  from '../ClubGenericButtons/ClubSupporterSubscriptionPriceButton/ClubSupporterSubscriptionPriceButton'
import RandomPattern from '@//:modules/content/DataDisplay/RandomPattern/RandomPattern'
import { Icon } from '@//:modules/content/PageLayout'
import { ClubMembers } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import { TileOverlay } from '@//:modules/content/ContentSelection'

interface Props {
  clubQuery: ClubSupportBannerFragment$key
  viewerQuery: ClubSupportBannerViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ClubSupportBannerFragment on Club {
    id
    viewerMember {
      isSupporter
    }
    viewerIsOwner
    canSupport
    ...ClubSupportConditionWrapperFragment
    ...ClubSupporterSubscriptionPriceButtonFragment
  }
`

const ViewerFragment = graphql`
  fragment ClubSupportBannerViewerFragment on Account {
    ...ClubSupportConditionWrapperViewerFragment
  }
`

export default function ClubSupportBanner ({
  clubQuery,
  viewerQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  if (!clubData.canSupport) {
    return <></>
  }

  if (clubData?.viewerMember?.isSupporter && !clubData.viewerIsOwner) {
    return <></>
  }

  return (
    <TileOverlay
      backdrop={<RandomPattern seed={clubData.id} />}
    >
      <HStack py={4} px={3} spacing={5}>
        <Box borderRadius='lg' bg='orange.300' p={2}>
          <Icon icon={ClubMembers} w={10} h={10} fill='orange.100' />
        </Box>
        <Stack spacing={2}>
          <Heading fontSize='lg' color='gray.00'>
            <Trans>
              Become a Supporter and get access to exclusive content!
            </Trans>
          </Heading>
          <ClubSupportConditionWrapper clubQuery={clubData} viewerQuery={viewerData}>
            {props => (
              <ClubSupporterSubscriptionPriceButton w='100%' query={clubData} {...props} />
            )}
          </ClubSupportConditionWrapper>
        </Stack>
      </HStack>
    </TileOverlay>
  )
}
