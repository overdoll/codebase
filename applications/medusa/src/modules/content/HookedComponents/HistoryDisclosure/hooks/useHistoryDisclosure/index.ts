import { useEffect } from 'react'
import { useDisclosure, UseDisclosureProps, UseDisclosureReturn } from '@chakra-ui/react'
import { useHistory } from '../../../../../routing'

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

  const history = useHistory()

  const onOpen = (): void => {
    const currentLocation = `${history.location.pathname}${history.location.search}`
    history.push(currentLocation, { hasModal: true })
    onOpenAction()
  }

  const onClose = (): void => {
    const currentHistory = history.location
    const state = currentHistory.state as HistoryDisclosureState
    if (state?.hasModal === true) {
      // TODO: if there was a route change, this makes the modal un-usable?
      //  history.goBack()
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
    onToggle,
    ...rest
  }
}
