import { ReactNode } from 'react'
import { Switch as ChakraSwitch, SwitchProps } from '@chakra-ui/react'
import useSSRDisable from '../../hooks/useSSRDisable'

const AnimatedSwitch = ChakraSwitch

interface Props extends SwitchProps {
  loading?: boolean
  children?: ReactNode
  disabled?: boolean
}

export default function Switch ({
  loading = false,
  children,
  disabled = false,
  ...rest
}: Props): JSX.Element {
  const disableOverride = useSSRDisable()

  // for type=submit (forms), we show a loading state
  const fullDisable = (disableOverride) || (disabled || loading)

  return (
    <AnimatedSwitch
      {...rest}
      isDisabled={fullDisable}
    >
      {children}
    </AnimatedSwitch>
  )
}
