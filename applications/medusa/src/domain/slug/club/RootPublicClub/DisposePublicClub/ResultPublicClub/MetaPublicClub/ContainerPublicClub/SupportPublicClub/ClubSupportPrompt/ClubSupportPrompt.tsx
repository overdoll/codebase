import { ClubSupportPromptFragment$key } from '@//:artifacts/ClubSupportPromptFragment.graphql'
import { ClubSupportPromptViewerFragment$key } from '@//:artifacts/ClubSupportPromptViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import ClubSupporterSubscriptionPriceButton
  from './ClubSupporterSubscriptionPriceButton/ClubSupporterSubscriptionPriceButton'
import { useJoin } from '../../../../../../../../../app/Root/DisposeRoot/ResultRoot/JoinModal/JoinModal'
import { useQueryParam } from 'use-query-params'
import { Box, Heading, HStack, Stack } from '@chakra-ui/react'
import ClubSupportBenefitsSummary from '../ClubSupportBenefitsSummary/ClubSupportBenefitsSummary'
import { Icon } from '@//:modules/content/PageLayout'
import { LikedPremium } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

interface Props {
  clubQuery: ClubSupportPromptFragment$key
  viewerQuery: ClubSupportPromptViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ClubSupportPromptFragment on Club {
    name
    canSupport
    viewerIsOwner
    viewerMember {
      isSupporter
    }
    slug
    ...ClubSupporterSubscriptionPriceButtonFragment
  }
`

const ViewerFragment = graphql`
  fragment ClubSupportPromptViewerFragment on Account {
    __typename
  }
`

export default function ClubSupportPrompt (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const onJoin = useJoin(`/${clubData.slug}?support=true`, 'club_support_button')
  const [, setSupportParam] = useQueryParam<boolean | null | undefined>('support')

  const onClick = (): void => {
    if (viewerData == null) {
      onJoin()
      return
    }
    setSupportParam(true)
  }

  if (clubData?.viewerMember?.isSupporter === true || clubData.viewerIsOwner) {
    return (
      <Box px={2} py={4} position='relative'>
        <Box
          borderRadius='lg'
          position='absolute'
          top={0}
          bottom={0}
          left={0}
          right={0}
          bg='dimmers.100'
        />
        <Stack position='relative' spacing={3} align='center'>
          <Stack w='100%' maxW={600} spacing={3}>
            <HStack w='100%' spacing={3} align='center' justify='flex-start'>
              <Icon fill='orange.300' icon={LikedPremium} w={7} h={7} />
              <Box>
                <Heading fontSize='xl' color='orange.300'>
                  <Trans>
                    Thanks for supporting {clubData.name}!
                  </Trans>
                </Heading>
                <Heading fontSize='xs' color='orange.100'>
                  <Trans>
                    You have full access to exclusive content from {clubData.name} and bonus platform features
                  </Trans>
                </Heading>
              </Box>
            </HStack>
            <ClubSupportBenefitsSummary />
          </Stack>
        </Stack>
      </Box>
    )
  }

  if (!clubData.canSupport) {
    return <></>
  }

  return (
    <Box px={2} py={4} position='relative'>
      <Box
        borderRadius='lg'
        position='absolute'
        top={0}
        bottom={0}
        left={0}
        right={0}
        bg='dimmers.100'
      />
      <Stack position='relative' spacing={3} align='center'>
        <Stack w='100%' maxW={600} spacing={3}>
          <HStack w='100%' spacing={3} align='center' justify='flex-start'>
            <Icon flexShrink={0} fill='orange.300' icon={LikedPremium} w={7} h={7} />
            <Box>
              <Heading fontSize='xl' color='orange.300'>
                <Trans>
                  Support {clubData.name}
                </Trans>
              </Heading>
              <Heading fontSize='xs' color='orange.100'>
                <Trans>
                  Get access to {clubData.name}'s content and bonus platform features
                </Trans>
              </Heading>
            </Box>
          </HStack>
          <ClubSupporterSubscriptionPriceButton onClick={onClick} query={clubData} />
        </Stack>
        <ClubSupportBenefitsSummary />
      </Stack>
    </Box>
  )
}
