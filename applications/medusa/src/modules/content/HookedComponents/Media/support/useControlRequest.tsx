import { MutableRefObject, ReactNode, useMemo, useRef, useState } from 'react'
import { Fade, Flex, useOutsideClick } from '@chakra-ui/react'
import { useUpdateEffect } from 'usehooks-ts'

type RequestType<T> = (control: T) => void
export type CancelRequestType = () => void

interface UseControlRequestProps {
  controls: {
    [key: string]: ReactNode
  }
  watchValue?: boolean
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
    controls: specifiedControls,
    watchValue
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
      // onCancel()
    }
  })

  useUpdateEffect(() => {
    if (watchValue === false) {
      onCancel()
    }
  }, [watchValue])

  const controls = useMemo(() => (
    <Flex ddata-ignore='controls' ref={ref} align='inherit' justify='inherit' w='inherit' h='inherit' position='relative'>
      {Object.keys(specifiedControls).map((item) => (
        <Fade
          data-ignore='controls'
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
