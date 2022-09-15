import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '@chakra-ui/react'
import { Timeout } from '@//:types/components'

interface UseEnterControlsReturn {
  isOpen: boolean
  showCursor?: boolean
}

interface UseEnterControlsProps {
  ref: MutableRefObject<HTMLDivElement | null>
  isDisabled?: boolean
}

export default function useEnterControls (props: UseEnterControlsProps): UseEnterControlsReturn {
  const {
    ref,
    isDisabled
  } = props

  const mouseTimeout = useRef<Timeout | null>(null)
  const tapTimeout = useRef<Timeout | null>(null)

  const [isOpen, setOpen] = useState(false)
  const [showCursor, setShowCursor] = useState(false)

  const onClose = (): void => {
    if (mouseTimeout?.current != null) {
      clearTimeout(mouseTimeout?.current)
    }
    if (tapTimeout?.current != null) {
      clearTimeout(tapTimeout?.current)
    }
    setOpen(x => {
      if (!x) {
        return x
      }
      return false
    })
    setShowCursor(false)
  }

  const refreshMouseTimeout = (): void => {
    if (mouseTimeout?.current != null) {
      clearTimeout(mouseTimeout?.current)
    }
    mouseTimeout.current = setTimeout(onClose, 3000)
  }

  const refreshTapTimeout = (custom?: number): void => {
    if (tapTimeout?.current != null) {
      clearTimeout(tapTimeout?.current)
    }
    tapTimeout.current = setTimeout(onClose, custom ?? 1500)
  }

  const onOpenMouse = (): void => {
    setOpen(true)
    refreshMouseTimeout()
  }

  const onOpenTap = (): void => {
    setOpen((x: boolean) => {
      if (!x) {
        refreshTapTimeout()
      }
      return !x
    })
  }

  const handleMouseEnter = (): void => {
    onOpenMouse()
  }
  const handleMouseLeave = (): void => {
    onClose()
  }

  const handleMouseOver = (e): void => {
    setShowCursor(true)
    if (e.target.dataset.ignore === 'click' || e.target.parentNode.dataset.ignore === 'click') {
      refreshTapTimeout(3000)
      refreshMouseTimeout()
    }
  }

  const handleClick = (e): void => {
    setShowCursor(true)
    if (e.target.dataset.ignore === 'click' || e.target.parentNode.dataset.ignore === 'click') {
      if (mouseTimeout?.current != null) {
        clearTimeout(mouseTimeout?.current)
      }
      refreshTapTimeout(3000)
      return
    }
    onOpenTap()
  }

  useOutsideClick({
    ref: ref,
    handler: () => onClose()
  })

  useEffect(() => {
    ref.current?.addEventListener('click', handleClick)
    ref.current?.addEventListener('mouseenter', handleMouseEnter)
    ref.current?.addEventListener('mouseover', handleMouseOver)
    ref.current?.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      ref.current?.removeEventListener('click', handleClick)
      ref.current?.removeEventListener('mouseenter', handleMouseEnter)
      ref.current?.removeEventListener('mouseover', handleMouseOver)
      ref.current?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isOpen, setOpen])

  return {
    isOpen: isDisabled === true ? true : isOpen,
    showCursor: isDisabled === true ? true : showCursor
  }
}
