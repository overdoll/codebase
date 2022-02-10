import { ButtonProps, IToast, ToastState, useToast as ChakraUseToast } from '@chakra-ui/react'

interface Props extends ButtonProps {
  to: string
}

export default function useToast ({
  to,
  children,
  ...rest
}: Props): IToast {
  // render component here
  const toast = ChakraUseToast()

  const onCreateToast = (): void => {
    // options here
    toast()
  }

  return onCreateToast
}
