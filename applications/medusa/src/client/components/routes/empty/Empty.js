/**
 * @flow
 */
import type { Node } from 'react';
import Icon from '@//:modules/content/icon/Icon';
import SignBadgeCircle from '@streamlinehq/streamlinehq/img/streamline-regular/sign-badge-circle-K1i3HA.svg';
import { useTranslation } from 'react-i18next';
import { Button } from '@//:modules/form';
import { Center, chakra, Flex, Heading } from '@chakra-ui/react';

export default function Empty(): Node {
  const [t] = useTranslation('empty');

  return (
    <Center mt={8}>
      <Flex w={['fill', 400]} direction="column">
        <Icon
          icon={SignBadgeCircle}
          stroke="primary.500"
          size={80}
          sx={{
            display: 'block',
            pb: 7,
            pt: 6,
            textAlign: 'center',
          }}
        />
        <Heading align="center">{t('empty.header')}</Heading>
        <chakra.div sx={{ mt: 6, width: '100%', textAlign: 'center' }}>
          <Button
            onClick={() => {
              history.back();
            }}
            variant={['large']}
            sx={{
              variant: 'buttons.primary.regular',
            }}
          >
            {t('empty.leave')}
          </Button>
          <chakra.span sx={{ ml: 3, mr: 3 }} />
          <Button
            onClick={() => {
              history.back();
            }}
            variant={['large']}
            sx={{
              variant: 'buttons.secondary.regular',
            }}
          >
            {t('empty.home')}
          </Button>
        </chakra.div>
      </Flex>
    </Center>
  );
}
