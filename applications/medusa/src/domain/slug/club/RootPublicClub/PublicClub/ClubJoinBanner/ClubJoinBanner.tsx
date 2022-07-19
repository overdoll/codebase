import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubJoinBannerFragment$key } from '@//:artifacts/ClubJoinBannerFragment.graphql'
import type { ClubJoinBannerViewerFragment$key } from '@//:artifacts/ClubJoinBannerViewerFragment.graphql'

import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import ClubJoinConditionWrapper from '../ClubWrappers/ClubJoinConditionWrapper/ClubJoinConditionWrapper'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { AddPlus } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'

interface Props {
  clubQuery: ClubJoinBannerFragment$key
  viewerQuery: ClubJoinBannerViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ClubJoinBannerFragment on Club {
    viewerMember {
      __typename
    }
    viewerIsOwner
    ...ClubJoinConditionWrapperFragment
  }
`

const ViewerFragment = graphql`
  fragment ClubJoinBannerViewerFragment on Account {
    ...ClubJoinConditionWrapperViewerFragment
  }
`

export default function ClubJoinBanner ({
  clubQuery,
  viewerQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  if (clubData.viewerMember != null && !clubData.viewerIsOwner) {
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
        <ClubJoinConditionWrapper clubQuery={clubData} viewerQuery={viewerData}>
          {props => (
            <Button
              colorScheme='green'
              size='lg'
              leftIcon={<Icon icon={AddPlus} w={4} h={4} fill='green.900' />}
              {...props}
            >
              <Trans>
                Join Club
              </Trans>
            </Button>
          )}
        </ClubJoinConditionWrapper>
      </Stack>
    </HStack>
  )
}
