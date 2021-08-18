/**
 * @flow
 */
import type { Node } from 'react'
import { useEffect, useState } from 'react'
import { Button as ChakraButton } from '@chakra-ui/react'

const AnimatedButton = ChakraButton

type Props = {
  loading?: boolean,
  children?: Node,
  disabled?: boolean,
  type?: string,
};

export default function Button ({
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
  const fullLoading = type === 'submit' ? (disableOverride || loading) : loading

  return (
    <AnimatedButton
      {...rest}
      type={type}
      isDisabled={fullDisable}
      isLoading={fullLoading}
    >
      {children}
    </AnimatedButton>
  )
}
