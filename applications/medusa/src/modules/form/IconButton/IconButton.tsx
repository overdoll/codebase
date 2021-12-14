import { ReactNode, useEffect, useState } from 'react'
import { IconButton as ChakraButton, IconButtonProps } from '@chakra-ui/react'

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
    />
  )
}
