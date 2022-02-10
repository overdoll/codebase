import { forwardRef, ReactNode, useTransition } from 'react'
import { IconButton as ChakraButton, IconButtonProps } from '@chakra-ui/react'
import useSSRDisable from '../../hooks/useSSRDisable'
import { ForwardRefProp } from '@//:types/components'

interface Props extends IconButtonProps, ForwardRefProp {
  children?: ReactNode
}

const IconButton = forwardRef<any, Props>(({
  children,
  isDisabled,
  isLoading,
  onClick,
  type,
  ...rest
}: Props, forwardRef) => {
  // @ts-expect-error
  const [isPending, startTransition] = useTransition({
    timeoutMs: 3000
  })

  const handleClick = (e): void => {
    startTransition(() => {
      onClick?.(e)
    })
  }

  const disableOverride = useSSRDisable()

  // for type=submit (forms), we show a loading state
  const fullDisable = (disableOverride) || (isDisabled ?? isLoading)
  const fullLoading = type === 'submit' ? (disableOverride ?? isLoading ?? isPending) : (isLoading ?? isPending)

  return (
    <ChakraButton
      ref={forwardRef}
      type={type}
      onClick={handleClick}
      isDisabled={fullDisable}
      isLoading={fullLoading}
      {...rest}
    />
  )
})

export default IconButton
