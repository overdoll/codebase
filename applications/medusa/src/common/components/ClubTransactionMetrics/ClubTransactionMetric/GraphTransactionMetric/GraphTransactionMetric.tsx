import { Box, Flex, Heading, HStack, Progress } from '@chakra-ui/react'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'

interface Props {
  colorScheme: string
  currentRatio: number
  currentAmount: string
  totalAmount: string
  targetRatio: number
}

export default function GraphTransactionMetric ({
  colorScheme,
  currentRatio,
  currentAmount,
  totalAmount,
  targetRatio
}: Props): JSX.Element {
  return (
    <LargeBackgroundBox p={0} h={20} bg='gray.900'>
      <Flex h='100%' w='100%' position='relative'>
        <Flex align='center' h='100%' position='relative' w='100%' p={2}>
          <Progress
            borderRadius='base'
            bg='transparent'
            colorScheme={colorScheme}
            w='100%'
            value={(currentRatio * 100) / targetRatio}
            h='100%'
          />
          <Flex h='100%' align='center' justify='flex-start' left={4} position='absolute'>
            <Box>
              <Heading fontSize='xl' color='gray.00'>
                {(currentRatio * 100).toFixed(2)}%
              </Heading>
              <Heading fontSize='xs' color='gray.100'>
                <Trans>
                  {currentAmount} of {totalAmount}
                </Trans>
              </Heading>
            </Box>
          </Flex>
        </Flex>
        <HStack h='100%' align='center' justify='flex-end' right={4} position='absolute'>
          <Box bg='gray.00' w={1} h='100%' />
          <Heading fontSize='md' color='gray.00'>
            {targetRatio * 100}%
          </Heading>
        </HStack>
      </Flex>
    </LargeBackgroundBox>
  )
}
