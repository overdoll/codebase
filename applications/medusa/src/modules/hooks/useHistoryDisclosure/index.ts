import { useEffect } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { useHistory } from '../../routing'

// useDisclosure hook modified so that when it is opened
// identical entry into history is added and
// when the back button is pressed its closed

interface HistoryDisclosure {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void

  onToggle: () => void

}

interface HistoryDisclosureState {
  hasModal?: boolean
}

export default function useHistoryDisclosure (): HistoryDisclosure {
  const {
    isOpen,
    onOpen: onOpenAction,
    onClose: onCloseAction
  } = useDisclosure()

  const history = useHistory()

  const onOpen = (): void => {
    const currentLocation = history.location.pathname
    history.push(currentLocation, { hasModal: true })
    onOpenAction()
  }

  const onClose = (): void => {
    const currentHistory = history.location
    const state = currentHistory.state as HistoryDisclosureState
    if (state?.hasModal === true) {
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