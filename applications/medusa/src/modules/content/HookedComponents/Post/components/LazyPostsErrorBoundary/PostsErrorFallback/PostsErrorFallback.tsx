import { Button, Heading, Stack } from '@chakra-ui/react'
import { Icon } from '../../../../../PageLayout'
import { ArrowButtonRefresh } from '@//:assets/icons/navigation'
import { Trans } from '@lingui/macro'

interface Props {
  error?: Error
  reset?: () => void
  refetch?: () => void
}

export default function PostsErrorFallback (props: Props): JSX.Element {
  const {
    error,
    reset,
    refetch
  } = props

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
    <Stack w='100%' align='center' spacing={2}>
      <Heading textAlign='center' fontSize='xl' color='gray.00'>
        <Trans>
          Sorry, we couldn't load any posts
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
  )
}
