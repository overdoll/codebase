/**
 * @flow
 */
import { Button } from '@chakra-ui/react';
import type { Node } from 'react';
import Link from '@//:modules/routing/Link';
import { useTranslation } from 'react-i18next';

export default function SiteLinkLogo (): Node {
  const [t] = useTranslation('navigation')

  return (
    <Link to='/'>
      <Button
        textColor='primary.500' fontWeight='bold' fontFamily='heading' variant='link'
        colorScheme='primary'
      >{t('title')}
      </Button>
    </Link>
  )
}
