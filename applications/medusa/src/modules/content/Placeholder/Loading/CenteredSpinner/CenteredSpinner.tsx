import { Flex, Spinner } from '@chakra-ui/react'

export default function CenteredSpinner (): JSX.Element {
  return (
    <Flex mt={40} h='100%' align='center' justify='center' direction='column'>
      <Spinner mb={6} thickness='4px' size='xl' color='primary.500' />
    </Flex>
  )
}
