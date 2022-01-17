import { HTMLChakraProps, Spinner } from '@chakra-ui/react'

interface Props extends HTMLChakraProps<any> {
  isLoading: boolean
}

export default function LoadingSpinner ({
  isLoading
}: Props): JSX.Element {
  if (!isLoading) return <></>

  return (
    <Spinner
      boxShadow='lg'
      thickness='5px'
      speed='0.65s'
      emptyColor='gray.900'
      color='gray.00'
      size='xl'
    />
  )
}
