import { MutableRefObject, ReactNode, useMemo, useRef, useState } from 'react'
import { Fade, Flex, useOutsideClick } from '@chakra-ui/react'

type RequestType<T> = (control: T) => void
export type CancelRequestType = () => void

interface UseControlRequestProps {
  controls: {
    [key: string]: ReactNode
  }
}

interface UseControlRequestReturn<T> {
  request: RequestType<T>
  controls: ReactNode
  cancelRequest: CancelRequestType
  ref?: MutableRefObject<null>
  currentControl: T | null
}

export default function useControlRequest<ControlT extends string> (props: UseControlRequestProps): UseControlRequestReturn<ControlT> {
  const {
    controls: specifiedControls
  } = props

  const [currentControl, setCurrentControl] = useState<ControlT | null>(null)

  const ref = useRef(null)

  const onRequest: RequestType<ControlT> = (control) => {
    setCurrentControl(control)
  }

  const onCancel: CancelRequestType = () => {
    setCurrentControl(null)
  }

  useOutsideClick({
    ref: ref,
    handler: () => {
      onCancel()
    }
  })

  const controls = useMemo(() => (
    <Flex ref={ref} align='inherit' justify='inherit' w='inherit' h='inherit' position='relative'>
      {Object.keys(specifiedControls).map((item) => (
        <Fade
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            pointerEvents: currentControl === item ? 'auto' : 'none'
          }}
          key={item}
          in={currentControl === item}
        >
          {specifiedControls[item]}
        </Fade>
      ))}
    </Flex>
  ), [currentControl])

  return {
    controls,
    request: onRequest,
    cancelRequest: onCancel,
    ref,
    currentControl
  }
}
