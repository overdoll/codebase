import { ReactNode, useEffect, useState } from 'react'
import { Switch as ChakraSwitch, SwitchProps } from '@chakra-ui/react'

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
  const [disableOverride, setDisableOverride] = useState(true)

  // We need this hook here to enable the buttons after SSR hydration occurs
  // we dont want buttons to be usable until javascript is mounted or else we get issues
  useEffect(() => {
    setDisableOverride(false)
  }, [])

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
