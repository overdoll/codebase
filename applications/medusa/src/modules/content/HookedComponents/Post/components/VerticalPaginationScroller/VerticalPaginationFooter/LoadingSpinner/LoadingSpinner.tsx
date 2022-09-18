import { Flex, Spinner } from '@chakra-ui/react'

export default function LoadingSpinner (): JSX.Element {
  return (
    <Flex
      w='100%'
      justify='center'
      h={16}
    >
      <Spinner color='gray.300' size='sm' />
    </Flex>
  )
}
