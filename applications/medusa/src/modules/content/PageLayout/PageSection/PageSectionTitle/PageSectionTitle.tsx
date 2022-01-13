import { Box, Flex, Heading } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  colorScheme?: string
}

export default function PageSectionTitle ({
  children,
  colorScheme = 'gray'
}: Props): JSX.Element {
  return (
    <Flex my={1} h={7} align='center'>
      <Box h='100%' bg={`${colorScheme}.300`} mr={2} borderRadius='sm' w={2} />
      <Heading
        whiteSpace='nowrap'
        overflow='hidden'
        textOverflow='ellipsis'
        fontSize='2xl'
        color='gray.00'
      >
        {children}
      </Heading>
    </Flex>

  )
}
