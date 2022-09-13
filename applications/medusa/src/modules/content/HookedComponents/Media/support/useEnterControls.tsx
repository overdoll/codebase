import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '@chakra-ui/react'
import { Timeout } from '@//:types/components'

interface UseEnterControlsReturn {
  isOpen: boolean
}

interface UseEnterControlsProps {
  ref: MutableRefObject<HTMLDivElement | null>
}

export default function useEnterControls (props: UseEnterControlsProps): UseEnterControlsReturn {
  const { ref } = props

  const mouseTimeout = useRef<Timeout | null>(null)
  const tapTimeout = useRef<Timeout | null>(null)

  const [isOpen, setOpen] = useState(false)

  const onClose = (): void => {
    if (mouseTimeout?.current != null) {
      clearTimeout(mouseTimeout?.current)
    }
    if (tapTimeout?.current != null) {
      clearTimeout(tapTimeout?.current)
    }
    setOpen(false)
  }

  const refreshMouseTimeout = (): void => {
    if (mouseTimeout?.current != null) {
      clearTimeout(mouseTimeout?.current)
    }
    mouseTimeout.current = setTimeout(onClose, 3000)
  }

  const refreshTapTimeout = (): void => {
    if (tapTimeout?.current != null) {
      clearTimeout(tapTimeout?.current)
    }
    tapTimeout.current = setTimeout(onClose, 1500)
  }

  const onOpenMouse = (): void => {
    setOpen(true)
    refreshMouseTimeout()
  }

  const onOpenTap = (): void => {
    setOpen(x => !x)
    refreshTapTimeout()
  }

  const handleMouseEnter = (): void => {
    onOpenMouse()
  }
  const handleMouseLeave = (): void => {
    onClose()
  }

  // TODO add handling what happens when cursor disappears and the user moves around the video to get it back
  // TODO adding the open functionality bugs out with the controls fade
  const handleMouseOver = (e): void => {
    if (e.target.dataset.ignore === 'click' || e.target.parentNode.dataset.ignore === 'click') {
      refreshTapTimeout()
      refreshMouseTimeout()
    }
  }

  const handleClick = (e): void => {
    if (e.target.dataset.ignore === 'click' || e.target.parentNode.dataset.ignore === 'click') {
      refreshTapTimeout()
      return
    }
    onOpenTap()
  }

  useOutsideClick({
    ref: ref,
    handler: () => onClose()
  })

  useEffect(() => {
    ref.current?.addEventListener('touchend', handleClick)
    ref.current?.addEventListener('mouseup', handleClick)
    ref.current?.addEventListener('mouseenter', handleMouseEnter)
    ref.current?.addEventListener('mouseover', handleMouseOver)
    ref.current?.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      ref.current?.removeEventListener('touchend', handleClick)
      ref.current?.removeEventListener('mouseup', handleClick)
      ref.current?.removeEventListener('mouseenter', handleMouseEnter)
      ref.current?.removeEventListener('mouseover', handleMouseOver)
      ref.current?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isOpen, setOpen])

  return {
    isOpen
  }
}
