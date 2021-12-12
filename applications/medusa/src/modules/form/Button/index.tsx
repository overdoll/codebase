import { useEffect, useState } from 'react'
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'

interface Props extends ButtonProps {
  loading?: boolean
  children?: JSX.Element
  disabled?: boolean
}

export default function Button ({
  loading = false,
  children,
  disabled = false,
  type,
  isDisabled,
  isLoading,
  ...rest
}: Props): JSX.Element {
  const [disableOverride, setDisableOverride] = useState(true)

  // We need this hook here to enable the buttons after SSR hydration occurs
  // we dont want buttons to be usable until javascript is mounted or else we get issues
  useEffect(() => {
    setDisableOverride(false)
  }, [])

  // for type=submit (forms), we show a loading state
  const fullDisable = (disableOverride) || ((disabled || isDisabled))
  const fullLoading = type === 'submit' ? (disableOverride || (loading || isLoading)) : (loading || isLoading)

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
