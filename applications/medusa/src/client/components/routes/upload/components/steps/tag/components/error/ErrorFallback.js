/**
 * @flow
 */
import type { Node } from 'react';
import type { Error } from '@//:modules/utilities/ErrorBoundary';
import { Flex, Heading, IconButton } from '@chakra-ui/react';
import ButtonRefreshArrows from '@streamlinehq/streamlinehq/img/streamline-bold/button-refresh-arrows-08UlnL.svg';

import { useTranslation } from 'react-i18next';
import Icon from '@//:modules/content/icon/Icon';

type Props = {
  error: Error,
  reset: () => void,
  refetch: () => void,
};

// eslint-disable-next-line node/handle-callback-err
export default function ErrorFallback({ error, reset, refetch }: Props): Node {
  const [t] = useTranslation('error');

  const onReset = () => {
    // Refetch graphql data
    refetch()

    // reset error boundary to re-render
    reset()
  }

  return (
    <Flex direction="column" w="100%" h="100%" align="center" position="center">
      <Heading size="lg" mb={4}>
        {t('fallback.header')}
      </Heading>
      <IconButton
        aria-label={t('fallback.button')}
        variant="ghost"
        size="lg"
        onClick={onReset}
        icon={<Icon icon={ButtonRefreshArrows} fill="gray.50" />}
        isRound
      />
    </Flex>
  );
}
