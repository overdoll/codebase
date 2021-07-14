/**
 * @flow
 */
import type { Node } from 'react'
import type { Error } from '@//:modules/utilities/ErrorBoundary'
import { Flex, Heading, IconButton, Button, Text } from '@chakra-ui/react'
import ButtonRefreshArrows
  from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/multimedia-controls/button-refresh-arrows.svg'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/icon/Icon'

type Props = {
  error: Error,
  reset: () => void,
  refetch: () => void,
};

// eslint-disable-next-line node/handle-callback-err
export default function ErrorFallback ({ error, reset, refetch }: Props): Node {
  const [t] = useTranslation('error')

  const onReset = () => {
    // Refetch graphql data
    refetch()

    // reset error boundary to re-render
    reset()
  }

  return (
    <Flex direction='column' w='100%' h='100%' align='center' position='center'>
      <Heading fontSize='lg' color='gray.100' mb={4}>
        {t('fallback.header')}
      </Heading>
      <Text size='sm' color='gray.300'>{error.Error}</Text>
      <Button
        variant='solid'
        size='md'
        onClick={onReset}
        leftIcon={<Icon icon={ButtonRefreshArrows} w={4} h={4} fill='gray.100' />}
      >
        {t('fallback.button')}
      </Button>
    </Flex>
  )
}
