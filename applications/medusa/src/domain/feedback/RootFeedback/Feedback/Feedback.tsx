import { createWidget } from '@typeform/embed'
import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import '@typeform/embed/build/css/widget.css'

export default function Feedback (): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current == null) return
    createWidget('As3Jw9zC', {
      container: ref.current
    })
  }, [ref])

  return (
    <>
      <Box h='100%' w='100%' ref={ref} id='form' />
    </>
  )
}
