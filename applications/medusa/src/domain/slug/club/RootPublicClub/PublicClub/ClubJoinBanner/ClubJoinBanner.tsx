import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubJoinBannerFragment$key } from '@//:artifacts/ClubJoinBannerFragment.graphql'
import type { ClubJoinBannerViewerFragment$key } from '@//:artifacts/ClubJoinBannerViewerFragment.graphql'
import { Box, Heading, HStack, Stack } from '@chakra-ui/react'
import ClubJoinConditionWrapper from '../ClubWrappers/ClubJoinConditionWrapper/ClubJoinConditionWrapper'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { DiscoverGlobe, PlusCircle } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'
import { TileOverlay } from '@//:modules/content/ContentSelection'
import RandomPattern from '@//:modules/content/DataDisplay/RandomPattern/RandomPattern'

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
    <TileOverlay
      backdrop={<RandomPattern seed={clubData.id} />}
    >
      <HStack py={4} px={3} spacing={5}>
        <Box borderRadius='lg' bg='green.300' p={2}>
          <Icon icon={DiscoverGlobe} w={10} h={10} fill='green.100' />
        </Box>
        <Stack spacing={2}>
          <Heading fontSize='lg' color='gray.00'>
            <Trans>
              Join this club to see new content in your feed!
            </Trans>
          </Heading>
          <ClubJoinConditionWrapper clubQuery={clubData} viewerQuery={viewerData}>
            {props => (
              <Button
                w='100%'
                colorScheme='green'
                size='lg'
                leftIcon={<Icon icon={PlusCircle} w={4} h={4} fill='green.900' />}
                {...props}
              >
                <Trans>
                  Join {clubData.name}
                </Trans>
              </Button>
            )}
          </ClubJoinConditionWrapper>
        </Stack>
      </HStack>
    </TileOverlay>
  )
}
