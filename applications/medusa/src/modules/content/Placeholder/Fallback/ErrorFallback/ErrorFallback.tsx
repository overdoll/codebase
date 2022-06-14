import { Button, Flex } from '@chakra-ui/react'
import Icon from '../../../PageLayout/Flair/Icon/Icon'
import { ArrowButtonRefresh } from '@//:assets/icons/navigation'
import { Trans } from '@lingui/react'
import { Alert, AlertDescription, AlertIcon } from '../../../ThemeComponents'

interface Props {
  error?: Error
  reset?: () => void
  refetch?: () => void
}

// eslint-disable-next-line node/handle-callback-err
export default function ErrorFallback ({
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

  const errorMessage = error?.message ?? ''

  return (
    <Alert m={0} my={2} status='warning'>
      <Flex w='100%' align='center' justify='space-between'>
        <Flex align='center'>
          <AlertIcon />
          <AlertDescription>
            <Trans
              id='message.fallback.error.message'
              values={{ errorMessage: errorMessage }}
              message={`Error ${errorMessage}`}
              components={{}}
            />
          </AlertDescription>
        </Flex>
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
          <Trans
            id='message.fallback.error.retry'
            values={{}}
            message='Retry'
            components={{}}
          />
        </Button>
      </Flex>
    </Alert>
  )
}
