import { graphql, useFragment } from 'react-relay'
import { ReactNode } from 'react'
import { PostSupporterContentFragment$key } from '@//:artifacts/PostSupporterContentFragment.graphql'
import { PostSupporterContentClubFragment$key } from '@//:artifacts/PostSupporterContentClubFragment.graphql'
import { Box, Heading, HStack, keyframes, Stack } from '@chakra-ui/react'
import { ActionUnlock } from '@//:assets/icons'
import { Icon } from '../../../../PageLayout'
import { Trans } from '@lingui/macro'
import LinkButton from '../../../../ThemeComponents/LinkButton/LinkButton'
import Can from '../../../../../authorization/Can'

interface Props {
  query: PostSupporterContentFragment$key
  clubQuery: PostSupporterContentClubFragment$key
  children: ReactNode
}

const Fragment = graphql`
  fragment PostSupporterContentFragment on PostContent {
    viewerCanViewSupporterOnlyContent
    isSupporterOnly
  }
`

const ClubFragment = graphql`
  fragment PostSupporterContentClubFragment on Club {
    slug
  }
`

export default function PostSupporterContent ({
  query,
  children,
  clubQuery
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)
  const clubData = useFragment(ClubFragment, clubQuery)

  const animateGlow = keyframes`
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 200% 50%;
    }
  `

  const GLOW = {
    bgGradient: 'linear(to-r,orange.300,orange.300,transparent,transparent,orange.300,orange.300,)',
    backgroundSize: '200% 200%',
    animation: `${animateGlow} 10s linear infinite`,
    transform: 'scale(0.96) translateZ(0)',
    filter: 'blur(8px)'
  }

  const SupporterBadge = (
    <HStack
      mb={3}
      justify='center'
      align='center'
      spacing={2}
    >
      <Icon
        icon={ActionUnlock}
        fill='orange.300'
        h={4}
        w={4}
      />
      <Heading
        lineHeight={1}
        fontSize='md'
        color='orange.300'
      >
        <Trans>
          Exclusive Supporter Content Unlocked
        </Trans>
      </Heading>
    </HStack>
  )

  const SupporterNavigationPrompt = (
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
        <Can I='interact' a='Club' passThrough>
          {allowed => (
            <LinkButton
              pointerEvents='auto'
              href={allowed === false ? `/${clubData.slug}` : `/${clubData.slug}?support=true`}
              leftIcon={(
                <Icon
                  icon={ActionUnlock}
                  fill='orange.900'
                  h={4}
                  w={4}
                />)}
              size='lg'
              colorScheme='orange'
            >
              <Trans>
                Become a Supporter
              </Trans>
            </LinkButton>
          )}
        </Can>
      </Stack>
    </Box>
  )

  const SupporterUnlockedPrompt = (
    <Box h='100%' w='100%' position='relative'>
      <Box {...GLOW} h='100%' w='100%' position='absolute' />
      {children}
    </Box>
  )

  return (
    <>
      {(data.isSupporterOnly && data.viewerCanViewSupporterOnlyContent) && SupporterBadge}
      {data.isSupporterOnly
        ? (data.viewerCanViewSupporterOnlyContent
            ? SupporterUnlockedPrompt
            : SupporterNavigationPrompt)
        : children}
    </>
  )
}
