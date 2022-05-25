import { Box, Flex, Heading, HStack } from '@chakra-ui/react'
import { FunctionComponent, useMemo } from 'react'
import { Icon } from '@//:modules/content/PageLayout'
import { Random } from '@//:modules/utilities/random'
import hash from '@//:modules/utilities/hash'

interface Props {
  value: string
  text: string
  colorScheme?: string
  icon?: FunctionComponent<any>
}

export default function StatisticNumber ({
  value,
  text,
  colorScheme,
  icon
}: Props): JSX.Element {
  const memoized = useMemo(() => new Random(hash(text)), [text])

  const colors = [
    'purple',
    'orange',
    'teal',
    'green',
    'primary'
  ]

  const chosen = useMemo(() => memoized.nextInt32([0, 4]), [text])
  const randomColor = colors[chosen]

  const currentColor: string = colorScheme == null ? randomColor : colorScheme

  return (
    <Box w='100%' py={5} px={3} borderRadius='md' bg='gray.800'>
      <Flex h='100%' w='100%' direction='column' align='center'>
        <HStack spacing={3}>
          {icon != null && <Icon icon={icon} w={5} h={5} fill='gray.00' />}
          <Heading fontSize='2xl' color='gray.00'>
            {text}
          </Heading>
        </HStack>
        <Flex align='center'>
          <Heading lineHeight={1} color={`${currentColor}.300`} fontSize='7xl'>
            {value}
          </Heading>
        </Flex>
      </Flex>
    </Box>

  )
}
