import { useDisclosure, useTimeout } from '@chakra-ui/react'
import { useState } from 'react'

/**
 * useDisclosure hook modified so that when it is opened
 * it will close after a few seconds
 */

interface TimedDisclosure {
  isOpen: boolean
  onMouseOver: () => void
  onMouseHold: () => void
  onMouseOut: () => void
  onTap: () => void
}

interface TimedDisclosureProps {
  tapTimeout?: number
  hoverTimeout: number
  defaultIsOpen?: boolean
}

export default function useTimedDisclosure ({
  tapTimeout = 1500,
  hoverTimeout = 5000,
  defaultIsOpen = false
}: TimedDisclosureProps): TimedDisclosure {
  const {
    isOpen,
    onOpen: onOpenAction,
    onClose: onCloseAction
  } = useDisclosure({ defaultIsOpen: defaultIsOpen })

  const [hoverDelay, setHoverDelay] = useState<number | null>(hoverTimeout)

  const onMouseOut = (): void => {
    onCloseAction()
  }

  const onMouseHold = (): void => {
    setHoverDelay(null)
  }

  const onMouseOver = (): void => {
    onOpenAction()
    setHoverDelay(hoverTimeout)
  }

  const onTap = (): void => {
    if (isOpen) {
      onCloseAction()
      return
    }
    onOpenAction()
    setHoverDelay(tapTimeout)
  }

  useTimeout(onCloseAction, hoverDelay)

  return {
    isOpen,
    onMouseOver,
    onMouseHold,
    onMouseOut,
    onTap
  }
}
