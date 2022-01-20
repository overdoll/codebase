import { Flex, HTMLChakraProps, Spinner } from '@chakra-ui/react'

interface Props extends HTMLChakraProps<any> {
  isLoading: boolean
}

export default function LoadingSpinner ({
  isLoading
}: Props): JSX.Element {
  if (!isLoading) return <></>

  return (
    <Flex borderRadius='full' p={2} bg='dimmers.500'>
      <Spinner
        boxShadow='lg'
        thickness='3px'
        speed='0.65s'
        emptyColor='transparent'
        color='gray.00'
        size='lg'
      />
    </Flex>

  )
}
