import { Box, Flex, Heading, HStack, Progress } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'
import { Icon } from '@//:modules/content/PageLayout'
import { WarningTriangle } from '@//:assets/icons'

interface Props {
  hasUpdateError: boolean
  isUpdating: boolean
  onRetryUpdate: () => void
}

export default function ContentUpdateDisplay ({
  hasUpdateError,
  isUpdating,
  onRetryUpdate
}: Props): JSX.Element {
  if (isUpdating) {
    return (
      <Flex align='center' justify='center' p={3} bg='gray.800' borderRadius='md'>
        <Progress
          colorScheme='green'
          w='100%'
          value={100}
          hasStripe
          isAnimated
        />
      </Flex>
    )
  }

  if (hasUpdateError) {
    return (
      <Box borderWidth={2} borderColor='orange.300' overflow='hidden' bg='gray.800' borderRadius='md'>
        <HStack align='center' px={3} py={2} justify='space-between'>
          <HStack spacing={2}>
            <Icon icon={WarningTriangle} w={4} h={4} fill='orange.100' />
            <Heading fontSize='md' color='orange.100'>
              <Trans>
                Error adding uploaded files to post
              </Trans>
            </Heading>
          </HStack>
          <Button size='sm' onClick={onRetryUpdate} colorScheme='orange' variant='solid'>
            <Trans>
              Retry
            </Trans>
          </Button>
        </HStack>
      </Box>
    )
  }

  return (
    <></>
  )
}
