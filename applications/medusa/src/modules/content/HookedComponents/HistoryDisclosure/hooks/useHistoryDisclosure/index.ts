import { useDisclosure, UseDisclosureProps, UseDisclosureReturn } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * useDisclosure hook modified so that when it is opened
 * identical entry into history is added and
 * when the back button is pressed its closed
 */

interface HistoryDisclosureState {
  hasModal?: boolean
}

export default function useHistoryDisclosure (props: UseDisclosureProps = {}): UseDisclosureReturn {
  const {
    isOpen,
    onOpen: onOpenAction,
    onClose: onCloseAction,
    onToggle: onToggleAction,
    ...rest
  } = useDisclosure(props)

  const router = useRouter()

  const onOpen = (): void => {
    const currentLocation = router.asPath
    void router.push(currentLocation)
    onOpenAction()
  }

  const onClose = (): void => {
    onCloseAction()
  }

  const onToggle = (): void => {
    if (isOpen) {
      onClose()
      return
    }
    onOpen()
  }

  // When it detects that the user clicked the Back button and the modal
  // is still open, it will close the modal for the user
  useEffect(() => {
    return router.beforePopState((state) => {
      if (isOpen) {
        onCloseAction()
      }
      return true
    })
  }, [isOpen])

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    ...rest
  }
}
