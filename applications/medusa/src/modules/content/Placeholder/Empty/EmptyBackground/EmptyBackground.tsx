import { Flex, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

export interface HintProp {
  hint?: string | undefined | null
}

interface Props {
  children: ReactNode
}

export default function EmptyBackground ({ children }: Props): JSX.Element {
  return (
    <Flex px={4} py={4} bg='gray.800' borderRadius='md' h={100} justify='center' align='center'>
      <Text color='gray.200' textAlign='center' fontSize='lg'>
        {children}
      </Text>
    </Flex>
  )
}
