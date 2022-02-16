import { forwardRef, ReactNode, useTransition } from 'react'
import { Switch as ChakraSwitch, SwitchProps } from '@chakra-ui/react'
import useSSRDisable from '../../hooks/useSSRDisable'

interface Props extends SwitchProps {
  children?: ReactNode
}

const Switch = forwardRef<any, Props>(({
  isDisabled,
  children,
  onChange,
  ...rest
}: Props, ref): JSX.Element => {
  // @ts-expect-error
  const [isPending, startTransition] = useTransition({
    timeoutMs: 3000
  })

  const handleChange = (e): void => {
    startTransition(() => {
      onChange?.(e)
    })
  }

  const disableOverride = useSSRDisable()

  const fullDisable = (disableOverride) || (isDisabled ?? isPending)

  return (
    <ChakraSwitch
      ref={ref}
      isDisabled={fullDisable}
      onChange={handleChange}
      {...rest}
    >
      {children}
    </ChakraSwitch>
  )
})

export default Switch
