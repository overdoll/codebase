import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubJoinBannerFragment$key } from '@//:artifacts/ClubJoinBannerFragment.graphql'
import type { ClubJoinBannerViewerFragment$key } from '@//:artifacts/ClubJoinBannerViewerFragment.graphql'
import ClubJoinConditionWrapper from '../../components/ClubWrappers/ClubJoinConditionWrapper/ClubJoinConditionWrapper'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { MagicBall, PlusCircle } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'
import { Box, Heading, HStack, Stack } from '@chakra-ui/react'

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
    <ClubJoinConditionWrapper clubQuery={clubData} viewerQuery={viewerData}>
      {props => (
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
          <Button
            w='100%'
            colorScheme='green'
            size={{
              base: 'md',
              md: 'lg'
            }}
            leftIcon={<Icon icon={PlusCircle} w={4} h={4} fill='green.900' />}
            {...props}
          >
            <Trans>
              Join
            </Trans>
          </Button>
        </Stack>
      )}
    </ClubJoinConditionWrapper>
  )
}
