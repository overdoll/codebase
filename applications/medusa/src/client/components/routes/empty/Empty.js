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
        stroke="neutral.100"
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
      <div sx={{ mt: 6, width: 'fill', textAlign: 'center' }}>
        <Button
          onClick={() => {
            history.back();
          }}
          size="large"
          type="buttons.primary.alternate"
          sx={{ width: 'fill' }}
        >
          {t('empty.home')}
        </Button>
      </div>
    </Frame>
  );
}
