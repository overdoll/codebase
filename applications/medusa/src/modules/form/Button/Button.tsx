import { forwardRef, ReactNode, useEffect, useState } from 'react'
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'

interface Props extends ButtonProps {
  loading?: boolean
  children?: ReactNode
  disabled?: boolean
}

const Button = forwardRef<any, Props>(({
  loading = false,
  children,
  disabled = false,
  type,
  isDisabled,
  isLoading,
  ...rest
}: Props, ref) => {
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
      ref={ref}
      type={type}
      isDisabled={fullDisable}
      isLoading={fullLoading}
      {...rest}
    >
      {children}
    </ChakraButton>
  )
})

export default Button
