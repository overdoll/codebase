import { ButtonProps } from '@chakra-ui/react'

interface Props extends ButtonProps {
  to: string
}

export default function useToast ({
  to,
  children,
  ...rest
}: Props): JSX.Element {
  // render component here

  /*
  const toast = ChakraUseToast()

  const onCreateToast = (): void => {
    // options here
    toast()
  }

   */

  return <></>
}
