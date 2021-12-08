/**
 * @flow
 */
import { Heading, MenuItem } from '@chakra-ui/react'
import type { Node } from 'react'
import Icon from '@//:modules/content/Icon/Icon'
import Link from '@//:modules/routing/Link'
import { useTranslation } from 'react-i18next'
import { MenuButton } from '@//:modules/content/Navigation/components'
import NavLink from '@//:modules/routing/NavLink'

import LoginKey2
  from '@streamlinehq/streamlinehq/img/streamline-regular/interface-essential/login-logout/login-key-2.svg'

type Props = {}

export default function LoggedOutPlaceholder (props: Props): Node {
  const [t] = useTranslation('navigation')

  return (
    <NavLink to='/join'>
      {({ isActive }) => (
        <MenuButton active={isActive} icon={LoginKey2} color='green.500' label={t('menu.join')} />
      )}
    </NavLink>
  )
}
