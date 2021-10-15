/**
 * @flow
 */
import { Alert, AlertIcon, AlertDescription, Flex } from '@chakra-ui/react'
import type { Node } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@//:modules/form/Button'
import Link from '@//:modules/routing/Link'

type Props = {}

export default function LockedAccountBanner (props: Props): Node {
  const [t] = useTranslation('locked')

  return (
    <Alert h={12} borderRadius='none' border='none' status='warning'>
      <Flex w='100%' align='center' justify='space-between'>
        <Flex>
          <AlertIcon />
          <AlertDescription>
            {t('banner.description')}
          </AlertDescription>
        </Flex>
        <Link to='/locked'>
          <Button size='sm' colorScheme='orange' variant='solid'>{t('banner.button')}</Button>
        </Link>
      </Flex>
    </Alert>
  )
}
