import { ReactNode } from 'react'
import { Box, Center, Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { graphql, useFragment } from 'react-relay'
import { SupporterLockedFragment$key } from '@//:artifacts/SupporterLockedFragment.graphql'
import {
  SUPPORT_BUTTON_PROPS
} from '@//:domain/slug/club/RootPublicClub/DisposePublicClub/ResultPublicClub/MetaPublicClub/ContainerPublicClub/HeaderPublicClub/components/ClubSupporterSubscriptionPriceButton/ClubSupporterSubscriptionPriceButton'
import LinkButton from '../../../../../../ThemeComponents/LinkButton/LinkButton'
import { Icon } from '../../../../../../PageLayout'
import { MagicBall } from '@//:assets/icons'

interface Props {
  children: ReactNode
  postQuery: SupporterLockedFragment$key
}

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
    postQuery
  } = props

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
        </Stack>
      </Center>
    </Box>
  )
}
