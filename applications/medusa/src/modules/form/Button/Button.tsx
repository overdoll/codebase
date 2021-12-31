import { ForwardedRef, forwardRef, ReactNode } from 'react'
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import useSSRDisable from '../../hooks/useSSRDisable'

interface Props extends ButtonProps {
  loading?: boolean
  children?: ReactNode
  disabled?: boolean
  forwardRef?: ForwardedRef<any>
}

const Button = forwardRef<any, Props>(({
  loading = false,
  children,
  disabled = false,
  type,
  isDisabled,
  isLoading,
  ...rest
}: Props, forwardRef) => {
  const disableOverride = useSSRDisable()

  // for type=submit (forms), we show a loading state
  const fullDisable = (disableOverride) || ((disabled || isDisabled))
  const fullLoading = type === 'submit' ? (disableOverride || (loading || isLoading)) : (loading || isLoading)

  return (
    <ChakraButton
      ref={forwardRef}
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
