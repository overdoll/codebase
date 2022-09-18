import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import { useDebounce, useIntersectionObserver } from 'usehooks-ts'

interface Props {
  onObserve: () => void
}

export default function LoadMoreObserver (props: Props): JSX.Element {
  const { onObserve } = props

  const ref = useRef(null)

  const entry = useIntersectionObserver(ref, {})
  const isIntersecting = useDebounce(entry?.isIntersecting, 100)

  useEffect(() => {
    if (isIntersecting === true) {
      onObserve()
    }
  }, [isIntersecting])

  return <Box ref={ref} />
}
