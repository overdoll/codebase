import { ReactNode, useTransition } from 'react'
import { forwardRef, IconButton as ChakraButton, IconButtonProps } from '@chakra-ui/react'
import { ForwardRefProp } from '@//:types/components'
import { useHydrate } from '../../hydrate'

interface Props extends IconButtonProps, ForwardRefProp {
  children?: ReactNode
  ignoreTransition?: boolean
}

const IconButton = forwardRef<Props, any>(({
  children,
  isDisabled,
  isLoading,
  onClick,
  type,
  ignoreTransition,
  ...rest
}: Props, forwardRef) => {
  // @ts-expect-error
  const [isPending, startTransition] = useTransition({
    timeoutMs: 700
  })

  const handleClick = (e): void => {
    if (ignoreTransition === true) {
      onClick?.(e)
      return
    }
    startTransition(() => {
      onClick?.(e)
    })
  }

  const isHydrated = useHydrate()

  const fullDisable = (isDisabled === true || isLoading)
  // for type=submit (forms), we show a loading state, or else it will bug out
  const fullLoading = type === 'submit' ? (!isHydrated ?? isLoading ?? isPending) : (isLoading ?? isPending)

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
