import { ReactNode } from 'react'
import { IconButton as ChakraButton, IconButtonProps } from '@chakra-ui/react'
import useSSRDisable from '../../hooks/useSSRDisable'

const AnimatedButton = ChakraButton

interface Props extends IconButtonProps {
  loading?: boolean
  children?: ReactNode
  disabled?: boolean
}

export default function IconButton ({
  loading,
  disabled = false,
  type,
  ...rest
}: Props): JSX.Element {
  const disableOverride = useSSRDisable()

  // for type=submit (forms), we show a loading state
  const fullDisable = (disableOverride) || (disabled || loading)
  const fullLoading = type === 'submit' ? (disableOverride || loading) : loading

  return (
    <AnimatedButton
      type={type}
      isDisabled={fullDisable}
      isLoading={fullLoading}
      {...rest}
    />
  )
}
