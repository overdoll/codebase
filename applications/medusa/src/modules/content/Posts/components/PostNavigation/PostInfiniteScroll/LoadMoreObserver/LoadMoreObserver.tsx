import { TransitionStartFunction, useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import { useDebounce, useIntersectionObserver } from 'usehooks-ts'
import { LoadMoreFn } from 'react-relay/relay-hooks/useLoadMoreFunction'

interface Props {
  loadNext: LoadMoreFn<any>
  startTransition: TransitionStartFunction
}

export default function LoadMoreObserver ({
  loadNext,
  startTransition
}: Props): JSX.Element {
  const ref = useRef(null)

  const entry = useIntersectionObserver(ref, {})
  const isIntersecting = useDebounce(entry?.isIntersecting, 100)

  useEffect(() => {
    if (isIntersecting === true) {
      startTransition(() => {
        loadNext(12, {})
      })
    }
  }, [isIntersecting])

  return <Box ref={ref} />
}
