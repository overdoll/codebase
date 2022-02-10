import { ReactNode, useTransition } from 'react'
import { Switch as ChakraSwitch, SwitchProps } from '@chakra-ui/react'
import useSSRDisable from '../../hooks/useSSRDisable'

interface Props extends SwitchProps {
  children?: ReactNode
}

export default function Switch ({
  isDisabled,
  children,
  onChange,
  ...rest
}: Props): JSX.Element {
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
      isDisabled={fullDisable}
      onChange={handleChange}
      {...rest}
    >
      {children}
    </ChakraSwitch>
  )
}
