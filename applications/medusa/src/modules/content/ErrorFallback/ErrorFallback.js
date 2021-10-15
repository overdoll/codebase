/**
 * @flow
 */
import type { Node } from 'react'
import type { Error } from '@//:modules/utilities/ErrorBoundary'
import { Flex, Button, AlertIcon, AlertDescription, Alert } from '@chakra-ui/react'
import ButtonRefreshArrows
  from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/multimedia-controls/button-refresh-arrows.svg'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/Icon/Icon'

type Props = {
  error?: Error,
  reset?: () => void,
  refetch: () => void,
};

// eslint-disable-next-line node/handle-callback-err
export default function ErrorFallback ({ error, reset, refetch }: Props): Node {
  const [t] = useTranslation('error')

  const onReset = () => {
    // Refetch graphql data
    refetch()

    // reset error boundary to re-render
    reset && reset()
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
          onClick={onReset} size='sm' leftIcon={<Icon icon={ButtonRefreshArrows} w={4} h={4} fill='orange.900' />}
          colorScheme='orange' variant='solid'
        >{t('fallback.button')}
        </Button>
      </Flex>
    </Alert>
  )
}
