import { Box, Collapse, Heading, HStack, Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import encodeJoinRedirect from '@//:modules/support/encodeJoinRedirect'
import { useRouter } from 'next/router'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { t, Trans } from '@lingui/macro'
import { Icon } from '@//:modules/content/PageLayout'
import { ArrowButtonRight, RemoveCross } from '@//:assets/icons'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { useLingui } from '@lingui/react'
import { useLocalStorage } from 'usehooks-ts'

export default function JoinPopup (): JSX.Element {
  const [popup, setPopup] = useState(false)

  const router = useRouter()

  const redirect = encodeJoinRedirect(router.asPath, 'navigation_popup_button')

  const [closedPopupStorage, setClosedPopupStorage] = useLocalStorage('closedNavigationJoinPopup', false)

  const hiddenOn = ['/join', '/verify-token', '/confirm-email', '/logout']

  const { i18n } = useLingui()

  const openPopup = (): void => {
    if (closedPopupStorage) return
    setPopup(true)
  }

  const closePopup = (): void => {
    setClosedPopupStorage(true)
    setPopup(false)
  }

  useEffect(() => {
    setTimeout(openPopup, 30000)
  }, [])

  if (hiddenOn.some((item) => router.asPath.includes(item))) {
    return <></>
  }

  return (
    <Box
      zIndex='docked'
      right={1}
      top={{
        base: 1,
        md: 58
      }}
      position='fixed'
    >
      <Collapse in={popup}>
        <Stack p={2} spacing={1} align='center' bg='dimmers.500' borderRadius='lg' w={200}>
          <Heading textAlign='center' fontSize='xs' color='whiteAlpha.800'>
            <Trans>
              Join overdoll to save your favorite posts and personalize content!
            </Trans>
          </Heading>
          <HStack spacing={1}>
            <IconButton
              borderRadius='full'
              size='sm'
              colorScheme='gray'
              onClick={closePopup}
              icon={<Icon icon={RemoveCross} fill='gray.100' w={3} h={3} />}
              aria-label={i18n._(t`Close Popup`)}
            />
            <LinkButton
              onClick={closePopup}
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
          </HStack>
        </Stack>
      </Collapse>
    </Box>
  )
}
