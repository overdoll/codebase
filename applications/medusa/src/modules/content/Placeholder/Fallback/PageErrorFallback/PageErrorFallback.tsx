import { Button, Flex, Heading, Stack } from '@chakra-ui/react'
import Icon from '../../../PageLayout/Flair/Icon/Icon'
import { ArrowButtonRefresh } from '@//:assets/icons/navigation'
import { Trans } from '@lingui/macro'

interface Props {
  error?: Error
  reset?: () => void
  refetch?: () => void
}

// eslint-disable-next-line node/handle-callback-err
export default function PageErrorFallback ({
  error,
  reset,
  refetch
}: Props): JSX.Element {
  const onReset = (): void => {
    if (refetch != null) {
      refetch()
    }

    if (reset != null) {
      reset()
    }
  }

  const errorMessage = error?.message

  return (
    <Flex p={4} bg='gray.800' borderRadius='lg'>
      <Stack w='100%' align='center' spacing={2}>
        <Heading textAlign='center' fontSize='xl' color='gray.00'>
          <Trans>
            Sorry, this page ran into an error
          </Trans>
        </Heading>
        {errorMessage != null && (
          <Heading fontSize='sm' color='gray.300'>
            {errorMessage}
          </Heading>
        )}
        <Button
          onClick={onReset}
          size='sm'
          leftIcon={
            <Icon
              icon={ArrowButtonRefresh}
              w={4}
              h={4}
              fill='orange.900'
            />
          }
          colorScheme='orange'
          variant='solid'
        >
          <Trans>
            Retry
          </Trans>
        </Button>
      </Stack>
    </Flex>
  )
}
