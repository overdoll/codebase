import { forwardRef, ReactNode, useTransition } from 'react'
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import useSSRDisable from '../../hooks/useSSRDisable'

interface Props extends ButtonProps {
  children?: ReactNode
  ignoreTransition?: boolean
}

const Button = forwardRef<any, Props>(({
  children,
  type,
  isDisabled,
  isLoading,
  onClick,
  ignoreTransition = false,
  ...rest
}: Props, forwardRef) => {
  // @ts-expect-error
  const [isPending, startTransition] = useTransition({
    timeoutMs: 700
  })

  const handleClick = (e): void => {
    if (ignoreTransition) {
      onClick?.(e)
      return
    }
    startTransition(() => {
      onClick?.(e)
    })
  }

  const disableOverride = useSSRDisable()

  // for type=submit (forms), we show a loading state
  const fullDisable = (disableOverride) || (isDisabled)
  const fullLoading = type === 'submit' ? (disableOverride || (isLoading ?? isPending)) : (isLoading ?? isPending)

  return (
    <ChakraButton
      ref={forwardRef}
      type={type}
      onClick={onClick != null ? (e) => handleClick(e) : undefined}
      isDisabled={fullDisable}
      isLoading={fullLoading}
      {...rest}
    >
      {children}
    </ChakraButton>
  )
})

export default Button
