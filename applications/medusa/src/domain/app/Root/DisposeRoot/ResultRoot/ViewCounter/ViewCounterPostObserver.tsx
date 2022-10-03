import { useEffect, useRef } from 'react'
import { Timeout } from '@//:types/components'
import { Box } from '@chakra-ui/react'
import { useViewCounterContext } from './ViewCounter'

interface ViewCounterPostObserverProps {
  delay: number
  postId: string
}

export default function ViewCounterPostObserver (props: ViewCounterPostObserverProps): JSX.Element {
  const {
    delay,
    postId
  } = props

  const ref = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<Timeout | null>(null)

  const { countView } = useViewCounterContext()

  const onCountView = (): void => {
    countView(postId)
  }

  const observerOptions = {
    rootMargin: '0%',
    threshold: 0.5
  }

  const observerCallback = (entries): void => {
    const [entry] = entries

    if (entry.isIntersecting === true) {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        onCountView()
      }, delay)
    } else {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }

  useEffect(() => {
    if (ref.current == null) return

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    observer.observe(ref.current)

    return () => {
      if (ref.current == null) return
      observer.unobserve(ref.current)
    }
  }, [ref])

  return (
    <Box
      ref={ref}
      pointerEvents='none'
      position='absolute'
      top={0}
      bottom={0}
      left={0}
      right={0}
    />
  )
}
