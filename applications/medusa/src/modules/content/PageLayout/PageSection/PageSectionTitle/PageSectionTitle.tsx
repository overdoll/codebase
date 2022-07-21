import { Box, Flex, Heading } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  colorScheme?: string
}

export default function PageSectionTitle ({
  children,
  colorScheme
}: Props): JSX.Element {
  return (
    <Flex
      my={1}
      h={{
        base: 5,
        md: 6
      }}
      align='center'

    >
      {colorScheme != null && (
        <Box my={1} h='100%' bg={`${colorScheme}.300`} mr={2} borderRadius='sm' w={2} />
      )}
      <Heading
        overflow='visible'
        lineHeight={1.2}
        noOfLines={1}
        fontSize={{
          base: 'xl',
          md: '2xl'
        }}
        color='gray.00'
      >
        {children}
      </Heading>
    </Flex>

  )
}
