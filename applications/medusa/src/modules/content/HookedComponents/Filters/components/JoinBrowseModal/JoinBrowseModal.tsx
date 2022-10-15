import React, { useEffect, useRef } from 'react'
import { Timeout } from '@//:types/components'
import { useLocalStorage } from 'usehooks-ts'
import { useHydrate } from '../../../../../hydrate'
import { Box, Flex, Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import CloseButton from '../../../../ThemeComponents/CloseButton/CloseButton'
import { useRouter } from 'next/router'
import RootModalJoin from './RootModalJoin/RootModalJoin'
import { usePageVisibility } from '../../../../../hooks/usePageVisibility'

export default function JoinBrowseModal (): JSX.Element {
  const [closedJoinBannerStorage, setClosedJoinBannerStorage] = useLocalStorage('closedJoinBannerPopup', false)
  const router = useRouter()

  const isVisible = usePageVisibility()

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure({
    onClose () {
      setClosedJoinBannerStorage(true)
    }
  })

  const timerRef = useRef<Timeout | null>()

  const isHydrated = useHydrate()

  useEffect(() => {
    if (closedJoinBannerStorage || !isVisible) return
    if (timerRef.current != null) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      onOpen()
      void router.prefetch('/join')
    }, 40000)

    return () => {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current)
      }
    }
  }, [timerRef.current, closedJoinBannerStorage, isVisible])

  if (!isHydrated || closedJoinBannerStorage) return <></>

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
      preserveScrollBarGap
      size={{
        base: 'sm',
        md: 'md'
      }}
    >
      <ModalOverlay />
      <ModalContent bg='#000'>
        <ModalBody p={4}>
          <Box position='relative'>
            <Flex top={0} position='absolute' w='100%' justify='flex-end'>
              <CloseButton onClick={onClose} />
            </Flex>
            <RootModalJoin />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
