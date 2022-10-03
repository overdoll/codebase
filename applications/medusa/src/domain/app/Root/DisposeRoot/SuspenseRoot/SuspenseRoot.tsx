import { Center, Spinner } from '@chakra-ui/react'
import { MobileContainer } from '@//:modules/content/PageLayout'

export default function SuspenseRoot (): JSX.Element {
  return (
    <MobileContainer pt={2}>
      <Center h={300} w='100%'>
        <Spinner thickness='6px' w={12} h={12} color='primary.400' />
      </Center>
    </MobileContainer>
  )
}
