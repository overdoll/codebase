import { useEffect } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { useHistory } from '@//:modules/routing'

// useDisclosure hook modified so that when it is opened
// identical entry into history is added and
// when the back button is pressed its closed

export default function useHistoryDisclosure () {
  const {
    isOpen,
    onOpen: onOpenAction,
    onClose: onCloseAction,
    onToggle: onToggleAction
  } = useDisclosure()

  const history = useHistory()

  const onOpen = (): void => {
    const currentLocation = history.location.pathname
    history.push(key, value)
    onOpenAction()
  }

  const onClose = (): void => {
    const currentHistory = history.location
    if (currentHistory.state?.hasModal) {
      history.goBack()
    }
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
    return history.listen((location, action) => {
      if (isOpen && action === 'POP') {
        onCloseAction()
      }
    })
  }, [isOpen])

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle
  }
}
