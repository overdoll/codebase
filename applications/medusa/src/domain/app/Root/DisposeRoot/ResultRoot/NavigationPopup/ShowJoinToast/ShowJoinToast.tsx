import React, { useEffect, useRef } from 'react'
import { useSessionStorage } from 'usehooks-ts'
import { Timeout } from '@//:types/components'
import { Heading, Modal, ModalBody, ModalContent, ModalOverlay, Stack, useDisclosure } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { Icon } from '@//:modules/content/PageLayout'
import { BirdHouse, BookmarkFull } from '@//:assets/icons'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import Button from '@//:modules/form/Button/Button'

export default function ShowJoinToast (): JSX.Element {
  const timeoutRef = useRef<Timeout | null>(null)
  const buttonRef = useRef(null)

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  const [closedJoinPopupStorage, setClosedJoinPopupStorage] = useSessionStorage('closedNavigationJoinPopup', false)

  const closePopup = (): void => {
    onClose()
    setClosedJoinPopupStorage(true)
  }

  const openPopup = (): void => {
    if (closedJoinPopupStorage) return
    onOpen()
  }

  useEffect(() => {
    if (isOpen || closedJoinPopupStorage) return
    if (timeoutRef.current == null) {
      timeoutRef.current = setTimeout(openPopup, 45000)
    }

    return () => {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isOpen, timeoutRef, closedJoinPopupStorage])

  return (
    <Modal
      isOpen={isOpen}
      onClose={closePopup}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
      initialFocusRef={buttonRef}
      preserveScrollBarGap
      size={{
        base: 'sm',
        md: 'md'
      }}
    >
      <ModalOverlay />
      <ModalContent bg='#000'>
        <ModalBody p={5}>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Heading maxW={400} fontSize='3xl' color='whiteAlpha.900'>
                <Trans>
                  Don't miss out on joining the best digital adult content platform.
                </Trans>
              </Heading>
            </Stack>
            <Stack align='flex-start' spacing={2}>
              <Icon icon={BirdHouse} w={6} h={6} fill='orange.200' />
              <Heading fontSize='2xl' color='orange.200'>
                <Trans>
                  Content curation
                </Trans>
              </Heading>
            </Stack>
            <Stack align='flex-start' spacing={2}>
              <Icon icon={BookmarkFull} w={6} h={6} fill='teal.200' />
              <Heading fontSize='2xl' color='teal.200'>
                <Trans>
                  Saved posts
                </Trans>
              </Heading>
            </Stack>
            <Heading fontSize='xs' color='whiteAlpha.500'>
              <Trans>
                ...And a lot more cool things we haven't thought of yet. We don't sell your data.
              </Trans>
            </Heading>
            <Stack spacing={2}>
              <LinkButton
                onClick={closePopup}
                w='100%'
                colorScheme='primary'
                size='lg'
                ref={buttonRef}
                href='/join?from=join_modal_popup'
              >
                <Trans>
                  Join
                </Trans>
              </LinkButton>
              <Button onClick={closePopup} size='md' variant='ghost'>
                <Trans>
                  Leave me alone
                </Trans>
              </Button>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
