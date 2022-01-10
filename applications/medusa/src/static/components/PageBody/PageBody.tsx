import { Box, Button, Center, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { formatDuration, intervalToDuration } from 'date-fns'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function PageBody (): JSX.Element {
  const calculateRemainingTime = (): Duration => {
    return intervalToDuration({
      start: new Date('2022-04-01T00:00:00.000Z'),
      end: new Date()
    })
  }

  const [timer, setTimer] = useState(calculateRemainingTime())

  useEffect(() => {
    const timerObject = setTimeout(() => {
      setTimer(calculateRemainingTime())
    }, 1000)

    return () => clearTimeout(timerObject)
  })

  const duration = formatDuration(timer)

  return (
    <Flex h={800} align='center' justify='center' w='100%'>
      <Stack spacing={12}>
        <Stack spacing={2}>
          <Heading fontSize='2xl' color='primary.400'>
            overdoll.com
          </Heading>
          <Text color='gray.00' fontSize='lg'>
            The next platform for digital artists creating adult content
          </Text>
        </Stack>
        <Center>
          <Box borderRadius='md' bg='gray.800' p={4}>
            <Heading fontSize='xl' color='gray.00'>
              {duration}
            </Heading>
          </Box>
        </Center>
        <HStack spacing={4}>
          <Link href='/privacy'>
            <Button colorScheme='primary' variant='link'>
              Privacy Policy
            </Button>
          </Link>
          <Link href='/tos'>
            <Button colorScheme='primary' variant='link'>
              Terms of Service
            </Button>
          </Link>
        </HStack>
      </Stack>
    </Flex>
  )
}
