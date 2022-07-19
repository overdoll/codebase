import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubSupportBannerFragment$key } from '@//:artifacts/ClubSupportBannerFragment.graphql'
import type { ClubSupportBannerViewerFragment$key } from '@//:artifacts/ClubSupportBannerViewerFragment.graphql'

import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import ClubSupportConditionWrapper from '../ClubWrappers/ClubSupportConditionWrapper/ClubSupportConditionWrapper'
import ClubSupporterSubscriptionPriceButton
  from '../ClubGenericButtons/ClubSupporterSubscriptionPriceButton/ClubSupporterSubscriptionPriceButton'

interface Props {
  clubQuery: ClubSupportBannerFragment$key
  viewerQuery: ClubSupportBannerViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ClubSupportBannerFragment on Club {
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
    <HStack spacing={2}>
      <Box>
        asd
      </Box>
      <Stack>
        <Text>
          awdawdad
        </Text>
        <ClubSupportConditionWrapper clubQuery={clubData} viewerQuery={viewerData}>
          {props => (
            <ClubSupporterSubscriptionPriceButton query={clubData} {...props} />
          )}
        </ClubSupportConditionWrapper>
      </Stack>
    </HStack>
  )
}
