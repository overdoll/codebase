/**
 * @flow
 */
import { Heading, MenuItem } from '@chakra-ui/react'
import type { Node } from 'react'
import Icon from '@//:modules/content/Icon/Icon'
import Link from '@//:modules/routing/Link'
import { useTranslation } from 'react-i18next'

import LoginKey2
  from '@streamlinehq/streamlinehq/img/streamline-regular/interface-essential/login-logout/login-key-2.svg'

type Props = {}

export default function LoggedOutPlaceholder (props: Props): Node {
  const [t] = useTranslation('navigation')

  return (
    <Link to='/join'>
      <MenuItem align='center'>
        <Icon icon={LoginKey2} color='green.500' w={8} h={8} mr={4} />
        <Heading color='green.500' size='md'>{t('menu.join')}</Heading>
      </MenuItem>
    </Link>
  )
}
