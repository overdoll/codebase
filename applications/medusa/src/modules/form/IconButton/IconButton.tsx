import { ReactNode, useTransition } from 'react'
import { IconButton as ChakraButton, IconButtonProps } from '@chakra-ui/react'
import useSSRDisable from '../../hooks/useSSRDisable'

const AnimatedButton = ChakraButton

interface Props extends IconButtonProps {
  children?: ReactNode
}

export default function IconButton ({
  isDisabled,
  isLoading,
  type,
  onClick,
  ...rest
}: Props): JSX.Element {
  // @ts-expect-error
  const [isPending, startTransition] = useTransition({
    timeoutMs: 10000
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
    <AnimatedButton
      type={type}
      onClick={handleClick}
      isDisabled={fullDisable}
      isLoading={fullLoading}
      {...rest}
    />
  )
}
