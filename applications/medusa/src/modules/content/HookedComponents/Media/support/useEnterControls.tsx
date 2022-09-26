import { MutableRefObject, useEffect, useRef, useState } from 'react'
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
    isDisabled,
  } = props

  const timeout = useRef<Timeout | null>(null)

  const [isOpen, setOpen] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  const clearControlTimeout = (): void => {
    if (timeout?.current != null) {
      clearTimeout(timeout?.current)
    }
  }

  const onCloseControls = (): void => {
    clearControlTimeout()
    setOpen(false)
    setShowCursor(false)
  }

  const refreshControlTimeout = (): void => {
    clearControlTimeout()
    timeout.current = setTimeout(onCloseControls, 2500)
  }

  const onMouseEnter = (): void => {
    setShowCursor(true)
    setOpen(true)
    refreshControlTimeout()
  }

  const onMouseOver = (): void => {
    setShowCursor(true)
    setOpen(true)
    refreshControlTimeout()
  }

  const onMouseLeave = (): void => {
    setShowCursor(false)
    clearControlTimeout()
    setOpen(false)
  }

  const onClick = (e): void => {
    if (!isOpen) {
      onMouseEnter()
    } else if (isOpen && (e.target.dataset.ignore !== 'controls' || e.target.parentNode.dataset.ignore !== 'controls')) {
      onMouseLeave()
    }
    if (e.target.dataset.ignore === 'controls' || e.target.parentNode.dataset.ignore === 'controls') {
      refreshControlTimeout()
    }
  }

  const onTouchMove = (e): void => {
    if (isOpen) {
      if (e.target.dataset.ignore === 'controls' || e.target.parentNode.dataset.ignore === 'controls') {
        refreshControlTimeout()
      }
    }
  }

  useEffect(() => {
    return () => {
      clearControlTimeout()
    }
  }, [])

  useEffect(() => {
    if (isDisabled === true) return
    ref.current?.addEventListener('click', onClick)
    ref.current?.addEventListener('touchmove', onTouchMove)
    ref.current?.addEventListener('mouseenter', onMouseEnter)
    ref.current?.addEventListener('mouseover', onMouseOver)
    ref.current?.addEventListener('mouseleave', onMouseLeave)
    return () => {
      ref.current?.removeEventListener('click', onClick)
      ref.current?.removeEventListener('touchmove', onTouchMove)
      ref.current?.removeEventListener('mouseenter', onMouseEnter)
      ref.current?.removeEventListener('mouseover', onMouseOver)
      ref.current?.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [isOpen, setOpen, isDisabled])

  return {
    isOpen: isOpen,
    showCursor: showCursor,
  }
}
