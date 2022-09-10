import { useModalManager } from './useModalManager'
import { RefObject, useRef } from 'react'

interface UseModalProps {
  isOpen: boolean
  onClose: () => void
}

interface UseModalReturn extends Pick<UseModalProps, 'isOpen' | 'onClose'> {
  dialogRef: RefObject<HTMLElement>
}

export function useModal (props: UseModalProps): UseModalReturn {
  const {
    isOpen,
    onClose
  } = props

  const dialogRef = useRef<HTMLElement>(null)

  useModalManager(dialogRef, isOpen)

  return {
    isOpen,
    onClose,
    dialogRef
  }
}
