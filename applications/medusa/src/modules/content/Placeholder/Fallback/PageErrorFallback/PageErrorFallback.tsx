import { Button, Center, Heading } from '@chakra-ui/react'
import Icon from '../../../PageLayout/Flair/Icon/Icon'
import { ArrowButtonRefresh } from '@//:assets/icons/navigation'
import { Trans } from '@lingui/react'

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

  const errorMessage = error?.message ?? ''

  return (
    <Center bg='gray.800' borderRadius='lg'>
      <Heading>
        this page ran into an error
      </Heading>
      <Heading>
        ${errorMessage}
      </Heading>
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
    </Center>
  )
}
