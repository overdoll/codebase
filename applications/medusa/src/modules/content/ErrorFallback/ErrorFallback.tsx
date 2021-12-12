import type { Error } from '@//:modules/utilities/ErrorBoundary'
import { Alert, AlertDescription, AlertIcon, Button, Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/Icon/Icon'
import { ArrowButtonRefresh } from '@//:assets/icons/navigation'

interface Props {
  error?: Error
  reset?: () => void
  refetch: () => void
}

// eslint-disable-next-line node/handle-callback-err
export default function ErrorFallback ({
  error,
  reset,
  refetch
}: Props): JSX.Element {
  const [t] = useTranslation('error')

  const onReset = (): void => {
    refetch()

    if (reset != null) {
      reset()
    }
  }

  return (
    <Alert m={2} status='warning'>
      <Flex w='100%' align='center' justify='space-between'>
        <Flex align='center'>
          <AlertIcon />
          <AlertDescription>
            {t('fallback.header')}
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
          {t('fallback.button')}
        </Button>
      </Flex>
    </Alert>
  )
}
