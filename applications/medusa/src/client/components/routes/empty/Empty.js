/**
 * @flow
 */
import type { Node } from 'react';
import { Frame } from '@//:modules/content';
import Icon from '@//:modules/content/icon/Icon';
import { SignShapes } from '@streamlinehq/streamline-regular/lib/maps-navigation';
import { useTranslation } from 'react-i18next';
import { useHistory } from '@//:modules/routing';
import { Heading } from '@//:modules/typography';
import { Button } from '@//:modules/form';

export default function Empty(): Node {
  const [t] = useTranslation('empty');

  return (
    <Frame>
      <Icon
        icon={SignShapes.SignBadgeCircle}
        strokeWidth={2.5}
        stroke={'primary.500'}
        size={80}
        sx={{
          display: 'block',
          pb: 7,
          pt: 6,
          textAlign: 'center',
        }}
      />
      <Heading sx={{ textAlign: 'center', fontSize: 3 }}>
        {t('empty.header')}
      </Heading>
      <div sx={{ mt: 6, width: '100%', textAlign: 'center' }}>
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
        <span sx={{ ml: 3, mr: 3 }}></span>
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
      </div>
    </Frame>
  );
}
