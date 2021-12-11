/**
 * @flow
 */
import type { Node } from 'react'
import { useEffect, useState } from 'react'
import { Button as ChakraButton } from '@chakra-ui/react'

type Props = {
  loading?: boolean,
  children?: Node,
  isDisabled?: boolean,
  isLoading?: boolean,
  disabled?: boolean,
  type?: string,
};

export default function Button ({
  loading,
  children,
  disabled,
  type,
  isDisabled,
  isLoading,
  ...rest
}: Props): Node {
  const [disableOverride, setDisableOverride] = useState(true)

  // We need this hook here to enable the buttons after SSR hydration occurs
  // we dont want buttons to be usable until javascript is mounted or else we get issues
  useEffect(() => {
    setDisableOverride(false)
  }, [])

  // for type=submit (forms), we show a loading state
  const fullDisable = (disableOverride) || (disabled || isDisabled)
  const fullLoading = type === 'submit' ? (disableOverride || loading || isLoading) : (loading || isLoading)

  return (
    <ChakraButton
      type={type}
      isDisabled={fullDisable}
      isLoading={fullLoading}
      {...rest}
    >
      {children}
    </ChakraButton>
  )
}
