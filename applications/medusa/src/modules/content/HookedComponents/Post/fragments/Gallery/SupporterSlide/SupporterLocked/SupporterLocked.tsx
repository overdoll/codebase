import { ReactNode } from 'react'
import { Box, Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { graphql, useFragment } from 'react-relay'
import { SupporterLockedFragment$key } from '@//:artifacts/SupporterLockedFragment.graphql'
import {
  SUPPORT_BUTTON_PROPS
} from '@//:domain/slug/club/RootPublicClub/DisposePublicClub/ResultPublicClub/MetaPublicClub/ContainerPublicClub/HeaderPublicClub/ClubSupporterSubscriptionPriceButton/ClubSupporterSubscriptionPriceButton'
import LinkButton from '../../../../../../ThemeComponents/LinkButton/LinkButton'

interface Props {
  children: ReactNode
  postQuery: SupporterLockedFragment$key
}

const PostFragment = graphql`
  fragment SupporterLockedFragment on Post {
    club {
      slug
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
      <Stack
        bg='dimmers.400'
        h='100%'
        w='100%'
        top={0}
        right={0}
        position='absolute'
        align='center'
        justify='center'
        px={8}
        spacing={4}
        pointerEvents='none'
      >
        <Heading fontSize='lg' color='gray.00' textAlign='center'>
          <Trans>
            This content can only be seen if you are a supporter of the club
          </Trans>
        </Heading>
        <LinkButton
          {...SUPPORT_BUTTON_PROPS}
          href={{
            pathname: '/[slug]',
            query: {
              slug: postData.club.slug
            }
          }}
        >
          <Trans>
            Unlock Supporter Content
          </Trans>
        </LinkButton>
      </Stack>
    </Box>
  )
}
