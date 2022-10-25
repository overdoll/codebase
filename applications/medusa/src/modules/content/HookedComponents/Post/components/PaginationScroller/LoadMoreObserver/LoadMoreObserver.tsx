import { useEffect, useRef, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { useUpdateEffect } from 'usehooks-ts'

interface Props {
  onObserve: () => void
  isLoadingNext: boolean
}

export default function LoadMoreObserver (props: Props): JSX.Element {
  const {
    onObserve,
    isLoadingNext
  } = props

  const ref = useRef(null)
  const [observing, setObserving] = useState(false)

  const observerCallback = (entries): void => {
    const [entry] = entries

    if (entry.isIntersecting === true && !isLoadingNext) {
      setObserving(true)
    } else if (entry.isIntersecting === false && !isLoadingNext) {
      setObserving(false)
    }
  }

  useUpdateEffect(() => {
    if (observing) {
      onObserve()
    }
  }, [observing])

  useEffect(() => {
    if (ref.current == null) return

    const observer = new IntersectionObserver(observerCallback)

    observer.observe(ref.current)

    return () => {
      if (ref.current == null) return
      observer.unobserve(ref.current)
    }
  }, [ref, isLoadingNext])

  return <Box ref={ref} />
}
