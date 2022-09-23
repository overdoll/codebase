import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'
import encodeJoinRedirect from '@//:modules/support/encodeJoinRedirect'
import { Trans } from '@lingui/macro'
import { Icon } from '@//:modules/content/PageLayout'
import { ArrowButtonRight } from '@//:assets/icons'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import trackFathomEvent from '@//:modules/support/trackFathomEvent'

interface Props {
  onClose: () => void
  onForget: () => void
}

export default function JoinToast (props: Props): JSX.Element {
  const {
    onClose,
    onForget
  } = props

  const router = useRouter()

  const redirect = encodeJoinRedirect(router.asPath, 'navigation_popup_button')

  const onClickJoin = (): void => {
    onClose()
    trackFathomEvent('VVNXUKFX', 1)
  }

  return (
    <Box p={3} bg='gray.900' borderRadius='lg' w='100%'>
      <Stack spacing={2}>
        <HStack spacing={0} align='flex-start'>
          <Text fontSize='xs' color='gray.00'>
            <Trans>
              Join overdoll to save your favorite posts and personalize your content feed!
            </Trans>
          </Text>
          <CloseButton onClick={onForget} />
        </HStack>
        <LinkButton
          w='100%'
          onClick={onClickJoin}
          rightIcon={<Icon icon={ArrowButtonRight} fill='teal.900' w={3} h={3} />}
          colorScheme='teal'
          borderRadius='full'
          size='sm'
          href={redirect}
        >
          <Trans>
            Join
          </Trans>
        </LinkButton>
      </Stack>
    </Box>
  )
}
