import { MutableRefObject, useEffect, useState } from 'react'
import { useOutsideClick } from '@chakra-ui/react'

interface UseEnterControlsReturn {
  isOpen: boolean
}

interface UseEnterControlsProps {
  ref: MutableRefObject<HTMLDivElement | null>
}

export default function useEnterControls (props: UseEnterControlsProps): UseEnterControlsReturn {
  const { ref } = props

  const [isOpen, setOpen] = useState(false)

  const onOpen = (): void => {
    setOpen(true)
  }

  const onClose = (): void => {
    setOpen(false)
  }

  const handleClick = (e): void => {
    setOpen(x => !x)
  }
  const handleMouseOver = (e): void => {

  }
  const handleMouseOut = (e): void => {

  }

  useOutsideClick({
    ref: ref,
    handler: () => onClose()
  })

  useEffect(() => {
    ref.current?.addEventListener('click', handleClick)
    ref.current?.addEventListener('mouseover', handleMouseOver)
    ref.current?.addEventListener('mouseout', handleMouseOut)
    return () => {
      ref.current?.removeEventListener('click', handleClick)
      ref.current?.removeEventListener('mouseover', handleMouseOver)
      ref.current?.removeEventListener('mouseout', handleMouseOut)
    }
  }, [isOpen, setOpen])

  return {
    isOpen
  }
}
