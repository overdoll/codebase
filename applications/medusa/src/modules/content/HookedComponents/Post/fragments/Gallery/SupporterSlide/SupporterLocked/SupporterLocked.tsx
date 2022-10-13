import { ReactNode } from 'react'
import { Box, Center, Heading, HStack, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { graphql, useFragment } from 'react-relay'
import { SupporterLockedFragment$key } from '@//:artifacts/SupporterLockedFragment.graphql'
import { SupporterLockedContentFragment$key } from '@//:artifacts/SupporterLockedContentFragment.graphql'
import {
  SUPPORT_BUTTON_PROPS
} from '@//:domain/slug/club/RootPublicClub/DisposePublicClub/ResultPublicClub/MetaPublicClub/ContainerPublicClub/SupportPublicClub/ClubSupportPrompt/ClubSupporterSubscriptionPriceButton/ClubSupporterSubscriptionPriceButton'
import LinkButton from '../../../../../../ThemeComponents/LinkButton/LinkButton'
import { Icon } from '../../../../../../PageLayout'
import { ControlPlayButton, MagicBall } from '@//:assets/icons'
import formatSecondsIntoMinutes from '../../../../../Media/support/formatSecondsIntoMinutes'

interface Props {
  children: ReactNode
  postQuery: SupporterLockedFragment$key
  postContentQuery: SupporterLockedContentFragment$key
}

const PostContentFragment = graphql`
  fragment SupporterLockedContentFragment on PostContent {
    supporterOnlyVideoMediaDuration
  }
`

const PostFragment = graphql`
  fragment SupporterLockedFragment on Post {
    club {
      slug
      canSupport
    }
  }
`

export default function SupporterLocked (props: Props): JSX.Element {
  const {
    children,
    postQuery,
    postContentQuery
  } = props

  const postContentData = useFragment(PostContentFragment, postContentQuery)
  const postData = useFragment(PostFragment, postQuery)

  return (
    <Box w='100%' h='100%' position='relative'>
      {children}
      <Center
        position='absolute'
        bg='dimmers.500'
        top={0}
        left={0}
        right={0}
        bottom={0}
      >
        <Stack align='flex-start' px={2} maxW='container.xs' w='100%' spacing={4}>
          <Icon icon={MagicBall} w={10} h={10} fill='gray.00' />
          <Heading fontSize='2xl' color='gray.00'>
            <Trans>
              This content can only be seen if you are a supporter of the club
            </Trans>
          </Heading>
          {postData.club.canSupport && (
            <LinkButton
              {...SUPPORT_BUTTON_PROPS}
              href={{
                pathname: '/[slug]',
                query: {
                  slug: postData.club.slug,
                  support: true
                }
              }}
            >
              <Trans>
                Unlock Supporter Content
              </Trans>
            </LinkButton>
          )}
          {(postContentData?.supporterOnlyVideoMediaDuration != null && postContentData.supporterOnlyVideoMediaDuration) && (
            <HStack spacing={2}>
              <Icon
                fill='gray.00'
                icon={ControlPlayButton}
                w={4}
                h={4}
              />
              <Heading noOfLines={1} color='gray.00' fontSize='md'>
                {formatSecondsIntoMinutes((postContentData.supporterOnlyVideoMediaDuration ?? 1) / 1000)}
              </Heading>
            </HStack>
          )}
        </Stack>
      </Center>
    </Box>
  )
}
