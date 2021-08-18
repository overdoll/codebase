/**
 * @flow
 */
import type { Node } from 'react'
import { useEffect, useState } from 'react'
import { Switch as ChakraSwitch } from '@chakra-ui/react'

const AnimatedSwitch = ChakraSwitch

type Props = {
  loading?: boolean,
  children?: Node,
  disabled?: boolean,
  type?: string,
};

export default function Switch ({
  loading,
  children,
  disabled,
  type,
  ...rest
}: Props): Node {
  const [disableOverride, setDisableOverride] = useState(true)

  // We need this hook here to enable the buttons after SSR hydration occurs
  // we dont want buttons to be usable until javascript is mounted or else we get issues
  useEffect(() => {
    setDisableOverride(false)
  }, [])

  // for type=submit (forms), we show a loading state
  const fullDisable = (disableOverride) || (disabled || loading)
  const fullLoading = disableOverride || loading

  return (
    <AnimatedSwitch
      {...rest}
      type={type}
      isDisabled={fullDisable}
      isLoading={fullLoading}
    >
      {children}
    </AnimatedSwitch>
  )
}
