import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import { useDebounce, useIntersectionObserver } from 'usehooks-ts'
import { LoadMoreFn } from 'react-relay/relay-hooks/useLoadMoreFunction'

interface Props {
  loadNext: LoadMoreFn<any>
  index: number
  length: number
}

export default function LoadMoreObserver ({
  loadNext,
  index,
  length
}: Props): JSX.Element {
  const ref = useRef(null)

  const entry = useIntersectionObserver(ref, {})
  const isIntersecting = useDebounce(entry?.isIntersecting, 100)

  const triggerPoint = length - 2

  useEffect(() => {
    loadNext(9, {})
  }, [isIntersecting])

  if (index === triggerPoint) {
    return <Box ref={ref} />
  }

  return <></>
}
