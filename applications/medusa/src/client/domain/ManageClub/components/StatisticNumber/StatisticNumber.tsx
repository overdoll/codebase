import { Box, Flex, Text } from '@chakra-ui/react'

interface Props {
  value: string
  text: string
  colorScheme?: string
}

export default function StatisticNumber ({
  value,
  text,
  colorScheme = 'orange'
}: Props): JSX.Element {
  return (
    <Box>
      <Flex align='center' h={6} mb={1}>
        <Box h='100%' bg={`${colorScheme}.300`} mr={2} borderRadius='sm' w={2} />
        <Text fontSize='lg' color='gray.00'>
          {text}
        </Text>
      </Flex>
      <Text lineHeight={1} color={`${colorScheme}.100`} fontSize='7xl' fontWeight='bold'>
        {value}
      </Text>
    </Box>
  )
}
